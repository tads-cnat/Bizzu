function abrirOpcoesModal(postagemId) {
    document.getElementById(`modal-opcoes-${postagemId}`).style.display = "flex";
}

function fecharOpcoesModal(postagemId) {
    document.getElementById(`modal-opcoes-${postagemId}`).style.display = "none";
}

function abrirConfirmacaoExcluir(postagemId) {
    fecharOpcoesModal(postagemId); // Fecha o modal de opções antes
    document.getElementById(`modal-excluir-${postagemId}`).style.display = "flex";
}

function fecharConfirmacaoExcluir(postagemId) {
    document.getElementById(`modal-excluir-${postagemId}`).style.display = "none";
}

function getCSRFToken() {
    const tokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
    return tokenElement ? tokenElement.value : null;
}

function excluirPostagem(postagemId) {
    const csrfToken = getCSRFToken();
    if (!csrfToken) {
        console.error("CSRF Token não encontrado.");
        alert("Erro ao excluir a postagem. Recarregue a página e tente novamente.");
        return;
    }

    fetch(`/postagem/excluir/${postagemId}/`, {
        method: "POST",
        headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            fecharConfirmacaoExcluir(postagemId); // Fecha o modal antes de atualizar a página
            location.reload();
        } else {
            alert("Erro ao excluir a postagem.");
        }
    })
    .catch(error => console.error("Erro:", error));
}

function editarPostagem(postagemId) {
    window.location.href = `/postagem/editar/${postagemId}/`; // Redireciona para edição
}
