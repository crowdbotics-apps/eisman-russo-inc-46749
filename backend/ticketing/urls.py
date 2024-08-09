from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ticketing.api.v1 import (
    EventViewSet,
    ProjectViewSet,
    ContractorRateMatrixViewSet,
)


router = DefaultRouter()
router.register("event", EventViewSet, basename="event")
router.register("project", ProjectViewSet, basename="project")
router.register("rate-matrix", ContractorRateMatrixViewSet, basename="rate-matrix")

app_name = "ticketing"

urlpatterns = [
    path("", include(router.urls)),
]
