
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import DebrisViewSet, EventViewSet, HazardNameViewSet, HazardTypeViewSet


router = DefaultRouter()
router.register('debris', DebrisViewSet, basename="debris")
router.register('event', EventViewSet, basename="event")
router.register('hazard-name', HazardNameViewSet, basename="hazard-name")
router.register('hazard-type', HazardTypeViewSet, basename="hazard-type")

app_name = "ticketing"

urlpatterns = [
    path('', include(router.urls)),
]