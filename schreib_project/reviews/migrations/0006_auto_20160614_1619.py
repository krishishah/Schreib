# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-14 15:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0005_auto_20160610_0931'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='post_id',
            field=models.IntegerField(default=24),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='review',
            name='overall_rating',
            field=models.FloatField(),
        ),
    ]
