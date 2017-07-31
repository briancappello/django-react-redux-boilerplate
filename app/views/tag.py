from rest_framework import generics, permissions

from ..models import Tag
from ..serializers import TagSerializer


class TagListView(generics.ListAPIView):
    serializer_class = TagSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Tag.objects.find_all_with_posts_by_user(self.request.user)
