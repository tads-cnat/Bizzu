from django.db import models
import uuid
from .postagem import Postagem
from .usuario import Usuario

class Comentario(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    postagem = models.ForeignKey(Postagem, on_delete=models.CASCADE)
    conteudo = models.TextField()
    dataPostagem = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentário de {self.usuario.nome} em {self.dataPostagem}"