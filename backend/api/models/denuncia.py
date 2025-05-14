from django.db import models
from .usuario import Usuario
from .postagem import Postagem
from .repositorio import Repositorio

class Denuncia(models.Model):
    postagem = models.ForeignKey(Postagem, on_delete=models.CASCADE)