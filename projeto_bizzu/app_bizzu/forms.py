from django import forms
from .models import Usuario, Comentario

class CadastrarPerfilForm(forms.ModelForm):
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

class ComentarioForm(forms.ModelForm):
    class Meta:
        model = Comentario
        fields = ['conteudo']
        widgets = {
            'conteudo': forms.Textarea(attrs={
                'class': 'comentario-input',
                'placeholder': 'Postar sua resposta...',
                'rows': '3'
            })
        }

class EditarPerfilForm(forms.ModelForm):
    CURSO_CHOICES = [
        ('', 'Selecione sua instituição de ensino aqui'),
        ('TADS', 'TADS'),
        ('INFOWEB', 'Informática para Internet'),
        ('Redes', 'Redes de Computadores'),
    ]
    
    INSTITUICAO_CHOICES = [
        ('', 'Selecione sua instituição de ensino aqui'),
        ('IFRN', 'IFRN'),
        ('UFRN', 'UFRN'),
    ]

    curso = forms.ChoiceField(choices=CURSO_CHOICES, required=False)
    instituicaoAtual = forms.ChoiceField(choices=INSTITUICAO_CHOICES, required=False)
    linkPerfil = forms.URLField(required=False, widget=forms.URLInput(attrs={
        'class': 'form-input',
        'placeholder': 'Digite a URL aqui...'
    }))

    class Meta:
        model = Usuario
        fields = ['nome', 'username', 'descricao', 'imagemPerfil', 'escolaFormacao', 'instituicaoAtual', 'localTrabalho', 'progressoCurso', 'curso', 'linkPerfil']
        
        widgets = {
            'nome': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Digite seu nome aqui...'
            }),
            'username': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Digite seu novo nome de usuário aqui...'
            }),
            'descricao': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Digite um pouco sobre você, queremos te conhecer mais...'
            }),
            'imagemPerfil': forms.FileInput(attrs={
                'class': 'photo-upload-input'
            }),
            'escolaFormacao': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Digite sua formação acadêmica aqui...'
            }),
            'localTrabalho': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Digite seu local de trabalho aqui...'
            }),
            'progressoCurso': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Digite seu progresso no curso aqui...'
            }),
        }


