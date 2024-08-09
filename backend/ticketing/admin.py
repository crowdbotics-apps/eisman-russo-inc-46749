from django.contrib import admin

from ticketing.models import Project, Event


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "event",
        "client",
        "contractor",
        "sub_activity",
        "city",
    ]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
