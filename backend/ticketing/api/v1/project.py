from base.decorators import check_permissions
from base.pagination import ListPagination
from base.permissions import MANAGE_SUBACTIVITY, MANAGE_TRUCK_TYPE
from base.utils import error_handler

from django.utils.decorators import method_decorator
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import status, viewsets, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from ticketing.models import Project, ContractorRateMatrix
from ticketing.serializers import (
    ProjectCreateUpdateSerializer,
    ProjectResponseSerialzer,
    ContractorRateMatrixSerializer,
    ContractorRateMatrixModifySerializer,
)
from ticketing.filters import ProjectFilters
from ticketing.services import ProjectService


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectResponseSerialzer
    queryset = Project.objects.all()
    search_fields = ["name"]
    filterset_fields = ["event", "client"]
    ordering = ["-created_at"]
    pagination_class = ListPagination
    http_method_names = ["get", "post", "put", "delete"]

    def list(self, request):
        projects = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(projects)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    @method_decorator(
        name="create project",
        decorator=extend_schema(
            request=ProjectCreateUpdateSerializer(),
            responses={
                status.HTTP_201_CREATED: inline_serializer(
                    name="ProjectResponseSchema",
                    fields={"result": ProjectResponseSerialzer()},
                )
            },
        ),
    )
    def create(self, request, *args, **kwargs):
        return ProjectService().create_project(self, request)

    @method_decorator(
        name="Retreive Project",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="ProjectResponseSchema",
                    fields={"result": ProjectResponseSerialzer()},
                )
            },
        ),
    )
    def retrieve(self, request, pk=None):
        projects = self.get_object()
        serializer = self.serializer_class(projects)
        return Response({"result": serializer.data}, status=status.HTTP_200_OK)

    @method_decorator(
        name="update project",
        decorator=extend_schema(
            request=ProjectCreateUpdateSerializer(),
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="ProjectResponseSchema",
                    fields={"result": ProjectResponseSerialzer()},
                )
            },
        ),
    )
    def update(self, request, pk=None):
        projects = self.get_object()
        serializer = ProjectCreateUpdateSerializer(instance=projects, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": serializer.data}, status=status.HTTP_200_OK)

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(
        name="Destroy Project",
        decorator=extend_schema(
            responses={
                status.HTTP_200_OK: inline_serializer(
                    name="ProjectResponseSchema",
                    fields={"result": ProjectResponseSerialzer()},
                )
            },
        ),
    )
    def destroy(self, request, pk=None):
        project = self.get_object()
        project.delete()
        return Response(
            {"detail": "Project Deleted Successfully"}, status=status.HTTP_200_OK
        )


class ContractorRateMatrixViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ContractorRateMatrix.objects.all()
    serializer_class = ContractorRateMatrixSerializer
    filterset_fields = ["project"]
    pagination_class = ListPagination
    ordering = ["-created_at"]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        serializer = self.serializer_class(page, many=True)
        paginated_response = self.get_paginated_response(serializer.data)
        return paginated_response

    def create(self, request, *args, **kwargs):
        serializer = ContractorRateMatrixModifySerializer(data=request.data)
        if serializer.is_valid():
            matrix = serializer.save()
            matrix_serializer = self.serializer_class(matrix)
            return Response(
                {"result": matrix_serializer.data}, status=status.HTTP_201_CREATED
            )

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        matrix = self.get_object()
        serializer = ContractorRateMatrixModifySerializer(
            instance=matrix, data=request.data, partial=True
        )
        if serializer.is_valid():
            matrix = serializer.save()
            matrix_serializer = self.serializer_class(matrix)
            return Response(
                {"result": matrix_serializer.data}, status=status.HTTP_200_OK
            )

        message = error_handler(serializer.errors)
        return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        matrix = self.get_object()
        matrix.delete()
        return Response(
            {"detail": "Contractor Rate Matrix Deleted Successfully"},
            status=status.HTTP_200_OK,
        )
