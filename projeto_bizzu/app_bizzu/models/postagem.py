from django.db import models
import uuid

class Postagem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    texto = models.CharField(verbose_name="Texto de descrição",max_length= 200)
    imagem = models.ImageField(verbose_name="Imagem",upload_to="imgPostagens/")
    dataPublicacao = models.DateTimeField(auto_now_add=True, verbose_name="Data de publicação")
    usuario = models.ForeignKey("Usuario", verbose_name="Usuário", on_delete=models.CASCADE, null=True, blank=True)
    curtidas = models.IntegerField(verbose_name="Curtidas", default=0)

    def __str__(self):
        return self.texto