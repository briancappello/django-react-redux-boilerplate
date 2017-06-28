import os

from django.http import HttpResponse
from django.views.generic import View

from rest_framework import generics

from backend import settings
from .models import User
from .serializers import UserSerializer


class IndexView(View):
    def get(self, request):
        index_path = os.path.join(settings.BASE_DIR, 'static/index.html')
        with open(index_path) as index:
            return HttpResponse(content=index.read())


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
