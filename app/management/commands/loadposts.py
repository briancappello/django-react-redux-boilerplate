import datetime
import frontmatter
import json
import markdown
import os
import pytz
import re
import sys
import tzlocal

from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand

from ... import app_settings
from ...models import Category, Post, Tag, User

POSTS_DIR = app_settings['POSTS_DIR']
CMD_METADATA = os.path.join(POSTS_DIR, '.import-metadata.json')
FRONTMATTER_LIST_DELIMITER = app_settings['FRONTMATTER_LIST_DELIMITER']
POST_PREVIEW_LENGTH = app_settings['POST_PREVIEW_LENGTH']


class Command(BaseCommand):
    def __init__(self, stdout=None, stderr=None, no_color=False):
        super(Command, self).__init__(stdout, stderr, no_color)
        try:
            self.admin_user = User.objects.get(username__iexact='admin')
        except User.DoesNotExist:
            self.admin_user = None
        self.metadata = self._load_metadata()

    def handle(self, *args, **options):
        if not self.admin_user:
            self.stderr.write('No admin user found! Exiting')
            sys.exit(1)
        elif not os.path.exists(POSTS_DIR):
            self.stderr.write('POSTS_DIR {} does not exist! Exiting'.format(POSTS_DIR))
            sys.exit(1)

        last_updated = self.metadata['last_updated']
        new_posts = [f for f in os.scandir(POSTS_DIR)
                     if f.name.endswith('.md')
                     and f.stat().st_mtime > last_updated]

        if not new_posts:
            self.stdout.write('No new posts found.')
            return

        for post_file in new_posts:
            with open(post_file.path) as f:
                post_data = frontmatter.load(f)

            post, is_create = self._get_or_create_post(post_file, post_data)

            post.categories = self._get_or_create_categories(post_data)
            post.tags = self._get_or_create_tags(post_data)
            post.save()

            if is_create:
                self.metadata['slugs_by_filename'][post_file.name] = post.slug

        self._save_metadata()
        self.stdout.write('Finished loading posts.')

    def _load_metadata(self):
        if not os.path.exists(CMD_METADATA):
            return {'last_updated': 0, 'slugs_by_filename': {}}

        with open(CMD_METADATA) as f:
            return json.load(f)

    def _save_metadata(self):
        self.metadata['last_updated'] = datetime.datetime.now().timestamp()
        with open(CMD_METADATA, 'w') as f:
            json.dump(self.metadata, f, indent=4)

    def _get_or_create_post(self, post_file, post_data):
        is_create = post_file.name not in self.metadata['slugs_by_filename']
        if is_create:
            self.stdout.write('Adding post: {}'.format(post_data['title']))
            post = Post()
        else:
            self.stdout.write('Updating post: {}'.format(post_data['title']))
            slug = self.metadata['slugs_by_filename'][post_file.name]
            post = Post.objects.get(slug__exact=slug)

        post.title = post_data['title']
        post.publish_date = self._get_publish_date(post_file, post_data)
        post.last_updated = self._seconds_to_datetime(post_file.stat().st_mtime,
                                                      tzlocal.get_localzone())
        post.file_path = post_file.path
        post.created_by = self.admin_user
        post.is_public = self._get_is_public(post_data)
        post.html = self._get_html(post_data)
        post.preview = self._get_preview(post.html)
        post.save()

        return post, is_create

    def _get_or_create_categories(self, post_data):
        if 'category' in post_data.metadata:
            names = post_data['category']
        elif 'categories' in post_data.metadata:
            names = post_data['categories']
        else:
            return []

        categories = []
        for name in self._frontmatter_to_list(names):
            name = name.strip()
            try:
                categories.append(Category.objects.get(name__iexact=name))
            except Category.DoesNotExist:
                self.stdout.write('Creating Category: {}'.format(name.title()))
                category = Category(name=name.title())
                category.save()
                categories.append(category)
        return categories

    def _get_or_create_tags(self, post_data):
        if 'tag' in post_data.metadata:
            names = post_data['tag']
        elif 'tags' in post_data.metadata:
            names = post_data['tags']
        else:
            return []

        tags = []
        for name in self._frontmatter_to_list(names):
            try:
                tags.append(Tag.objects.get(name__iexact=name))
            except Tag.DoesNotExist:
                self.stdout.write('Creating Tag: {}'.format(name.title()))
                tag = Tag(name=name.title())
                tag.save()
                tags.append(tag)
        return tags

    def _get_publish_date(self, post_file, post_data):
        if 'publish_date' in post_data.metadata:
            datestamp = post_data['publish_date']
        else:
            datestamp = re.search(r'\d{4}-\d{2}-\d{2}', post_file.name).group()
        return self._datestamp_to_date(datestamp)

    def _get_is_public(self, post_data):
        if 'public' in post_data.metadata:
            return post_data['public']
        elif 'private' in post_data.metadata:
            return not post_data['private']
        return True

    def _get_html(self, post_data):
        markdown_extensions = ['extra']
        return markdown.markdown(
            post_data.content,
            markdown_extensions,
            output_format='html5'
        )

    def _get_preview(self, html):
        soup = BeautifulSoup(html, 'lxml')
        p = soup.find('p')
        if not p:
            return None
        elif len(p.text) <= POST_PREVIEW_LENGTH:
            return p.text
        return p.text[:p.text.rfind(' ', 0, POST_PREVIEW_LENGTH)] + '...'

    def _seconds_to_datetime(self, seconds, tz=None):
        dt = datetime.datetime.fromtimestamp(seconds)
        if tz is None:
            tz = pytz.UTC
        return tz.localize(dt)

    def _datestamp_to_date(self, datestamp):
        if isinstance(datestamp, datetime.date):
            return datestamp
        elif isinstance(datestamp, datetime.datetime):
            return datestamp.date()
        return datetime.datetime.strptime(datestamp, '%Y-%m-%d').date()

    def _frontmatter_to_list(self, string):
        if isinstance(string, (list, tuple)):
            return (name.strip() for name in string)
        return (name.strip() for name in string.split(FRONTMATTER_LIST_DELIMITER))
