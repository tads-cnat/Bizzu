from django.test import TestCase
from django.core.exceptions import ValidationError
from ...models.comunidade import Comunidade
from ...models.usuario import Usuario


class ComunidadeModelTest(TestCase):

    def setUp(self):
        self.usuario = Usuario.objects.create(username="criador_comunidade", password="123")
        self.comunidade = Comunidade.objects.create(
            nome="Python Brasil",
            descricao="Comunidade de desenvolvedores Python",
            coordenacao="João Silva",
            usuario=self.usuario
        )

    def test_criacao_com_sucesso(self):
        self.assertEqual(self.comunidade.nome, "Python Brasil")
        self.assertEqual(self.comunidade.descricao, "Comunidade de desenvolvedores Python")
        self.assertEqual(self.comunidade.coordenacao, "João Silva")
        self.assertEqual(self.comunidade.usuario, self.usuario)

    def test_str_retorna_nome(self):
        self.assertEqual(str(self.comunidade), "Python Brasil")

    def test_adicionar_seguidor(self):
        seguidor = Usuario.objects.create(username="seguidor1", password="123")
        self.comunidade.seguidores.add(seguidor)
        self.assertIn(seguidor, self.comunidade.seguidores.all())

    def test_remover_seguidor(self):
        seguidor = Usuario.objects.create(username="seguidor2", password="123")
        self.comunidade.seguidores.add(seguidor)
        self.comunidade.seguidores.remove(seguidor)
        self.assertNotIn(seguidor, self.comunidade.seguidores.all())

    def test_nome_vazio_dispara_erro(self):
        comunidade_vazia = Comunidade(
            nome="",
            descricao="Descrição válida",
            coordenacao="Alguém"
        )
        with self.assertRaises(ValidationError):
            comunidade_vazia.full_clean()

    def test_descricao_vazia_dispara_erro(self):
        comunidade_invalida = Comunidade(
            nome="Comunidade Teste",
            descricao="",
            coordenacao="Alguém"
        )
        with self.assertRaises(ValidationError):
            comunidade_invalida.full_clean()

    def test_coordenacao_vazia_dispara_erro(self):
        comunidade_invalida = Comunidade(
            nome="Comunidade Teste",
            descricao="Descrição válida",
            coordenacao=""
        )
        with self.assertRaises(ValidationError):
            comunidade_invalida.full_clean()

    def test_ano_fundacao_padrao(self):
        self.assertEqual(self.comunidade.anoFundacao.year, 2025)
