
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import DebrisViewSet, EventViewSet, HazardNameViewSet, HazardTypeViewSet , TruckTypeViewSet, SubActivityViewSet


router = DefaultRouter()
router.register('debris', DebrisViewSet, basename="debris")
router.register('event', EventViewSet, basename="event")
router.register('hazard-name', HazardNameViewSet, basename="hazard-name")
router.register('hazard-type', HazardTypeViewSet, basename="hazard-type")
router.register('truck-type', views.TruckTypeViewSet, basename="truck-type")
router.register('sub-activity', views.SubActivityViewSet, basename="sub-activity")

app_name = "ticketing"

urlpatterns = [
    path('', include(router.urls)),
]