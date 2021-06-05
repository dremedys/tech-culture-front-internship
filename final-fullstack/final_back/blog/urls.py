from django.urls import path

from .views import *

urlpatterns = [
    path('sign_up', SignUpView.as_view()),

    path('posts', PostView.as_view()),
    path('posts/<int:pk>/comments/', post_comments),
    path('user_posts/<int:pk>', user_posts),

    path('posts/<int:pk>', post_detail),
    path('who', who),

    path('profile/', make_profile),
    path('profile/<int:pk>/', get_profile),

    path('comments/<int:pk>', post_comments),
    path('comments/<int:pk>/likes/', likes),
]
