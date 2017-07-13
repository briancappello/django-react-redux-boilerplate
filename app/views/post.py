import datetime
import pytz

from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response

from ..date_utils import parse_datetime
from ..models import Post
from ..permissions import IsOwnerOrIsPublic
from ..serializers import PostSerializer, PostDetailSerializer


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def list_posts(request):
    if 'lastUpdated' in request.data:
        last_updated = parse_datetime(request.data.get('lastUpdated'))
    else:
        last_updated = datetime.datetime.fromtimestamp(0, pytz.UTC)
    posts = Post.objects.find_all_by_is_public_or_user(request.user).filter(
        last_updated__gt=last_updated
    )
    return Response(PostSerializer(posts, many=True).data)


@api_view()
@permission_classes((IsOwnerOrIsPublic,))
def view_post(request, slug):
    post = get_object_or_404(Post, slug=slug)
    prev_slug, next_slug = Post.objects.find_prev_next_by_user_and_slug(
        request.user,
        slug
    )
    return Response({
        'post': PostDetailSerializer(post).data,
        'prev': prev_slug,
        'next': next_slug,
    })
