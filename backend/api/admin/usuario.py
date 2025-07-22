from django.contrib import admin
from ..models.usuario import Usuario, Solicitacao


class UsuarioAdmin(admin.ModelAdmin):
    pass


admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Solicitacao, UsuarioAdmin)
