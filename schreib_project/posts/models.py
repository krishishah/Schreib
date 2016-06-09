from django.db import models
from authentication.models import Account


class Post(models.Model):
    author = models.ForeignKey(Account)
    content = models.TextField()
    title = models.TextField()
    genre = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{0}'.format(self.content)

    def get_title(self):
        return self.title

    def get_genre(self):
        return self.genre

    def get_created_at(self):
        return self.created_at

    def get_updated_at(self):
        return self.updated_at

    def get_author(self):
        return self.author
