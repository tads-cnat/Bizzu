from django.contrib import admin
from ..models.curtida import Curtida


class CurtidaAdmin(admin.ModelAdmin):
    pass


admin.site.register(Curtida, CurtidaAdmin)
