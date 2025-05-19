from django.contrib import admin
from ..models.denuncia import Denuncia


class DenunciaAdmin(admin.ModelAdmin):
    pass


admin.site.register(Denuncia, DenunciaAdmin)
