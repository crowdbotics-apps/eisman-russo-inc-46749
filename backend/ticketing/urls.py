
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import DebrisViewSet


router = DefaultRouter()
router.register('debris', DebrisViewSet, basename="debris")

app_name = "ticketing"

urlpatterns = [
    path('', include(router.urls)),
]