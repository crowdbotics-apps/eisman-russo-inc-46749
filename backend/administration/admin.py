from django.contrib import admin

from administration.models import (
    DebrisType,
    SubActivity,
    TruckType,
    HazardType,
    HazardName,
)


# Register your models here.
@admin.register(DebrisType)
class DebrisTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


admin.site.register(SubActivity)
admin.site.register(HazardType)
admin.site.register(HazardName)
admin.site.register(TruckType)
