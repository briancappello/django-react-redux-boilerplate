from rest_framework import serializers

from ..models import Tag

TAG_LIST_FIELDS = ('id', 'slug', 'name', 'posts')


class TagSerializer(serializers.ModelSerializer):
    posts = serializers.SlugRelatedField(many=True, read_only=True, slug_field='slug')

    class Meta:
        model = Tag
        fields = TAG_LIST_FIELDS
