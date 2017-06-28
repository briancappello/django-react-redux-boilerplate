from django.conf.urls import url

from rest_framework.urlpatterns import format_suffix_patterns

from . import views

user_list = views.UserViewSet.as_view({
    'get': 'list',
})
user_detail = views.UserViewSet.as_view({
    'get': 'retrieve',
})

urlpatterns = [
    url(r'^$', user_list, name='user-list'),
    url(r'^(?P<pk>[0-9]+)/?$', user_detail, name='user-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
