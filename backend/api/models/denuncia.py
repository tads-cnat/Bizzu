from django.db import models
from .usuario import Usuario
from .postagem import Postagem
from .repositorio import Repositorio
from .comentario import Comentario
from django.core.exceptions import ValidationError


class Denuncia(models.Model):
    TIPO = (
            ("ling", "Linguajar Ofensivo"),
                    ("spam", "Spam"),
                            ("dis", "Discurso violento"),
                                    ("odio", "Ódio"),
                                            ("out", "Outros"),
                                                )
    postagem = models.ForeignKey(
        Postagem, on_delete=models.CASCADE, null=True, blank=True
    )
    repositorio = models.ForeignKey(
        Repositorio, on_delete=models.CASCADE, null=True, blank=True
    )
    comentario = models.ForeignKey(
        Comentario, on_delete=models.CASCADE, null=True, blank=True
    )
    dataDenuncia = models.DateTimeField(auto_now_add=True)
    tipo = models.CharField(choices=TIPO, max_length=40)

    def __str__(self):
        return f"{self.tipo} denunciado em {self.dataDenuncia}"

    def clean(self):
        super().clean()

        if self.postagem and self.comentario:
            if self.comentario.postagem_id != self.postagem.id:
                raise ValidationError(
                    "O comentário selecionado não pertence à postagem selecionada."
                )

        if self.repositorio and self.comentario:
            raise ValidationError(
                "Não é possível denunciar um comentário escolhendo um repositório"
            )
