from rest_framework import status
from rest_framework.response import Response
from ticketing.serializers import (
    ProjectCreateUpdateSerializer,
    ProjectResponseSerialzer,
)
from base.utils import error_handler


class ProjectService:

    def create_project(self, viewset, request):
        serializer = ProjectCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer.validated_data["id"] = serializer.data.get("id")
            response = serializer.validated_data
            return Response(
                {"result": viewset.serializer_class(response).data},
                status=status.HTTP_201_CREATED,
            )

        return Response(
            error_handler(serializer.errors), status=status.HTTP_400_BAD_REQUEST
        )
