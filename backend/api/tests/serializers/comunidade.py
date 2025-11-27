from django.test import TestCase
from ...serializers.comunidade import ComunidadeSerializer
from ...models.comunidade import Comunidade
from ...models.usuario import Usuario


class ComunidadeSerializerTest(TestCase):

    def setUp(self):
        self.usuario = Usuario.objects.create(username="admin_comunidade", password="123")
        self.comunidade = Comunidade.objects.create(
            nome="Python Brasil",
            descricao="Comunidade de desenvolvedores Python",
            coordenacao="João Silva",
            usuario=self.usuario
        )

    def test_serializacao_saida_valida(self):
        serializer = ComunidadeSerializer(instance=self.comunidade)
        data = serializer.data
        self.assertEqual(data["nome"], "Python Brasil")
        self.assertEqual(data["descricao"], "Comunidade de desenvolvedores Python")
        self.assertEqual(data["coordenacao"], "João Silva")
        self.assertEqual(data["usuario"], self.usuario.id)
        self.assertIn("id", data)

    def test_serializacao_entrada_valida(self):
        input_data = {
            "nome": "JavaScript Brasil",
            "descricao": "Comunidade de desenvolvedores JavaScript",
            "coordenacao": "Maria Silva",
            "usuario": self.usuario.id,
            "seguidores": []
        }
        serializer = ComunidadeSerializer(data=input_data)
        self.assertTrue(serializer.is_valid())
        comunidade_criada = serializer.save()
        self.assertEqual(comunidade_criada.nome, "JavaScript Brasil")
        self.assertEqual(comunidade_criada.coordenacao, "Maria Silva")

    def test_serializacao_entrada_invalida_nome_vazio(self):
        input_data = {
            "nome": "",
            "descricao": "Descrição válida",
            "coordenacao": "Alguém",
            "usuario": self.usuario.id
        }
        serializer = ComunidadeSerializer(data=input_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("nome", serializer.errors)

    def test_serializacao_entrada_invalida_descricao_vazia(self):
        input_data = {
            "nome": "Comunidade Teste",
            "descricao": "",
            "coordenacao": "Alguém",
            "usuario": self.usuario.id
        }
        serializer = ComunidadeSerializer(data=input_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("descricao", serializer.errors)

    def test_serializacao_entrada_invalida_coordenacao_vazia(self):
        input_data = {
            "nome": "Comunidade Teste",
            "descricao": "Descrição válida",
            "coordenacao": "",
            "usuario": self.usuario.id
        }
        serializer = ComunidadeSerializer(data=input_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("coordenacao", serializer.errors)

    def test_adicionar_seguidores_na_criacao(self):
        seguidor1 = Usuario.objects.create(username="seguidor1", password="123")
        seguidor2 = Usuario.objects.create(username="seguidor2", password="123")
        
        input_data = {
            "nome": "Comunidade Teste",
            "descricao": "Descrição válida",
            "coordenacao": "Alguém",
            "usuario": self.usuario.id,
            "seguidores": [seguidor1.id, seguidor2.id]
        }
        serializer = ComunidadeSerializer(data=input_data)
        self.assertTrue(serializer.is_valid())
        comunidade_criada = serializer.save()
        self.assertEqual(comunidade_criada.seguidores.count(), 2)
        self.assertIn(seguidor1, comunidade_criada.seguidores.all())
        self.assertIn(seguidor2, comunidade_criada.seguidores.all())
