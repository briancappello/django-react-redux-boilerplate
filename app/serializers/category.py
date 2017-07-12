from rest_framework import serializers

from ..models import Category
from .post import PostSerializer

CATEGORY_LIST_FIELDS = ('id', 'slug', 'name', 'posts')


class CategorySerializer(serializers.ModelSerializer):
    posts = serializers.SlugRelatedField(many=True, read_only=True, slug_field='slug')

    class Meta:
        model = Category
        fields = CATEGORY_LIST_FIELDS


class CategoryDetailSerializer(CategorySerializer):
    posts = PostSerializer(many=True)

    class Meta:
        model = Category
        fields = CATEGORY_LIST_FIELDS
        depth = 1
