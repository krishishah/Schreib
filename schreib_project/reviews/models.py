from django.db import models
from authentication.models import Account
from posts.models import Post


class Review(models.Model):
    author = models.ForeignKey(Account)
    post = models.ForeignKey(Post)

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



    # def get_created_at(self):
    #     return self.created_at
    #
    # def get_updated_at(self):
    #     return self.updated_at
    #
    # def get_author(self):
    #     return self.author
    #
    # def get_post(self):
    #     return self.post
