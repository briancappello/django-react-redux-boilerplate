from rest_framework import serializers

from ..models import Snippet


class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    created_by = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    modified_by = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    highlighted = serializers.HyperlinkedIdentityField(view_name='snippet-highlighted', format='html')

    class Meta:
        model = Snippet
        fields = ('url', 'id', 'title', 'code', 'line_nums', 'language', 'style',
                  'created_by', 'created_at', 'modified_by', 'modified_at',
                  'highlighted')
