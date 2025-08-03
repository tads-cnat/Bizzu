import django_filters
from ..models import Usuario, Solicitacao


class UsuarioFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Usuario
        fields = ["username"]


class SolicitacaoFilter(django_filters.FilterSet):
    status = django_filters.ChoiceFilter(
        field_name="status",
        choices=Solicitacao.stats,
        lookup_expr="exact",
    )

    class Meta:
        model = Solicitacao
        fields = ["status"]
