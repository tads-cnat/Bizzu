from django.db import models
from .usuario import Usuario
from .postagem import Postagem
from .repositorio import Repositorio
from .comentario import Comentario


class Denuncia(models.Model):
    TIPO = (("com", "Comentário"), ("post", "Postagem"), ("rep", "Repositório"))
    postagem = models.ForeignKey(Postagem, on_delete=models.CASCADE, null=True)
    repositorio = models.ForeignKey(Repositorio, on_delete=models.CASCADE, null=True)
    repositorio = models.ForeignKey(Comentario, on_delete=models.CASCADE, null=True)
    dataDenuncia = models.DateTimeField(auto_now_add=True)
    tipo = models.CharField(choices=TIPO , max_length=40)

    def __str__(self):
        return f"{self.tipo} denunciado em {self.dataDenuncia}"
