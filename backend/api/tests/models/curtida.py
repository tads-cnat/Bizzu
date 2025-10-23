from django.test import TestCase

from ...models import Curtida, Usuario, Postagem

class CurtidaModelTest(TestCase):
    """Testes unitários para o modelo Curtida"""

    def setUp(self):
        self.usuario = Usuario.objects.create(username="luiz", password="123")
        self.postagem = Postagem.objects.create(
            texto="Primeiro post", usuario=self.usuario
        )
        self.curtida = Curtida.objects.create(
            usuario=self.usuario, postagem=self.postagem
        )

    def test_criacao_com_sucesso(self):
        """Deve criar uma curtida com sucesso"""
        self.assertEqual(self.curtida.usuario.username, "luiz")
        self.assertEqual(self.curtida.postagem.texto, "Primeiro post")

    def test_str_retorna_texto_correto(self):
        """O método __str__ deve exibir a frase esperada"""
        esperado = f"{self.usuario} curtiu {self.postagem}"
        self.assertEqual(str(self.curtida), esperado)