from django.contrib import admin
from ..models.postagem import Postagem


class PostagemAdmin(admin.ModelAdmin):
    pass


admin.site.register(Postagem, PostagemAdmin)
