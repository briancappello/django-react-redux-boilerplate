from rest_framework import generics, permissions

from ..models import Category
from ..serializers import CategorySerializer, CategoryDetailSerializer


class CategoryViewMixin(object):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Category.objects.find_all_with_posts_by_user(self.request.user)


class CategoryListView(CategoryViewMixin, generics.ListAPIView):
    serializer_class = CategorySerializer


class CategoryDetailView(CategoryViewMixin, generics.RetrieveAPIView):
    serializer_class = CategoryDetailSerializer
    lookup_field = 'slug'
