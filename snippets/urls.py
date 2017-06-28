from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    url(r'^$', views.api_root, name='snippet-root'),
    url(r'^snippets/?$', views.SnippetList.as_view(), name='snippet-list'),
    url(r'^snippets/(?P<pk>[0-9]+)/?$', views.SnippetDetail.as_view(), name='snippet-detail'),
    url(r'^snippets/(?P<pk>[0-9]+)/highlighted/?$', views.SnippetHighlight.as_view(), name='snippet-highlighted'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
