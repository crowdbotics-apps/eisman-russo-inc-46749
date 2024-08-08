from django.contrib import admin

from ticketing.models import Project, City, State, Event, DebrisType


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


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "state"]


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.site.register(DebrisType)
class DebrisTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
