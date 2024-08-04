from django.contrib import admin

from ticketing.models import Project, DebrisType


class ProjectAdmin(admin.ModelAdmin):
    list_display = ["id", "event"]


class DebrisTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


admin.site.register(Project, ProjectAdmin)
admin.site.register(DebrisType, DebrisTypeAdmin)
