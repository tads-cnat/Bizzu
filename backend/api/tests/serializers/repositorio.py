from django.test import TestCase
from api.models.repositorio import Repositorio
from api.models.usuario import Usuario
from api.models.comunidade import Comunidade
from api.models.categoria import Categoria
from api.serializers.repositorio import RepositorioSerializer


class RepositorioTesteSerializer(TestCase):
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

        self.repositorio = Repositorio.objects.create(
            titulo="API REST",
            descricao="Um repositório sobre API REST",
            usuario=self.usuario,
            comunidade=self.comunidade,
        )
        self.repositorio.categorias.add(self.categoria)

    def test_saida_dados_serializer(self):
        """Verifica se o serializer retorna os dados corretamente."""
        serializer = RepositorioSerializer(instance=self.repositorio)
        dados = serializer.data

        self.assertEqual(dados["titulo"], self.repositorio.titulo)
        self.assertEqual(dados["descricao"], self.repositorio.descricao)
        self.assertEqual(dados["usuario"]["id"], self.usuario.id)
        self.assertEqual(dados["comunidade"], self.comunidade.id)
        self.assertIn(self.categoria.id, dados["categorias"])

    def test_entrada_valida_serializer(self):
        """Verifica se o serializer aceita uma entrada válida."""
        dados = {
            "titulo": "Novo Repositório",
            "descricao": "Descrição do novo repositório",
            "comunidade": self.comunidade.id,
            "categorias": [self.categoria.id],
        }
        serializer = RepositorioSerializer(data=dados)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_entrada_sem_titulo(self):
        """Verifica se o campo título é obrigatório."""
        dados = {
            "descricao": "Sem título",
            "comunidade": self.comunidade.id,
        }
        serializer = RepositorioSerializer(data=dados)
        self.assertFalse(serializer.is_valid())
        self.assertIn("titulo", serializer.errors)

    def test_titulo_muito_longo(self):
        """Verifica se o título não ultrapassa o tamanho máximo."""
        dados = {
            "titulo": "a" * 101,
            "descricao": "Título muito longo",
        }
        serializer = RepositorioSerializer(data=dados)
        self.assertFalse(serializer.is_valid())
        self.assertIn("titulo", serializer.errors)
