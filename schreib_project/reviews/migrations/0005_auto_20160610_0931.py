# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-10 08:31
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0004_auto_20160610_0111'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='post',
            new_name='story',
        ),
    ]