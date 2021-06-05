from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.db.models import F
from rest_framework import viewsets, status, filters

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from blog.serializers import *
from blog.models import Post


class SignUpView(APIView):

    def post(self, request):
        serializer = UserSerializerToCreate(data=request.data)
        if serializer.is_valid():
            print('success')
            serializer.save()
            return Response(serializer.data)
        else:
            print('invalid..')
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'PUT'])
def make_profile(request):
    if request.method == 'POST':
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            print('success')
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
        return Response(serializer.errors)
    # if request.method == 'PUT':
    #     serializer = ProfileSerializer(data=request.data)


@api_view(['GET', 'PATCH'])
def get_profile(request, pk):
    try:
        profile = Profile.objects.get(user_id=pk)
    except Profile.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    if request.method == 'PATCH':
        serializer = ProfileSerializer(instance=profile, data=request.data)
        if serializer.is_valid():
            if str(profile.user) != str(request.user):
                print('someone else is trying to edit your page')
                return JsonResponse({'error': 'not yours'})
            serializer.save()
            return Response('ok')
        else:
            return Response(serializer.errors)


class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = PostSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save(author_id=request.user.id)
            return Response(posts_serializer.data)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_posts(request, pk):
    try:
        posts = Post.objects.filter(author_id=pk)
    except Post.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    if request.method == 'GET':
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def who(request):
    if request.method == 'GET':
        return JsonResponse({
            'you are': request.user.username
        })


@api_view(['GET', 'POST'])
def post_comments(request, pk):
    try:
        comments = Comment.objects.filter(post=pk)
    except Comment.DoesNotExist as e:
        return Response({
            'error': str(e)
        })

    if request.method == 'GET':
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(author_id=request.user.id)
            serializer.save(post_id=pk)
            Post.objects.filter(id=pk).update(comments_count=F("comments_count")+1)
            return JsonResponse({"message": "ok"})
        else:
            print(serializer.errors)
        return Response(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    try:
        post = Post.objects.get(id=pk)
    except Post.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    if request.method == 'PUT':
        serializer = PostSerializerToUpdate(instance=post, data=request.data)
        if serializer.is_valid():
            if str(post.author_id) != str(request.user.id):
                print('someone else attempts to change')
                return JsonResponse({'error': 'not yours'})
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    elif request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        if str(post.author_id) != str(request.user.id):
            print('someone else attempts to change your post')
            return JsonResponse({'error': 'error'})
        post.delete()


@api_view(['GET', 'POST'])
def likes(request, pk):
    try:
        likes = Like.objects.filter(comment_id=pk)
    except Like.DoesNotExist as e:
        return Response({
            'error': str(e)
        })

    if request.method == 'GET':
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        likes = Like.objects.filter(comment_id=pk, author_id=request.user.id)
        print(Like.objects.filter(author=request.user))

        if len(likes) == 0:
            Comment.objects.filter(id=pk).update(likes_count=F("likes_count")+1)
            serializer = LikeSerializer(data=request.data)
            print(request.data)
            if serializer.is_valid():
                serializer.save(author_id=request.user.id)
                serializer.save(comment_id=pk)
                return Response(serializer.data)
            else:
                print(serializer.errors)
            return Response(serializer.errors)
        else:
            myLike = Like.objects.filter(comment_id=pk, author=request.user)
            myLike.delete()
            Comment.objects.filter(id=pk).update(likes_count=F("likes_count")-1)

            print('already liked!')
            return Response({'error': 'already liked'})

