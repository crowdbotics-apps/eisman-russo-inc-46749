
from django.contrib import admin, messages
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect

from users.forms import UserChangeForm, UserCreationForm
from users.models import Role, Position
from django.urls import path

from users.utils import ROLE_CHOICES

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name", "role", "position")}),) + auth_admin.UserAdmin.fieldsets
    list_display = ["email","username", "name", "is_superuser"]
    search_fields = ["name"]
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2"
            )}
         ),
    )


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    change_list_template = "users/admin/role_changelist.html"
    list_display = ['name']

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('create_default_roles/', self.admin_site.admin_view(self.create_default_roles),
                 name='create_default_roles'),
        ]
        return custom_urls + urls

    def create_default_roles(self, request):
        for role in ROLE_CHOICES:
            role_type, name, can_add_positions = role
            Role.objects.get_or_create(
                name=name,
                type=role_type,
                can_add_positions=can_add_positions
            )

        self.message_user(request, "Default Roles created successfully.", messages.SUCCESS)
        return HttpResponseRedirect("../")


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    change_list_template = "users/admin/position_changelist.html"
    list_display = ['name', 'get_role_name']

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('create_default_positions/', self.admin_site.admin_view(self.create_default_positions),
                 name='create_default_positions'),
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
                if role_type == 'client':
                    role = Role.objects.get(type=role_type)
                    Position.objects.get_or_create(
                        name="Client",
                        role=role
                    )

                if role_type == 'contractor':
                    role = Role.objects.get(type=role_type)
                    Position.objects.get_or_create(
                        name="Prime Contractor",
                        role=role
                    )
                    Position.objects.get_or_create(
                        name="Sub Contractor",
                        role=role
                    )
                if role_type == 'er_user':
                    role = Role.objects.get(type=role_type)
                    Position.objects.get_or_create(
                        name="Admin",
                        role=role
                    )

                if role_type == 'er_user':
                    role = Role.objects.get(type=role_type)
                    Position.objects.get_or_create(
                        name="Admin",
                        role=role
                    )
            except Exception as e:
                error_message = str(e)
                self.message_user(request, error_message, messages.ERROR)
                return HttpResponseRedirect("../")

        self.message_user(request, "Default Position created successfully.", messages.SUCCESS)
        return HttpResponseRedirect("../")