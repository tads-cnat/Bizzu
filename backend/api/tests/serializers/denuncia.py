from django.test import TestCase
from ...serializers.denuncia import DenunciaSerializer
from ...models.denuncia import Denuncia
from ...models.usuario import Usuario
from ...models.postagem import Postagem
from ...models.repositorio import Repositorio
from ...models.comentario import Comentario


class DenunciaSerializerTest(TestCase):

    def setUp(self):
        self.usuario = Usuario.objects.create(username="usuario_teste", password="123")
        self.postagem = Postagem.objects.create(
            texto="Post de teste", usuario=self.usuario
        )
        self.repositorio = Repositorio.objects.create(
            nome="Repo Teste", usuario=self.usuario
        )
        self.comentario = Comentario.objects.create(
            texto="Comentário de teste",
            usuario=self.usuario,
            postagem=self.postagem
        )
        self.denuncia = Denuncia.objects.create(
            postagem=self.postagem,
            tipo="ling"
        )

    def test_serializacao_saida_valida(self):
        serializer = DenunciaSerializer(instance=self.denuncia)
        data = serializer.data
        self.assertEqual(data["postagem"], self.postagem.id)
        self.assertEqual(data["tipo"], "ling")
        self.assertIn("id", data)
        self.assertIn("dataDenuncia", data)

    def test_serializacao_entrada_valida_postagem(self):
        input_data = {
            "postagem": self.postagem.id,
            "tipo": "spam"
        }
        serializer = DenunciaSerializer(data=input_data)
        self.assertTrue(serializer.is_valid())
        denuncia_criada = serializer.save()
        self.assertEqual(denuncia_criada.postagem.id, self.postagem.id)
        self.assertEqual(denuncia_criada.tipo, "spam")

    def test_serializacao_entrada_valida_comentario(self):
        input_data = {
            "comentario": self.comentario.id,
            "tipo": "ling"
        }
        serializer = DenunciaSerializer(data=input_data)
        self.assertTrue(serializer.is_valid())
        denuncia_criada = serializer.save()
        self.assertEqual(denuncia_criada.comentario.id, self.comentario.id)
        self.assertEqual(denuncia_criada.tipo, "ling")

    def test_serializacao_entrada_valida_repositorio(self):
        input_data = {
            "repositorio": self.repositorio.id,
            "tipo": "spam"
        }
        serializer = DenunciaSerializer(data=input_data)
        self.assertTrue(serializer.is_valid())
        denuncia_criada = serializer.save()
        self.assertEqual(denuncia_criada.repositorio.id, self.repositorio.id)
        self.assertEqual(denuncia_criada.tipo, "spam")

    def test_serializacao_entrada_invalida_sem_alvo(self):
        input_data = {
            "tipo": "ling"
        }
        serializer = DenunciaSerializer(data=input_data)
        self.assertFalse(serializer.is_valid())

    def test_serializacao_entrada_invalida_tipo_vazio(self):
        input_data = {
            "postagem": self.postagem.id,
            "tipo": ""
        }
        serializer = DenunciaSerializer(data=input_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("tipo", serializer.errors)

    def test_todos_os_tipos_de_denuncia(self):
        tipos = ["ling", "spam", "dis", "odio", "out"]
        
        for tipo in tipos:
            input_data = {
                "postagem": self.postagem.id,
                "tipo": tipo
            }
            serializer = DenunciaSerializer(data=input_data)
            self.assertTrue(serializer.is_valid(), f"Tipo {tipo} deve ser válido")
            denuncia = serializer.save()
            self.assertEqual(denuncia.tipo, tipo)
