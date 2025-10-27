from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.test import TestCase
from api.serializers.usuario import (
    UsuarioSerializer,
    UsuarioProfileSerializer,
    UsuarioPatchSerializer,
    PesquisaSerializer,
    SolicitacaoSerializer,
)
from api.models.usuario import Usuario, Solicitacao

default_password = "12345678"


class UsuarioSerializerTest(TestCase):
    usuario = None

    def setUp(self):
        self.usuario = Usuario.objects.create(
            username="Nirvana",
            nome="Nirvana",
            descricao="Desenvolvedor full stack",
            papel="int",
        )

    # UsuarioSerializer
    def test_usuario_serializer_output(self):
        serializer = UsuarioSerializer(instance=self.usuario)
        data = serializer.data
        self.assertEqual(data["id"], self.usuario.id)
        self.assertEqual(data["username"], self.usuario.username)
        self.assertEqual(data["nome"], self.usuario.nome)
        self.assertEqual(data["papel"], self.usuario.papel)

    def test_usuario_serializer_input_valid(self):
        input = {
            "id": 999,
            "username": "testeInput",
            "nome": "testeInput",
            "papel": "int",
        }
        serializer = UsuarioSerializer(data=input)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_usuario_serializer_missing_username(self):
        input = {"nome": self.usuario.nome, "papel": self.usuario.papel}
        serializer = UsuarioSerializer(data=input)
        self.assertFalse(serializer.is_valid())
        self.assertIn("username", serializer.errors)

    def test_usuario_serializer_missing_name(self):
        input = {"username": self.usuario.username, "papel": self.usuario.papel}
        serializer = UsuarioSerializer(data=input)
        self.assertFalse(serializer.is_valid())
        self.assertIn("nome", serializer.errors)


class UsuarioProfileSerializerTest(TestCase):
    usuario = None

    def setUp(self):
        self.usuario = Usuario.objects.create(
            username="Nirvana",
            nome="Nirvana",
            descricao="Desenvolvedor full stack",
            papel="int",
        )

    def test_profile_serializer_create(self):
        input = {
            "username": "teste",
            "nome": self.usuario.nome,
            "password": default_password,
            "papel": "int",
        }
        serializer = UsuarioProfileSerializer(data=input)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        usuario = serializer.save()
        self.assertEqual(usuario.username, input["username"])
        self.assertTrue(usuario.check_password("12345678"))

    def test_profile_serializer_create_invalid_name(self):
        nome_longo = "a" * 51
        input = {
            "username": self.usuario.username,
            "nome": nome_longo,
            "password": default_password,
            "papel": "int",
        }
        serializer = UsuarioProfileSerializer(data=input)
        self.assertFalse(serializer.is_valid())
        self.assertIn("nome", serializer.errors)

    def test_profile_serializer_create_invalid_role(self):
        input = {
            "username": self.usuario.username,
            "nome": self.usuario.nome,
            "password": default_password,
            "papel": "olaa",
        }
        serializer = UsuarioProfileSerializer(data=input)
        self.assertFalse(serializer.is_valid())
        self.assertIn("papel", serializer.errors)


class UsuarioPatchSerializerTest(TestCase):
    usuario = None

    def setUp(self):
        self.usuario = Usuario.objects.create(
            username="Nirvana",
            nome="Nirvana",
            descricao="Desenvolvedor full stack",
            papel="int",
        )

    def test_patch_serializer_valid_input(self):
        input = {
            "nome": "nevada",
            "descricao": "Nova descrição",
            "escolaFormacao": "Nova escolaFormação",
            "instituicaoAtual": "Nova instituicaoAtual",
        }
        serializer = UsuarioPatchSerializer(
            instance=self.usuario, data=input, partial=True
        )
        self.assertTrue(serializer.is_valid())
        usuario = serializer.save()
        self.assertEqual(usuario.nome, input["nome"])
        self.assertEqual(usuario.descricao, input["descricao"])
        self.assertEqual(usuario.escolaFormacao, input["escolaFormacao"])
        self.assertEqual(usuario.instituicaoAtual, input["instituicaoAtual"])

    def test_patch_serializer_invalid_name(self):
        input = {"nome": "a" * 51}
        serializer = UsuarioPatchSerializer(
            instance=self.usuario, data=input, partial=True
        )
        self.assertFalse(serializer.is_valid())
        self.assertIn("nome", serializer.errors)

    def test_patch_serializer_invalid_description(self):
        input = {"descricao": "a" * 201}
        serializer = UsuarioPatchSerializer(
            instance=self.usuario, data=input, partial=True
        )
        self.assertFalse(serializer.is_valid())
        self.assertIn("descricao", serializer.errors)

    def test_patch_serializer_invalid_escolaFormacao(self):
        input = {"escolaFormacao": "a" * 31}
        serializer = UsuarioPatchSerializer(
            instance=self.usuario, data=input, partial=True
        )
        self.assertFalse(serializer.is_valid())
        self.assertIn("escolaFormacao", serializer.errors)

    def test_patch_serializer_invalid_instituicaoAtual(self):
        input = {"instituicaoAtual": "a" * 31}
        serializer = UsuarioPatchSerializer(
            instance=self.usuario, data=input, partial=True
        )
        self.assertFalse(serializer.is_valid())
        self.assertIn("instituicaoAtual", serializer.errors)


class PesquisaSerializerTest(TestCase):
    usuario = None

    def setUp(self):
        self.usuario = Usuario.objects.create(
            username="Nirvana",
            nome="Nirvana",
            descricao="Desenvolvedor full stack",
            papel="int",
        )

    def test_pesquisa_serializer_output(self):
        serializer = PesquisaSerializer(instance=self.usuario)
        data = serializer.data
        self.assertEqual(data["username"], self.usuario.username)
        self.assertEqual(data["imagemPerfil"], self.usuario.imagemPerfil)


class SolicitacaoSerializerTest(TestCase):
    def setUp(self):
        self.usuario = Usuario.objects.create(
            username="Nirvana",
            nome="Nirvana",
            descricao="Desenvolvedor full stack",
            papel="int",
        )

    def test_serializer_valid(self):
        input = {
            "descricao": "Solicitação de teste",
            "solicitante": self.usuario.id,
            "status": "pendente",
        }
        serializer = SolicitacaoSerializer(data=input)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        solicitacao = serializer.save()
        self.assertEqual(solicitacao.descricao, input["descricao"])
        self.assertEqual(solicitacao.solicitante, self.usuario)
        self.assertEqual(solicitacao.status, input["status"])
        self.assertEqual(serializer.data["nome_solicitante"], self.usuario.nome)

    def test_serializer_missing_solicitante(self):
        data = {
            "descricao": "Sem solicitante",
            "status": "pendente",
        }
        serializer = SolicitacaoSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("solicitante", serializer.errors)

    def test_serializer_invalid_status(self):
        data = {
            "descricao": "Status inválido",
            "solicitante": self.usuario.id,
            "status": "teste",
        }
        serializer = SolicitacaoSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("status", serializer.errors)

    def test_nome_solicitante_field(self):
        solicitacao = Solicitacao.objects.create(
            descricao="Quero ser adm",
            solicitante=self.usuario,
            status="pendente",
        )
        serializer = SolicitacaoSerializer(instance=solicitacao)
        self.assertEqual(serializer.data["nome_solicitante"], self.usuario.nome)
