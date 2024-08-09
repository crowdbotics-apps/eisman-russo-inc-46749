EACH = "each"
TONS = "tons"
CYDS = "cyds"

rate_matrix_custom_fields = ["mileage", "diameter", "unit", "weight", "reduction_rate"]


def get_rate_matrix_custom_fields(field):
    if field == "mileage":
        return ["mileage_from", "mileage_to"]
    elif field == "diameter":
        return ["diameter_from", "diameter_to"]
    elif field == "unit":
        return ["unit_from", "unit_to"]
    elif field == "weight":
        return ["weight_from", "weight_to"]
    elif field == "reduction_rate":
        return ["reduction_rate"]
    return []
