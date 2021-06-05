from django.contrib.auth import get_user_model
from rest_framework import serializers
from blog.models import *
from django.contrib.auth.models import User

# Model Serializers


class UserSerializerToCreate(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    write_only_fields = 'password'

    class Meta:
        model = User
        fields = ('username', 'id', 'password')  # 'first_name', 'last_name'

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class UserSerializerToGet(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ('username', 'id')  # 'first_name', 'last_name'


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializerToCreate(read_only=True)
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(write_only=True)
    description = serializers.CharField()

    def create(self, validated_data):
        profile = Profile(**validated_data)
        profile.save()
        return profile

    class Meta:
        model = Profile
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializerToGet(read_only=True)
    author_id = serializers.IntegerField(write_only=True)
    comments_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


class CommentSerializer(serializers.Serializer):
    content = serializers.CharField()
    author = UserSerializerToGet(read_only=True)
    post = PostSerializer(read_only=True)
    id = serializers.IntegerField(read_only=True)
    author_id = serializers.IntegerField(write_only=True)
    post_id = serializers.IntegerField(write_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        comment = Comment(**validated_data)
        comment.save()
        return comment

    def update(self, instance, validated_data):
        instance.save()
        return instance


class LikeSerializer(serializers.ModelSerializer):
    author = UserSerializerToGet(read_only=True)
    comment = CommentSerializer(read_only=True)
    id = serializers.IntegerField(read_only=True)
    author_id = serializers.IntegerField(write_only=True)
    comment_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Like
        fields = ['author', 'comment', 'id', 'author_id', 'comment_id']

    def create(self, validated_data):
        like = Like(**validated_data)
        like.save()
        return like


class PostSerializerToUpdate(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializerToGet(read_only=True)
    title = serializers.CharField()
    body = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)

    def update(self, instance, validated_data):
        instance.title = validated_data['title']
        instance.text = validated_data['body']
        instance.save()
        return instance

    def create(self, validated_data):
        pass
