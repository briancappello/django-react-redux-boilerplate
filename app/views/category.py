from rest_framework import generics, permissions

from ..models import Category
from ..serializers import CategorySerializer, CategoryDetailSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)


class CategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'slug'
