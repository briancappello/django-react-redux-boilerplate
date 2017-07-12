from django.conf.urls import url, include
from rest_framework import routers

from . import views
from knox.views import LogoutView, LogoutAllView

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'api/auth/login/', views.LoginView.as_view(), name='knox_login'),
    url(r'api/auth/logout/', LogoutView.as_view(), name='knox_logout'),
    url(r'api/auth/logoutall/', LogoutAllView.as_view(), name='knox_logoutall'),
    url(r'api/categories/$', views.CategoryListView.as_view(), name='list_categories'),
    url(r'api/categories/(?P<slug>[\w\d-]+)/$', views.CategoryDetailView.as_view(), name='view_category'),
    url(r'api/posts/$', views.list_posts, name='list_posts'),
    url(r'api/posts/(?P<slug>[\w\d-]+)/$', views.view_post, name='view_post'),
    url(r'api/', include(router.urls)),
]
