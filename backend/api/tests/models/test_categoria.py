from django.test import TestCase
from django.core.exceptions import ValidationError
from ...models.categoria import Categoria


class CategoriaModelTest(TestCase):
    """Testes unitários para o modelo Categoria"""

    def setUp(self):
        self.categoria = Categoria.objects.create(
            nome="Tecnologia da Informação", tipo="tec"
        )

    def test_criacao_com_sucesso(self):
        """Deve criar uma categoria corretamente"""
        self.assertEqual(self.categoria.nome, "Tecnologia da Informação")
        self.assertEqual(self.categoria.tipo, "tec")

    def test_str_retorna_nome(self):
        """O método __str__ deve retornar o nome"""
        self.assertEqual(str(self.categoria), "Tecnologia da Informação")

    def test_tipo_invalido_dispara_erro(self):
        """Deve gerar erro se tipo for inválido (fora das choices)"""
        categoria_invalida = Categoria(nome="Teste Inválido", tipo="xyz")
        with self.assertRaises(ValidationError):
            categoria_invalida.full_clean()

    def test_nome_vazio_dispara_erro(self):
        """Não deve permitir nome vazio"""
        categoria_vazia = Categoria(nome="", tipo="tec")
        with self.assertRaises(ValidationError):
            categoria_vazia.full_clean()
