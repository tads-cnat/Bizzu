from django.core.exceptions import ValidationError
from django.test import TestCase
from api.models.usuario import Usuario


class UsuarioTest(TestCase):
    usuario = None

    def setUp(self):
        self.usuario = Usuario.objects.create(
            username="Nirvana",
            nome="Nirvana",
            descricao="Desenvolvedor full stack",
            papel="int",
        )

    def test_create_success(self):
        self.assertEqual(self.usuario.username, self.usuario)
        self.assertEqual(self.usuario.nome, self.usuario)
        self.assertEqual(self.usuario.papel, self.usuario)

    def test_name_required(self):
        usuario = Usuario(username=self.usuario, papel=self.usuario.papel)
        with self.assertRaises(ValidationError):
            usuario.full_clean()

    def test_name_max_length(self):
        nome_longo = "a" * 51
        usuario = Usuario(
            username=self.usuario.username, nome=nome_longo, papel=self.usuario.papel
        )
        with self.assertRaises(ValidationError):
            usuario.full_clean()

    def test_description_max_length(self):
        descricao_longa = "a" * 201
        usuario = Usuario(
            username=self.usuario.username,
            nome=self.usuario.nome,
            papel=self.usuario.papel,
            descricao=descricao_longa,
        )
        with self.assertRaises(ValidationError):
            usuario.full_clean()

    def test_role_required(self):
        usuario = Usuario(username=self.usuario.username, nome=self.usuario.nome)
        with self.assertRaises(ValidationError):
            usuario.full_clean()
