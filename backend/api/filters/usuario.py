import django_filters
from ..models import Usuario

class UsuarioFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(lookup_expr='contains')
    
    class Meta:
        model = Usuario
        fields = ["nome"]