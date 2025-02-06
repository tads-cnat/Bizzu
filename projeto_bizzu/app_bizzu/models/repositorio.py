from django.db import models
from app_bizzu.models.usuario import Usuario
from app_bizzu.models.comunidade import Comunidade

class Repositorio(models.Model):
    dataPublicacao = models.DateTimeField(verbose_name="Data de publicação", auto_now_add=True)
    descricao = models.CharField(verbose_name="Descrição",max_length= 200)
    titulo = models.CharField(verbose_name="Título", max_length= 50)
    comunidade = models.ForeignKey(Comunidade,  verbose_name="Comunidade", on_delete=models.CASCADE, null=True, blank=True, default=None)
    usuario = models.ForeignKey(Usuario, verbose_name="Usuário", on_delete=models.CASCADE, null=True, blank=True, default=None)
    arquivo = models.FileField(verbose_name="Arquivos anexados", default=None, upload_to="arquivosRepositorios/")

    def __str__(self):
        return self.titulo