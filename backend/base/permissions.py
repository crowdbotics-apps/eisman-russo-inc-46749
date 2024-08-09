users_app = "users"
ticketing_app = "ticketing"

MANAGE_POSITION = "manage_position"
MANAGE_ROLE = "manage_role"
MANAGE_DEBRIS_TYPE = "manage_debris_type"
MANAGE_HAZARD_TYPE = "manage_hazard_type"
MANAGE_HAZARD_NAME = "manage_hazard_name"
MANAGE_SUBACTIVITY = "manage_subactivity"
MANAGE_TRUCK_TYPE = "manage_truck_type"
ADD_EVENT = "add_event"
CHANGE_EVENT = "change_event"

ALL_PERMISSIONS = {
    MANAGE_POSITION: {
        "app_name": users_app,
        "name": "Manage Position",
    },
    MANAGE_ROLE: {"app_name": users_app, "name": "Manage Role"},
    MANAGE_DEBRIS_TYPE: {
        "app_name": ticketing_app,
        "name": "Manage Debris Type",
    },
    MANAGE_HAZARD_TYPE: {
        "app_name": ticketing_app,
        "name": "Manage Hazard Type",
    },
    MANAGE_HAZARD_NAME: {
        "app_name": ticketing_app,
        "name": "Manage Hazard Name",
    },
    MANAGE_SUBACTIVITY: {
        "app_name": ticketing_app,
        "name": "Manage SubActivity",
    },
    MANAGE_TRUCK_TYPE: {
        "app_name": ticketing_app,
        "name": "Manage Truck Type",
    },
    ADD_EVENT: {
        "app_name": ticketing_app,
        "name": "Create Event",
    },
    CHANGE_EVENT: {
        "app_name": ticketing_app,
        "name": "Update Event",
    },
}
