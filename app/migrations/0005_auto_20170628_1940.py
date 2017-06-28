# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-28 19:59
from __future__ import unicode_literals

import app.current_user
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20170628_1937'),
    ]

    operations = [
        migrations.AlterField(
            model_name='snippet',
            name='created_at',
            field=django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created_at'),
        ),
        migrations.AlterField(
            model_name='snippet',
            name='modified_at',
            field=django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified_at'),
        ),
        migrations.AlterField(
            model_name='snippet',
            name='created_by',
            field=models.ForeignKey(default=app.current_user.get_current_user, on_delete=django.db.models.deletion.CASCADE, related_name='snippets', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='snippet',
            name='modified_by',
            field=models.ForeignKey(default=app.current_user.get_current_user, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]