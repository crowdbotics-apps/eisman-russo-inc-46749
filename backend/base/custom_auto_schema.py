from drf_spectacular.openapi import AutoSchema

from drf_spectacular.utils import OpenApiParameter


class CustomAutoSchema(AutoSchema):
    global_params = [
        OpenApiParameter(
            name="isMobile",
            type=bool,
            location=OpenApiParameter.HEADER,
            description="`true` or `false`. The default value is false",
        ),
        OpenApiParameter(
            name="deviceId",
            type=str,
            location=OpenApiParameter.HEADER,
            description="The id of the device",
        ),
    ]

    def get_override_parameters(self):
        params = super().get_override_parameters()
        return params + self.global_params
