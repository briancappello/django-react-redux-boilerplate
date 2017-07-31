from django.db import models
from django.utils.translation import ugettext_lazy as _
from django_extensions.db.fields import AutoSlugField



class Tag(models.Model):
    name = models.CharField(_('Name'), max_length=30)
    slug = AutoSlugField(_('Slug'), populate_from='name')

    # posts = implicit ManyToMany(Post)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name
