from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _

from django_extensions.db.fields import (
    CreationDateTimeField, ModificationDateTimeField,
)

from ..current_user import get_current_user


class TimeStampMixin(models.Model):
    created_at = CreationDateTimeField(_('Created At'))
    modified_at = ModificationDateTimeField(_('Modified At'))

    def save(self, **kwargs):
        self.update_modified = kwargs.pop('update_modified_at',
                                          getattr(self, 'update_modified_at', True))
        super(TimeStampMixin, self).save(**kwargs)

    class Meta:
        get_latest_by = 'modified_at'
        ordering = ('-modified_at', '-created_at',)
        abstract = True


class UserAuditMixin(models.Model):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,
                                   verbose_name=_('Created By'),
                                   default=get_current_user,
                                   related_name='%(class)ss')
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL,
                                    verbose_name=_('Modified By'),
                                    default=get_current_user)

    def save(self, **kwargs):
        self.modified_by = get_current_user()
        super(UserAuditMixin, self).save(**kwargs)

    class Meta:
        get_latest_by = 'modified_at'
        ordering = ('-modified_at', '-created_at',)
        abstract = True
