from ...serializers.curtida import CurtidaSerializer
from django.test import TestCase
from ...models.curtida import Curtida
from ...models.usuario import Usuario
from ...models.postagem import Postagem


class CurtidaSerializerTest(TestCase):
    """Testes unitários para o serializer CurtidaSerializer"""

    def setUp(self):
        self.usuario = Usuario.objects.create(username="ana", password="123")
        self.postagem = Postagem.objects.create(
            texto="Post Legal: Conteúdo legal", usuario=self.usuario
        )
        self.curtida = Curtida.objects.create(
            usuario=self.usuario, postagem=self.postagem
        )

    def test_serializacao_saida_valida(self):
        """Deve serializar corretamente uma curtida"""
        serializer = CurtidaSerializer(instance=self.curtida)
        data = serializer.data
        self.assertEqual(data["usuario"], self.usuario.id)
        self.assertEqual(data["postagem"], self.postagem.id)
        self.assertIn("id", data)

    def test_serializacao_entrada_valida(self):
        """Deve criar uma curtida com dados válidos"""
        input_data = {"usuario": self.usuario.id, "postagem": self.postagem.id}
        serializer = CurtidaSerializer(data=input_data)
        self.assertTrue(serializer.is_valid())
        curtida_criada = serializer.save()
        self.assertEqual(curtida_criada.usuario, self.usuario)
        self.assertEqual(curtida_criada.postagem, self.postagem)

    def test_serializacao_entrada_invalida(self):
        """Deve falhar ao tentar criar com campos vazios"""
        input_data = {"usuario": "", "postagem": ""}
        serializer = CurtidaSerializer(data=input_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("usuario", serializer.errors)
        self.assertIn("postagem", serializer.errors)
