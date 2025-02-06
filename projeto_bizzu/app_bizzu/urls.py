from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from app_bizzu.views import comentarioView,comunidadeView, curtidaView, postagemView, repositorioView, usuarioView

urlpatterns=[
    path('', usuarioView.UsuarioView.feed, name="feedDeslogado"),
    path('perfil/', usuarioView.UsuarioView.perfil, name='perfil'),
    path('feed/', usuarioView.UsuarioView.feed, name='feed'),
    # path('<uuid:postagem_id>/curtida/', views.curtida, name='curtida'),
    path('cadastro/', usuarioView.UsuarioView.cadastro, name='cadastro'),
    path('login/', usuarioView.UsuarioView.login, name='login'),
    path('repositorio/', repositorioView.RepositorioView.verRepositorio, name='verRepositorio'),
    path('novo/repositorio/', repositorioView.RepositorioView.novoRepositorio, name='novoRepositorio'),
    path('salvos/repositorio/', repositorioView.RepositorioView.repositorioSalvos, name='repositorioSalvos'),
    path('sair/', usuarioView.UsuarioView.sair, name='sair'),
    path('escolher-comunidade/', comunidadeView.ComunidadeView.escolher_comunidade, name='escolher_comunidade'),
    # path('deslogado',views.deslogado,name='deslogado'),
    path('associar-comunidade/', comunidadeView.ComunidadeView.associar_comunidade, name='associar_comunidade'),
    path('editar-perfil/', usuarioView.UsuarioView.cadastro_perfil, name='cadastro_perfil'),
    path('comentar/<uuid:postagem_id>/', comentarioView.ComentarioView.adicionar_comentario, name='adicionar_comentario'),
    path('api/comentarios/<uuid:postagem_id>/', comentarioView.ComentarioView.get_comentarios, name='get_comentarios'),
    path('seguir/<int:pk>/', usuarioView.UsuarioView.seguirPerfil, name='seguir_perfil'),
    path('editarPerfil/', usuarioView.UsuarioView.editarPerfil, name='editarPerfil'),
    path('curtida/<uuid:postagem_id>/', curtidaView.CurtidaView.curtida, name='curtida'),
    path('pesquisa/', usuarioView.UsuarioView.pesquisa, name='pesquisa'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
