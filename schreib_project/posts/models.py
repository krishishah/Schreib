from django.db import models

from django.db import models

from authentication.models import Account


class Post(models.Model):

    #Each Account can hold many Post objects
    author = models.ForeignKey(Account)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{0}'.format(self.content)
