from django import forms
from .models import Usuario

class EditarPerfilForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['nome','descricao', 'imagemPerfil', 'escolaFormacao', 'instituicaoAtual', 'localTrabalho', 'progressoCurso']
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite seu nome...'}),
            'descricao': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite a descrição...'}),
            'imagemPerfil': forms.ClearableFileInput(attrs={'class': 'form-control'}),
            'escolaFormacao': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite sua escola...'}),
            'instituicaoAtual': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite sua instituição atual...'}),
            'localTrabalho': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite seu local de trabalho...'}),
            'progressoCurso': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Digite o período de referência...'}),
        }
