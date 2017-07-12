from django.db import models
from django.db.models import Count, Q
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django_extensions.db.fields import AutoSlugField


class CategoryManager(models.Manager):
    def find_all_with_posts_by_user(self, user):
        queryset = self.filter(posts__is_public=True,
                               posts__publish_date__lte=timezone.now())
        if user and user.is_authenticated:
            queryset = self.filter(
                Q(posts__is_public=True) | Q(posts__created_by=user),
                posts__publish_date__lte=timezone.now()
            )
        return queryset.annotate(num_posts=Count('posts')).filter(num_posts__gt=0)


class Category(models.Model):
    name = models.CharField(_('Name'), max_length=30)
    slug = AutoSlugField(_('Slug'), populate_from='name')

    # posts = implicit ManyToMany(Post)
    # tags = implicit OneToMany(Tag)

    class Meta:
        ordering = ('name',)

    objects = CategoryManager()

    def __str__(self):
        return self.name
