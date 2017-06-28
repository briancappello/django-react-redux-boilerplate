from rest_framework import serializers

from .models import Snippet


class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    highlighted = serializers.HyperlinkedIdentityField(view_name='snippet-highlighted', format='html')

    class Meta:
        model = Snippet
        fields = ('url', 'id', 'title', 'code', 'line_nums', 'language', 'style',
                  'created_by', 'highlighted')
