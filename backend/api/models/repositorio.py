from django.db import models
import uuid
from .usuario import Usuario
from .comunidade import Comunidade
from .categoria import Categoria

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