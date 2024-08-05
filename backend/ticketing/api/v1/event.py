from base.pagination import ListPagination
from base.utils import error_handler
from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ticketing.models import Event
from ticketing.serializers import EventCreateSerializer, EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_fields = ["is_active", "event_date"]
    pagination_class = ListPagination
    search_fields = ["name"]
    ordering = ["-created_at"]

    def list(self, request, *args, **kwargs):
        events = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(events)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = EventCreateSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            event_serializer = self.serializer_class(event)
            return Response(
                {"result": event_serializer.data}, status=status.HTTP_201_CREATED
            )

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        event = self.get_object()
        serializer = self.serializer_class(event)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        event = self.get_object()
        serializer = EventCreateSerializer(
            instance=event, data=request.data, partial=True
        )
        if serializer.is_valid():
            event = serializer.save()
            event_serializer = self.serializer_class(event)
            return Response(
                {"result": event_serializer.data}, status=status.HTTP_200_OK
            )

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        evnet = self.get_object()
        evnet.delete()
        return Response(
            {"detail": "Event Deleted Successfully"}, status=status.HTTP_200_OK
        )
