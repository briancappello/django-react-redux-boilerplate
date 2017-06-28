from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register(r'snippets', views.SnippetViewSet)

urlpatterns = router.urls
