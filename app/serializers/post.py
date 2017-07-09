from rest_framework import serializers

from ..models import Category, Post, Tag


class PostSerializer(serializers.ModelSerializer):
    publishDate = serializers.DateField(source='publish_date')
    lastUpdated = serializers.DateTimeField(source='last_updated')
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())

    class Meta:
        model = Post
        fields = ('slug', 'title', 'preview',
                  'publishDate', 'lastUpdated',
                  'categories', 'tags')


class PostDetailSerializer(PostSerializer):
    class Meta:
        model = Post
        fields = ('slug', 'title', 'preview', 'html',
                  'publishDate', 'lastUpdated',
                  'categories', 'tags')
