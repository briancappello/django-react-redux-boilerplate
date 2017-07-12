from rest_framework import serializers

from ..models import Category
from .post import PostSerializer

CATEGORY_LIST_FIELDS = ('id', 'slug', 'name', 'posts')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = CATEGORY_LIST_FIELDS


class CategoryDetailSerializer(CategorySerializer):
    posts = PostSerializer(many=True)

    class Meta:
        model = Category
        fields = CATEGORY_LIST_FIELDS
        depth = 1
