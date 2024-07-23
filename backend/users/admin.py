
from django.contrib import admin, messages
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect

from users.forms import UserChangeForm, UserCreationForm
from users.models import Role
from django.urls import path

from users.utils import ROLE_CHOICES

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name",)}),) + auth_admin.UserAdmin.fieldsets
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
            role_type, name = role
            Role.objects.get_or_create(
                name=name,
                type=role_type
            )

        self.message_user(request, "Default Roles created successfully.", messages.SUCCESS)
        return HttpResponseRedirect("../")