from rest_framework import permissions


class PermissionList(permissions.BasePermission):
    papel = None

    def has_permission(self, request, view):
        usuario = request.user
        if not usuario.is_authenticated:
            return False
        if usuario.papel == self.papel:
            return True
        return False


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.usuario == request.user
