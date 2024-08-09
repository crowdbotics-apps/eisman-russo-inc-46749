from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .api.v1.viewsets import (
    DebrisViewSet,
    HazardNameViewSet,
    HazardTypeViewSet,
    TruckTypeViewSet,
    SubActivityViewSet,
)

router = DefaultRouter()
router.register("debris", DebrisViewSet, basename="debris")
router.register("hazard-name", HazardNameViewSet, basename="hazard-name")
router.register("hazard-type", HazardTypeViewSet, basename="hazard-type")
router.register("truck-type", TruckTypeViewSet, basename="truck-type")
router.register("sub-activity", SubActivityViewSet, basename="sub-activity")

app_name = "administration"

urlpatterns = [
    path("", include(router.urls)),
]
