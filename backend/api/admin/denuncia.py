from django.contrib import admin
from ..models.denuncia import Denuncia


@admin.register(Denuncia)
class DenunciaAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "tipo",
        "dataDenuncia",
        "postagem",
        "repositorio",
        "comentario",
    ]
    list_filter = ["tipo", "dataDenuncia"]
    search_fields = ["tipo"]
    readonly_fields = ["dataDenuncia"]
    ordering = ["-dataDenuncia"]

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .select_related("postagem", "repositorio", "comentario")
        )
