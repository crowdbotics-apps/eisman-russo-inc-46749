from django_filters import rest_framework as filters
from ticketing.models import Project


class ProjectFilters(filters.FilterSet):
    client_name = filters.CharFilter(field_name="client__name", lookup_expr="icontains")
    event_name = filters.CharFilter(field_name="event__name", lookup_expr="icontains")

    class Meta:
        model = Project
        fields = ["client_name", "event_name"]
