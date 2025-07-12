# 🚀 Script de População do Banco de Dados

Este script popula o banco de dados Django com dados de exemplo para o sistema Bizzu.

## 📋 O que o script cria:

### 👥 Usuários (5)
- **Luiz Fernando** (@luizfernando) - Internauta
- **Luiz Roberto** (@luizroberto) - Internauta  
- **Ana Maria** (@anamaria) - **Moderadora**
- **Fabio** (@fabio) - Internauta
- **Riel** (@riel) - Internauta

**Senha para todos:** `senha123`

### 📚 Categorias
- **Tecnologias (18):** Python, JavaScript, Java, C++, React, Django, etc.
- **Matérias (15):** Algoritmos, Banco de Dados, Engenharia de Software, etc.
- **Períodos (6):** 1º ao 6º Período

### 🏘️ Comunidades (3)
- **TADS** - Tecnologia em Análise e Desenvolvimento de Sistemas
- **InfoWeb** - Desenvolvimento Web e TI
- **REDES** - Redes de Computadores e Infraestrutura

### 📝 Conteúdo por usuário
- **5-8 postagens** cada (total: ~30 postagens)
- **3-5 repositórios** cada (total: ~20 repositórios)
- **2-4 arquivos** por repositório
- Relacionamentos de seguir entre usuários
- Participação em comunidades

## 🔧 Como executar:

### Método 1: Execução direta
\`\`\`bash
# No diretório raiz do projeto
cd backend
python ../scripts/populate_database.py
\`\`\`

### Método 2: Script auxiliar
\`\`\`bash
# No diretório scripts
cd scripts
python run_populate.py
\`\`\`

### Método 3: Via Django manage.py
\`\`\`bash
# Criar um comando personalizado (opcional)
cd backend
python manage.py shell < ../scripts/populate_database.py
\`\`\`

## ⚠️ Importante:

1. **Backup:** O script limpa todos os dados existentes antes de popular
2. **Dependências:** Certifique-se de que o Pillow está instalado para imagens
3. **Ambiente:** Execute com o ambiente virtual ativado
4. **Banco:** Funciona com SQLite3 (padrão do projeto)

## 🔍 Verificação:

Após executar, você pode verificar no Django Admin:
- Acesse: `http://localhost:8000/admin/`
- Login: qualquer usuário criado
- Senha: `senha123`

## 🐛 Solução de problemas:

### Erro de Pillow:
\`\`\`bash
pip install Pillow
\`\`\`

### Erro de permissões:
\`\`\`bash
# Linux/Mac
chmod +x scripts/populate_database.py
\`\`\`

### Erro de Django não configurado:
Certifique-se de estar no diretório correto e que o `DJANGO_SETTINGS_MODULE` está configurado.

## 📊 Dados gerados:

- ✅ 5 usuários com perfis completos
- ✅ ~40 categorias (tecnologias, matérias, períodos)  
- ✅ 3 comunidades temáticas
- ✅ ~30 postagens variadas
- ✅ ~20 repositórios com arquivos
- ✅ Relacionamentos entre usuários
- ✅ Imagens placeholder para perfis e posts
