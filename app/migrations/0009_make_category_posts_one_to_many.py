# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-31 11:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_remove_post_preview'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='categories',
        ),
        migrations.AddField(
            model_name='post',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='posts', to='app.Category'),
        ),
    ]