from django.contrib import admin
from ..models.usuario import Usuario


class UsuarioAdmin(admin.ModelAdmin):
    pass


admin.site.register(Usuario, UsuarioAdmin)
