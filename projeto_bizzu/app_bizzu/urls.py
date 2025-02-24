from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from app_bizzu.views import comentarioView,comunidadeView, curtidaView, postagemView, repositorioView, usuarioView

urlpatterns=[
    path('', usuarioView.UsuarioView.feed, name="feed"),
    path('feed-seguidos/', usuarioView.UsuarioView.feed_seguidos, name='feed_seguidos'),
    path('perfil/', usuarioView.UsuarioView.perfil, name='perfil'),
    path('comunidade/<uuid:comunidade_id>/', comunidadeView.ComunidadeView.comunidade_detalhe, name='detalhes_comunidade'),
    path('cadastro/', usuarioView.UsuarioView.cadastro, name='cadastro'),
    path('login/', usuarioView.UsuarioView.login, name='login'),
    path('repositorio/', repositorioView.RepositorioView.verRepositorio, name='verRepositorio'),
    path('novo-repositorio/', repositorioView.RepositorioView.novoRepositorio, name='novoRepositorio'),
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
    path('criar-postagem/', usuarioView.UsuarioView.criar_postagem, name='criar_postagem'),
    path('excluir-repositorio/', repositorioView.RepositorioView.excluirRepositorio, name='excluirRepositorio'),
    path('postagem/excluir/<uuid:postagem_id>/', usuarioView.UsuarioView.excluir_postagem, name='excluir_postagem'),
    path('editar-repositorio/<uuid:repositorio_id>/', repositorioView.RepositorioView.editarRepositorio, name="editarRepositorio"),
    path('comunidade/<uuid:comunidade_id>/seguir/', comunidadeView.ComunidadeView.seguir_comunidade,name='seguir_comunidade'),
    path('perfil/<int:user_id>/<str:tipo>/', usuarioView.UsuarioView.lista_seguidores_seguindo, name='lista_seguidores_seguindo'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
