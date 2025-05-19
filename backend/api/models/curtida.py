import uuid
from django.db import models
from django.contrib.auth import get_user_model
from .postagem import Postagem

User = get_user_model()

class Curtida(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="curtidas")
    postagem = models.ForeignKey(Postagem, on_delete=models.CASCADE, related_name="curtidas")
    data = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('usuario', 'postagem')

    def __str__(self):
        return f'{self.usuario} curtiu {self.postagem}'
