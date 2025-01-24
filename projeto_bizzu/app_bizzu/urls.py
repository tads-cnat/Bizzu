from django.urls import path
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('feed',views.pagInicial,name='pagInicial'),
    path('deslogado',views.deslogado,name='deslogado'),
]