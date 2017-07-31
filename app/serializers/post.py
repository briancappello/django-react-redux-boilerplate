from rest_framework import serializers

from ..models import Post

POST_LIST_FIELDS = ('id', 'slug', 'title', 'preview',
                    'publish_date', 'last_updated',
                    'category', 'tags')


class PostSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(read_only=True, slug_field='slug')
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='slug')

    class Meta:
        model = Post
        fields = POST_LIST_FIELDS


class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = POST_LIST_FIELDS + ('html',)
        depth = 1
