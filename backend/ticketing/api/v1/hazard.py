from base.pagination import ListPagination
from base.utils import error_handler
from rest_framework import status, viewsets, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ticketing.models import DebrisType, HazardName, HazardType
from ticketing.serializers import (
    DebrisSerializer,
    HazardNameSerializer,
    HazardTypeSerializer,
)
from drf_spectacular.utils import extend_schema, inline_serializer
from django.utils.decorators import method_decorator


class DebrisViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = DebrisType.objects.all()
    serializer_class = DebrisSerializer
    filterset_fields = ["is_active"]
    pagination_class = ListPagination
    search_fields = ["name"]
    ordering = ["-created_at"]

    def list(self, request, *args, **kwargs):
        debris = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(debris)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    @method_decorator(
        name="create",
        decorator=extend_schema(
            responses={
                status.HTTP_201_CREATED: inline_serializer(
                    name="DebrisResponse", fields={"result": DebrisSerializer()}
                )
            },
        ),
    )
    def create(self, request, *args, **kwargs):
        serializer = DebrisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"result": serializer.data}, status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(
        name="Retrieve",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="DebrisResponse", fields={"result": DebrisSerializer()}
                )
            },
        ),
    )
    def retrieve(self, request, *args, **kwargs):
        debris = self.get_object()
        serializer = self.serializer_class(debris)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    @method_decorator(
        name="Update",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="DebrisResponse", fields={"detail": DebrisSerializer()}
                )
            },
        ),
    )
    def update(self, request, *args, **kwargs):
        debris = self.get_object()
        serializer = self.serializer_class(
            instance=debris, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": serializer.data}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(
        name="create",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="DebrisResponse", fields={"detail": serializers.CharField()}
                )
            },
        ),
    )
    def destroy(self, request, *args, **kwargs):
        debris = self.get_object()
        debris.delete()
        return Response(
            {"detail": "Debris Type Deleted Successfully"}, status=status.HTTP_200_OK
        )


class HazardTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = HazardType.objects.all()
    serializer_class = HazardTypeSerializer
    filterset_fields = ["is_active"]
    pagination_class = ListPagination
    search_fields = ["type"]
    ordering = ["-created_at"]

    def list(self, request, *args, **kwargs):
        hazards = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(hazards)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    @method_decorator(
        name="Create Hazard Type",
        decorator=extend_schema(
            responses={
                status.HTTP_201_CREATED: inline_serializer(
                    name="HazardTypeResoponse",
                    fields={"result": HazardTypeSerializer()},
                )
            },
        ),
    )
    def create(self, request, *args, **kwargs):
        serializer = HazardTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"result": serializer.data}, status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(
        name="Retrieve Hazard Type",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="HazardTypeResoponse",
                    fields={"result": HazardTypeSerializer()},
                )
            },
        ),
    )
    def retrieve(self, request, *args, **kwargs):
        hazard = self.get_object()
        serializer = self.serializer_class(hazard)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    @method_decorator(
        name="Update Hazard Type",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="HazardTypeResoponse",
                    fields={"detail": HazardTypeSerializer()},
                )
            },
        ),
    )
    def update(self, request, *args, **kwargs):
        hazard = self.get_object()
        serializer = self.serializer_class(
            instance=hazard, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": serializer.data}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(
        name="Delete Hazard Type",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="HazardTypeResoponse",
                    fields={"detail": serializers.CharField()},
                )
            },
        ),
    )
    def destroy(self, request, *args, **kwargs):
        hazard = self.get_object()
        hazard.delete()
        return Response(
            {"detail": "Hazard Type Deleted Successfully"}, status=status.HTTP_200_OK
        )


class HazardNameViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = HazardName.objects.all()
    serializer_class = HazardNameSerializer
    filterset_fields = ["is_active", "type"]
    search_fields = ["name", "type"]
    pagination_class = ListPagination
    ordering = ["-created_at"]

    def list(self, request, *args, **kwargs):
        hazard = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(hazard)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    @method_decorator(
        name="Create Hazard Name",
        decorator=extend_schema(
            responses={
                status.HTTP_201_CREATED: inline_serializer(
                    name="HazardNameResoponse",
                    fields={"result": HazardNameSerializer()},
                )
            },
        ),
    )
    def create(self, request, *args, **kwargs):
        serializer = HazardNameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"result": serializer.data}, status=status.HTTP_201_CREATED)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(
        name="Retrieve Hazard Name",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="HazardNameResoponse",
                    fields={"result": HazardNameSerializer()},
                )
            },
        ),
    )
    def retrieve(self, request, *args, **kwargs):
        hazard = self.get_object()
        serializer = self.serializer_class(hazard)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    @method_decorator(
        name="Update Hazard Name",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="HazardNameResoponse",
                    fields={"detail": HazardNameSerializer()},
                )
            },
        ),
    )
    def update(self, request, *args, **kwargs):
        hazard = self.get_object()
        serializer = self.serializer_class(
            instance=hazard, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": serializer.data}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(
        name="Delete Hazard Name",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="HazardNameResoponse",
                    fields={"detail": serializers.CharField()},
                )
            },
        ),
    )
    def destroy(self, request, *args, **kwargs):
        hazard = self.get_object()
        hazard.delete()
        return Response(
            {"detail": "Hazard Name Deleted Successfully"}, status=status.HTTP_200_OK
        )
