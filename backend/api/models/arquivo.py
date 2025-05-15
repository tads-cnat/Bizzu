from .repositorio import Repositorio
from django.db import models


class Arquivo(models.Model):
    repositorio = models.ForeignKey(
        Repositorio,
        verbose_name="Repositório",
        on_delete=models.CASCADE,
        related_name="arquivos",
    )
    arquivo = models.FileField(
        verbose_name="Arquivo", upload_to="arquivos/"
    )  # rever se necessita de upload_to="arquivos/" com o novo banco

    def __str__(self):
        return f"Arquivo de {self.repositorio.titulo}"
