document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    const comentarBtns = document.querySelectorAll('.comentar-btn');
    console.log('Número de botões de comentar:', comentarBtns.length);

    comentarBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            console.log('Botão de comentar clicado');
            event.preventDefault();
            const postagem = this.closest('.postagem');
            const postagemId = this.dataset.postagemId;
            console.log('ID da postagem:', postagemId);

            const postagemPreview = {
                texto: postagem.querySelector('.post-body p').textContent,
                imagem: postagem.querySelector('.post-image')?.src,
                usuario: {
                    nome: postagem.querySelector('.post-header h3').textContent.split('•')[0].trim(),
                    avatar: postagem.querySelector('.avatar').src
                }
            };

            const modal = criarModal(postagemPreview, postagemId);
            configurarModal(modal, postagemId);
        });
    });
});

function criarModal(postagemPreview, postagemId) {
    console.log('Criando modal para postagem:', postagemId);
    const modal = document.createElement('div');
    modal.className = 'modal-comentario';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="fechar-modal">&times;</button>
            
            <div class="post-preview">
                <div class="post-header">
                    <img src="${postagemPreview.usuario.avatar}" class="avatar" alt="">
                    <h3>${postagemPreview.usuario.nome}</h3>
                </div>
                <p>${postagemPreview.texto}</p>
                ${postagemPreview.imagem ? `<img src="${postagemPreview.imagem}" alt="" class="post-preview-image">` : ''}
            </div>
            
            <div class="comentarios-container">
                <div class="comentarios-lista">
                    <p class="sem-comentarios">Seja o primeiro a comentar!</p>
                </div>
            </div>
            
            <form class="form-comentario">
                <img src="/static/img/default-profile.png" alt="Seu avatar" class="user-avatar">
                <div style="flex-grow: 1;">
                    <textarea name="conteudo" placeholder="Postar sua resposta..." required></textarea>
                </div>
                <button type="submit" class="btn-comentar" disabled>Comentar</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function configurarModal(modal, postagemId) {
    const btnFechar = modal.querySelector('.fechar-modal');
    btnFechar.onclick = () => {
        modal.remove();
        console.log('Modal fechado');
    };

    const textarea = modal.querySelector('textarea');
    const btnComentar = modal.querySelector('.btn-comentar');
    
    textarea.addEventListener('input', () => {
        btnComentar.disabled = !textarea.value.trim();
    });

    textarea.addEventListener('focus', () => {
        textarea.style.borderColor = '#ff6b00';
    });
    
    textarea.addEventListener('blur', () => {
        textarea.style.borderColor = '#3a3a3a';
    });

    const form = modal.querySelector('.form-comentario');
    form.onsubmit = async (e) => {
        e.preventDefault();
        console.log('Formulário de comentário submetido');
        
        const formData = new FormData(form);
        console.log('Form data:', Object.fromEntries(formData));
        
        const csrftoken = getCookie('csrftoken');
        
        try {
            const response = await fetch(`/comentar/${postagemId}/`, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrftoken
                },
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Comentário adicionado:', data);
                adicionarComentario(modal.querySelector('.comentarios-lista'), data.comentario);
                form.reset();
                btnComentar.disabled = true;
            } else {
                console.error('Erro ao adicionar comentário:', response.statusText);
                alert('Erro ao adicionar comentário. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            alert('Erro ao enviar comentário. Por favor, verifique sua conexão e tente novamente.');
        }
    };

    carregarComentarios(postagemId, modal.querySelector('.comentarios-lista'));
}

async function carregarComentarios(postagemId, container) {
    try {
        const response = await fetch(`/api/comentarios/${postagemId}/`);
        const comentarios = await response.json();
        
        container.innerHTML = ''; // Limpa o conteúdo existente
        
        if (comentarios.length === 0) {
            container.innerHTML = '<p class="sem-comentarios">Seja o primeiro a comentar!</p>';
            return;
        }
        
        comentarios.forEach(comentario => {
            adicionarComentario(container, comentario);
        });
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
        container.innerHTML = '<p class="sem-comentarios">Erro ao carregar comentários. Por favor, tente novamente.</p>';
    }
}

function adicionarComentario(container, comentario) {
    const div = document.createElement('div');
    div.className = 'comentario';
    div.innerHTML = `
        <img src="${comentario.usuario.avatar}" class="comentario-avatar" alt="">
        <div class="comentario-conteudo">
            <div class="comentario-header">
                <span class="comentario-nome">${comentario.usuario.nome}</span>
                <span class="comentario-data">${comentario.data}</span>
            </div>
            <div class="comentario-texto">${comentario.conteudo}</div>
        </div>
    `;
    
    container.appendChild(div);
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}