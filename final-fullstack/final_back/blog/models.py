from django.conf import settings
from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    description = models.CharField(max_length=300)
    avatar = models.ImageField(upload_to='profile_images', null=True, default="profile_images/default.jpg")

    def __str__(self):
        return self.user.username


class Post(models.Model):
    title = models.CharField(max_length=50)
    body = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to='post_images', null=True)
    comments_count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def to_json(self):
        return {
            'title': self.title,
            'body': self.body
        }


class Comment(models.Model):
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    likes_count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.content


class Like(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
