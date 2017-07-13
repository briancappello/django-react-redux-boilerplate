from rest_framework import serializers

from ..models import Category, Post, Tag

POST_LIST_FIELDS = ('id', 'slug', 'title', 'preview',
                    'publish_date', 'last_updated',
                    'categories', 'tags')


class PostSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())

    class Meta:
        model = Post
        fields = POST_LIST_FIELDS


class PostDetailSerializer(PostSerializer):
    class Meta:
        model = Post
        fields = POST_LIST_FIELDS + ('html',)
