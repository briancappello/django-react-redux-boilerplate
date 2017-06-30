from django.conf.urls import url, include
from rest_framework import routers

from . import views
from knox.views import LogoutView, LogoutAllView

router = routers.DefaultRouter()
router.register(r'snippets', views.SnippetViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'api/auth/login/', views.LoginView.as_view(), name='knox_login'),
    url(r'api/auth/logout/', LogoutView.as_view(), name='knox_logout'),
    url(r'api/auth/logoutall/', LogoutAllView.as_view(), name='knox_logoutall'),
    url(r'api/', include(router.urls)),
    url(r'', views.IndexView.as_view())
]
