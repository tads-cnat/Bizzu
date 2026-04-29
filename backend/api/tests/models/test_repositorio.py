from django.core.exceptions import ValidationError
from django.test import TestCase
from api.models.repositorio import Repositorio
from api.models.usuario import Usuario
from api.models.comunidade import Comunidade
from api.models.categoria import Categoria


class RepositorioTesteModel(TestCase):
    def setUp(self):
        self.usuario = Usuario.objects.create(
            username="nirvana",
            nome="Nirvana",
            descricao="Desenvolvedor full stack",
            papel="int",
        )
        self.comunidade = Comunidade.objects.create(
            nome="TADS",
            descricao="Comunidade do curso de TADS",
            anoFundacao="2012-05-01",
            coordenacao="Marília Freire",
        )
        self.categoria = Categoria.objects.create(
            nome="Backend",
            tipo="tec",
        )

    def test_criacao_sucesso(self):
        repositorio = Repositorio.objects.create(
            titulo="Projeto Django",
            descricao="Um repositório de testes para Django",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        repositorio.categorias.add(self.categoria)

        self.assertEqual(repositorio.titulo, "Projeto Django")
        self.assertEqual(repositorio.usuario, self.usuario)
        self.assertEqual(repositorio.comunidade, self.comunidade)
        self.assertIn(self.categoria, repositorio.categorias.all())

    def test_titulo_obrigatorio(self):
        repositorio = Repositorio(descricao="Sem título")
        with self.assertRaises(ValidationError):
            repositorio.full_clean()

    def test_tamanho_maximo_titulo(self):
        repositorio = Repositorio(titulo="a" * 101)
        with self.assertRaises(ValidationError):
            repositorio.full_clean()

    def test_descricao_opcional(self):
        repositorio = Repositorio(titulo="Sem descrição")
        try:
            repositorio.full_clean()
        except ValidationError:
            self.fail("Descrição opcional não deveria gerar erro de validação.")
