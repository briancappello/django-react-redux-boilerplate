from django.conf.urls import url

from rest_framework import renderers
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

snippet_list = views.SnippetViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
snippet_detail = views.SnippetViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})
snippet_highlighted = views.SnippetViewSet.as_view({
    'get': 'highlighted',
}, renderer_classes=[renderers.StaticHTMLRenderer])

urlpatterns = [
    url(r'^$', views.api_root, name='snippet-root'),
    url(r'^snippets/?$', snippet_list, name='snippet-list'),
    url(r'^snippets/(?P<pk>[0-9]+)/?$', snippet_detail, name='snippet-detail'),
    url(r'^snippets/(?P<pk>[0-9]+)/highlighted/?$', snippet_highlighted, name='snippet-highlighted'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
