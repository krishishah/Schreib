# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-07 13:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0009_auto_20160603_1036'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='title',
            field=models.TextField(default='Title'),
            preserve_default=False,
        ),
    ]
