from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views



urlpatterns=[
    path('', views.feed, name="feedDeslogado"),
    path('perfil/', views.perfil, name='perfil'),
    path('feed/', views.feed, name='feed'),
    path('<uuid:postagem_id>/curtida/', views.curtida, name='curtida'),
    path('cadastro/', views.cadastro, name='cadastro'),
    path('login/', views.login, name='login'),
    path('repositorio/', views.verRepositorio, name='verRepositorio'),
    path('novo/repositorio/', views.novoRepositorio, name='novoRepositorio'),
    path('salvos/repositorio/', views.repositorioSalvos, name='repositorioSalvos'),
    path('sair/', views.sair, name='sair'),
    path('escolher-comunidade/', views.escolher_comunidade, name='escolher_comunidade'),
    # path('deslogado',views.deslogado,name='deslogado'),
    path('associar-comunidade/', views.associar_comunidade, name='associar_comunidade'),
    path('editar-perfil/', views.editar_perfil, name='editar_perfil'),
    path('perfil/pessoal/', views.perfilPessoal, name='basePerfil'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
