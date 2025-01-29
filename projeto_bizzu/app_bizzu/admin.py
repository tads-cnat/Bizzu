from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# from .forms import UsuarioCreationForm, UsuarioChangeForm
from .models import Usuario, Postagem, Repositorio, Comentario, Comunidade, Categoria

admin.site.register(Postagem)
admin.site.register(Repositorio)
admin.site.register(Comentario)
admin.site.register(Categoria)

@admin.register(Usuario)
class CustomUsuarioAdmin(UserAdmin):
    # add_form = UsuarioCreationForm
    # form = UsuarioChangeForm
    model = Usuario

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            "classes": ("wide",),
            "fields": (
                "nome","descricao", "username", "email", "password1", "password2", "imagemPerfil", 
                "escolaFormacao", "localTrabalho", "progressoCurso", "instituicaoAtual",
            ),
        }),
    )

    fieldsets = UserAdmin.fieldsets + (
        ("Informações Personalizadas", {
            "classes": ("wide",),
            "fields": (
                "nome","descricao", "imagemPerfil", "escolaFormacao", "localTrabalho", "progressoCurso", "instituicaoAtual",
                "comunidades","repositoriosFavoritados",
            ),
        }),
    )

    list_display = ('username', 'email', 'get_comunidades')  # Exibe username, email e comunidades no admin
    search_fields = ('username', 'email', 'nome')  # Campos de busca

    def get_comunidades(self, obj):
        return ", ".join([comunidade.nome for comunidade in obj.comunidades.all()])  # Lista as comunidades do usuário
    get_comunidades.short_description = "Comunidades"

    # add_fieldsets = UserAdmin.add_fieldsets + (
    #     (None, {
    #         "classes": ("wide",),
    #         "fields": (
    #             "nome", "username", "email", "password1", "password2", "imagemPerfil", 
    #             "escolaFormacao", "localTrabalho", "progressoCurso", "instituicaoAtual",
    #         ),
    #     }),
    # )

    # fieldsets = UserAdmin.fieldsets + (
    #     ("Informações Personalizadas", {
    #         "classes": ("wide",),
    #         "fields": (
    #             "nome", "imagemPerfil", "escolaFormacao", "localTrabalho", "progressoCurso", "instituicaoAtual",
    #         ),
    #     }),
    # )

from django.contrib import admin
from .models import Comunidade

@admin.register(Comunidade)
class ComunidadeAdmin(admin.ModelAdmin):
    list_display = ('nome', 'descricao', 'numero_membros')  # Exibe o número de membros no admin
    search_fields = ('nome',)  # Permite buscar pelo nome da comunidade
    filter_horizontal = ('seguidores',)  # Certifique-se de que "membros" é o campo ManyToManyField correto

    def numero_membros(self, obj):
        return obj.seguidores.count()  # Retorna a contagem de membros
    numero_membros.short_description = "Número de Membros"
