# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-07 13:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0010_post_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='genre',
            field=models.TextField(default='fiction'),
            preserve_default=False,
        ),
    ]
