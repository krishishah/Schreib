from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class AccountManager(BaseUserManager):
    def create_user(self, email, username, password,
                    dob, first_name, last_name, likes_action,
                    likes_adventure, likes_crime, likes_fan_fiction,
                    likes_fantasy, likes_horror, likes_romance, **extra_args):
        if not email:
            raise ValueError('Users must have a valid email address.')

        if not username:
            raise ValueError('Users must have a valid username.')

        if not password:
            raise ValueError('Users must have a valid password.')

        if not dob:
            raise ValueError('Users must have a valid date of birth.')

        if not first_name:
            raise ValueError('Users must enter their first name.')

        if not last_name:
            raise ValueError('Users must enter their last name.')

        account = self.model(
            email=self.normalize_email(email),
            username = username,
            dob = dob,
            first_name = first_name,
            last_name = last_name,
            likes_action = likes_action,
            likes_adventure = likes_adventure,
            likes_crime = likes_crime,
            likes_fan_fiction = likes_fan_fiction,
            likes_fantasy = likes_fantasy,
            likes_horror = likes_horror,
            likes_romance = likes_romance,
            **extra_args)

        account.set_password(password)
        account.save()

        return account



    def create_superuser(self, email, username, password,
                    dob, first_name, last_name, likes_action,
                    likes_adventure, likes_crime, likes_fan_fiction,
                    likes_fantasy, likes_horror, likes_romance, **extra_args):
        account = self.create_user(email, username, password,
                                   dob, first_name, last_name, likes_action,
                                   likes_adventure, likes_crime, likes_fan_fiction,
                                   likes_fantasy, likes_horror, likes_romance, **extra_args)

        account.is_admin = True
        account.save()

        return account


class Account(AbstractBaseUser):
    email      = models.EmailField(unique=True)
    username   = models.CharField(max_length=40, unique=True)

    first_name = models.CharField(max_length=40, blank=False)
    last_name  = models.CharField(max_length=40, blank=False)

    # YYYY-MM-DD structure
    dob = models.DateField(blank = False)

    likes_action = models.BooleanField(default=False)
    likes_adventure = models.BooleanField(default=False)
    likes_crime = models.BooleanField(default=False)
    likes_fan_fiction = models.BooleanField(default=False)
    likes_fantasy = models.BooleanField(default=False)
    likes_horror = models.BooleanField(default=False)
    likes_romance = models.BooleanField(default=False)


    #Using Twitter 140 char limit
    bio = models.CharField(max_length=140, blank=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name','last_name','dob']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_first_name(self):
        return self.first_name
