
CONTRACTOR = 'contractor'
CLIENT = 'client'
ER_USER = 'er_user'
ER_SUB_CONSULTANT = 'er_sub_consultant'

PRIME_CONTRACTOR = "Prime Contractor"
SUB_CONTRACTOR = "Sub Contractor"

WEB = 'web'
MOBILE = 'mobile'
BOTH = 'both'

ROLE_CHOICES = [
    (ER_USER, "E&R User", True),
    (ER_SUB_CONSULTANT, "E&R Sub Consultant", True),
    (CLIENT, "Client", False),
    (CONTRACTOR, "Contractor", False),
]
