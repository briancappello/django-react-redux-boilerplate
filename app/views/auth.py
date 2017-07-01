from django.contrib.auth import authenticate

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from knox.models import AuthToken
from knox.settings import knox_settings


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({
                'error': 'Incorrect username or password',
            }, status=status.HTTP_401_UNAUTHORIZED)

        token = AuthToken.objects.create(user)
        UserSerializer = knox_settings.USER_SERIALIZER
        return Response({
            'user': UserSerializer(user).data,
            'token': token,
        })
