function mostrarPopupUsuarioDeslogado() {
    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.innerHTML = `
        <div class="custom-popup-title">Ops! Parece que você ainda não está na colmeia 🐝</div>
        <div class="custom-popup-message">Você precisa fazer parte da nossa colmeia para poder realizar esta ação. Que tal se juntar a nós?</div>
        <div class="custom-popup-buttons">
            <button class="custom-popup-button custom-popup-button-cancel" onclick="fecharPopupUsuarioDeslogado()">Fechar</button>
            <button class="custom-popup-button custom-popup-button-confirm" onclick="abrirPopupLogin()">Fazer login</button>
        </div>
    `;

    const fundo = document.createElement('div');
    fundo.className = 'custom-popup-backdrop';

    document.body.appendChild(fundo);
    document.body.appendChild(popup);
}

function fecharPopupUsuarioDeslogado() {
    const popup = document.querySelector('.custom-popup');
    const fundo = document.querySelector('.custom-popup-backdrop');
    if (popup) popup.remove();
    if (fundo) fundo.remove();
}

function abrirPopupLogin() {
    fecharPopupUsuarioDeslogado();
    const modal = document.getElementById("popup-login");
    if (modal) {
        modal.showModal();
    }
}

function lidarComAcaoUsuarioDeslogado(evento) {
    evento.preventDefault();
    mostrarPopupUsuarioDeslogado();
}