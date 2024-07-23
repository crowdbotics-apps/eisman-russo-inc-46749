from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from users.views import (
    user_redirect_view,
    user_update_view,
    user_detail_view,
)
from users.viewsets import LoginViewSet, TestViewSet

app_name = "users"


router = DefaultRouter()
router.register("login", LoginViewSet, basename="login")
router.register("test", TestViewSet, basename="test")


urlpatterns = [
    path("", include(router.urls)),

    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
]
