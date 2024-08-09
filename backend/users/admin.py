from django.contrib import admin, messages
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect

from users.forms import UserChangeForm, UserCreationForm
from users.models import Role, Position
from django.urls import path

from users.utils import (
    ROLE_CHOICES,
    CLIENT,
    CONTRACTOR,
    ER_USER,
    PRIME_CONTRACTOR,
    SUB_CONTRACTOR,
)

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (
        (
            "User",
            {"fields": ("name", "role", "position", "device_id")},
        ),
    ) + auth_admin.UserAdmin.fieldsets
    list_display = ["id", "email", "name", "is_superuser"]
    search_fields = ["name"]
    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("email", "password1", "password2")}),
    )


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    change_list_template = "users/admin/role_changelist.html"
    list_display = ["id", "name"]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "create_default_roles/",
                self.admin_site.admin_view(self.create_default_roles),
                name="create_default_roles",
            ),
        ]
        return custom_urls + urls

    def create_default_roles(self, request):
        for role in ROLE_CHOICES:
            role_type, name, can_add_positions = role
            Role.objects.get_or_create(
                name=name, type=role_type, can_add_positions=can_add_positions
            )

        self.message_user(
            request, "Default Roles created successfully.", messages.SUCCESS
        )
        return HttpResponseRedirect("../")


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    change_list_template = "users/admin/position_changelist.html"
    list_display = ["id", "name", "get_role_name"]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "create_default_positions/",
                self.admin_site.admin_view(self.create_default_positions),
                name="create_default_positions",
            ),
        ]
        return custom_urls + urls

    def get_role_name(self, obj):
        if obj.role:
            return obj.role.name
        return ""

    def create_default_positions(self, request):
        for role in ROLE_CHOICES:
            try:
                role_type, name, can_add_positions = role
                if role_type == CLIENT:
                    role = Role.objects.get(type=role_type)
                    Position.objects.get_or_create(name="Client", role=role)

                if role_type == CONTRACTOR:
                    role = Role.objects.get(type=role_type)
                    Position.objects.get_or_create(name=PRIME_CONTRACTOR, role=role)
                    Position.objects.get_or_create(name=SUB_CONTRACTOR, role=role)

                if role_type == ER_USER:
                    role = Role.objects.get(type=role_type)
                    Position.objects.get_or_create(name="Admin", role=role)

            except Exception as e:
                error_message = str(e)
                self.message_user(request, error_message, messages.ERROR)
                return HttpResponseRedirect("../")

        self.message_user(
            request, "Default Position created successfully.", messages.SUCCESS
        )
        return HttpResponseRedirect("../")
