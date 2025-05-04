from django.db import models
import uuid
from app_bizzu.models.usuario import Usuario
from app_bizzu.models.comunidade import Comunidade
from app_bizzu.models.categoria import Categoria

class Repositorio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dataPublicacao = models.DateTimeField(verbose_name="Data de publicação", auto_now_add=True)
    titulo = models.CharField(verbose_name="Título", max_length=50)
    descricao = models.CharField(verbose_name="Descrição", max_length=200)
    usuario = models.ForeignKey(Usuario, verbose_name="Usuário", on_delete=models.CASCADE, related_name="repositorios")
    comunidade = models.ForeignKey(Comunidade, verbose_name="Comunidade", on_delete=models.CASCADE, null=True, blank=True)
    categorias = models.ManyToManyField(Categoria, verbose_name="Categorias", blank=True)

    def __str__(self):
        return self.titulo

    class Meta:
        verbose_name = "Repositório"
        verbose_name_plural = "Repositórios"

class ArquivoRepositorio(models.Model):
    repositorio = models.ForeignKey(Repositorio, verbose_name="Repositório", on_delete=models.CASCADE, related_name="arquivos")
    arquivo = models.FileField(verbose_name="Arquivo", upload_to="arquivosRepositorios/")

    def __str__(self):
        return f"Arquivo de {self.repositorio.titulo}"