from rest_framework import serializers

from .models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES

# Verbose/Manual:
# class SnippetSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     title = serializers.CharField(max_length=100)
#     code = serializers.CharField(style={'base_template': 'textarea.html'})
#     line_nums = serializers.BooleanField(required=False)
#     language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
#     style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')
#
#     def create(self, validated_data):
#         return Snippet.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.code = validated_data.get('code', instance.code)
#         instance.line_nums = validated_data.get('line_nums', instance.line_nums)
#         instance.language = validated_data.get('language', instance.language)
#         instance.style = validated_data.get('style', instance.style)
#         instance.save()
#         return instance


# Automagic:
class SnippetSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'line_nums', 'language', 'style',
                  'created_by')
