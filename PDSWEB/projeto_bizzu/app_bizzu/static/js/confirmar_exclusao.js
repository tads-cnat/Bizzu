function confirmarExclusao(evento, nomeItem) {
    if (!confirm(`Tem certeza que deseja excluir este ${nomeItem}?`)) {
        evento.preventDefault();
    }
}