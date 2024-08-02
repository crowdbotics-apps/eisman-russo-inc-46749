from rest_framework.pagination import PageNumberPagination


class ListPagination(PageNumberPagination):
    page_size = 10  # Number of objects to include per page
    page_size_query_param = "page_size"
    max_page_size = 10
