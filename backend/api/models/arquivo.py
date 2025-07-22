from .repositorio import Repositorio
from django.db import models


def arquivo_upload_path(instance, filename):
    # Cria uma pasta para cada repositório usando o ID
    return f"arquivos/repositorio_{instance.repositorio.id}/{filename}"


class Arquivo(models.Model):
    repositorio = models.ForeignKey(
        Repositorio,
        verbose_name="Repositório",
        on_delete=models.CASCADE,
        related_name="arquivos",
    )
    arquivo = models.FileField(verbose_name="Arquivo", upload_to=arquivo_upload_path)

    def __str__(self):
        return f"Arquivo de {self.repositorio.titulo}"
