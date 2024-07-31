from rest_framework import permissions

class DebrisTypePermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        # Define the permissions based on the action
        if view.action == 'list':
            return request.user.has_perm('ticketing.view_debristype')
        elif view.action == 'create':
            return request.user.has_perm('ticketing.add_debristype')
        elif view.action in ['update', 'partial_update']:
            return request.user.has_perm('ticketing.change_debristype')
        elif view.action == 'destroy':
            return request.user.has_perm('ticketing.delete_debristype')
        return True 