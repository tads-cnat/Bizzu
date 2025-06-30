from rest_framework import permissions


class PermissionList(permissions.BasePermission):
    papel = None

    def has_permission(self, request, view):
        usuario = request.user
        if not usuario.is_authenticated:
            return False
        elif usuario.papel == self.papel:
            return True
        return False
