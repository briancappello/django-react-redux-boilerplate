from rest_framework import serializers

from .models import User
from snippets.models import Snippet


class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True,
                                                  queryset=Snippet.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                  'is_staff', 'is_active', 'date_joined', 'snippets')
