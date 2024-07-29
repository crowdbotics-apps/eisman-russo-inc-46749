
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import DebrisViewSet, EventViewSet


router = DefaultRouter()
router.register('debris', DebrisViewSet, basename="debris")
router.register('event', EventViewSet, basename="event")

app_name = "ticketing"

urlpatterns = [
    path('', include(router.urls)),
]