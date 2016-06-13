from django.db import models
from authentication.models import Account
from posts.models import Post


class Review(models.Model):
    story = models.ForeignKey(Post)
    author = models.ForeignKey(Account)

    content_edit      = models.TextField()

    language_well     = models.TextField()
    language_improve  = models.TextField()

    character_well    = models.TextField()
    character_improve = models.TextField()

    setting_well      = models.TextField()
    setting_improve   = models.TextField()

    structure_well    = models.TextField()
    structure_improve = models.TextField()

    theme_well        = models.TextField()
    theme_improve     = models.TextField()

    overall_comment   = models.TextField()
    overall_rating    = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



    def __str__(self):
        return '{0}'.format(self.content_edit)
