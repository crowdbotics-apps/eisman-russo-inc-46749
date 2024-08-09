from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import (
    user_redirect_view,
    user_update_view,
    user_detail_view,
)
from users.viewsets import (
    LoginViewSet,
    RoleViewSet,
    PositionViewSet,
    UserViewSet,
    UserAttachmentsViewSet,
    PermissionViewSet,
)

app_name = "users"


router = DefaultRouter()
router.register("profile", UserViewSet, basename="profile")
router.register("login", LoginViewSet, basename="login")
router.register("position", PositionViewSet, basename="position")
router.register("role", RoleViewSet, basename="role")
router.register("attachments", UserAttachmentsViewSet, basename="attachments")
router.register("permissions", PermissionViewSet, basename="permissions")

urlpatterns = [
    path("", include(router.urls)),
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
]
