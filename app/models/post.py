from bs4 import BeautifulSoup
import functools

from django.db import connection, models
from django.db.models import Q
from django.utils.translation import ugettext_lazy as _
from django_extensions.db.fields import AutoSlugField

from ..date_utils import utcnow
from .. import app_settings
from .base import TimeStampMixin, UserAuditMixin
from .category import Category
from .tag import Tag

POST_PREVIEW_LENGTH = app_settings['POST_PREVIEW_LENGTH']


class PostManager(models.Manager):
    def find_all_by_is_public_or_user(self, user):
        """
        Returns a QuerySet filtered by is published and is public
         or created by user
        """
        if not user or not user.is_authenticated:
            return self.filter(is_public=True,
                               publish_date__lte=utcnow())
        return self.filter(Q(is_public=True) | Q(created_by=user),
                           publish_date__lte=utcnow())

    def find_prev_next_by_user_and_slug(self, user, slug):
        """
        Returns a 2-tuple of (prev, next) where each item is
         either a dict with keys 'slug' and 'title' or None
        """
        with connection.cursor() as cursor:
            cursor.execute("""
              WITH posts AS (
                SELECT
                  slug,
                  title,
                  ROW_NUMBER() OVER (ORDER BY publish_date DESC, last_updated DESC) AS row_number
                FROM app_post
                WHERE
                  publish_date <= %(now)s
                  AND (
                    is_public = %(is_public)s
                    OR
                    created_by_id = %(created_by_id)s
                  )
              )
              SELECT
                slug,
                title
              FROM posts
              WHERE row_number IN (
                SELECT
                  row_number + i
                FROM posts
                CROSS JOIN (SELECT -1 AS i UNION ALL SELECT 0 UNION ALL SELECT 1) n
                WHERE slug = %(slug)s
              )
            """, {
                'now': utcnow(),
                'is_public': True,
                'created_by_id': user.pk if user else None,
                'slug': slug,
            })
            result = [{'slug': row[0], 'title': row[1]}
                      for row in cursor.fetchall()]

        if len(result) == 3:
            return result[-1], result[0]
        elif len(result) == 1:
            return None, None
        elif result[0]['slug'] == slug:
            return result[-1], None
        elif result[-1]['slug'] == slug:
            return None, result[0]
        else:
            raise Exception('Should never get here... %r' % result)


class Post(TimeStampMixin, UserAuditMixin, models.Model):
    title = models.CharField(_('Title'), max_length=255)
    slug = AutoSlugField(_('Slug'), populate_from='title')
    publish_date = models.DateField(_('Publish Date'))
    last_updated = models.DateTimeField(_('Last Updated'))
    file_path = models.FilePathField(_('File Path'), path=app_settings['POSTS_DIR'])
    is_public = models.BooleanField(default=True)
    html = models.TextField(_('HTML'))

    categories = models.ManyToManyField(Category, related_name='posts')
    tags = models.ManyToManyField(Tag, related_name='posts')

    class Meta:
        ordering = ('-publish_date', '-last_updated')

    objects = PostManager()

    def __str__(self):
        return self.title

    @property
    @functools.lru_cache()
    def preview(self):
        soup = BeautifulSoup(self.html, 'lxml')
        p = soup.find('p')
        if not p:
            return None
        elif len(p.text) <= POST_PREVIEW_LENGTH:
            return p.text
        return p.text[:p.text.rfind(' ', 0, POST_PREVIEW_LENGTH)] + '...'
