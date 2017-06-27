import os

from django.http import HttpResponse
from django.views.generic import View

from backend import settings


class IndexView(View):
    def get(self, request):
        index_path = os.path.join(settings.BASE_DIR, 'static/index.html')
        with open(index_path) as index:
            return HttpResponse(content=index.read())
