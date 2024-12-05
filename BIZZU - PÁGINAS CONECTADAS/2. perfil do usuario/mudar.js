function mudarDisplayRepositorio(){
    let elemento = document.getElementById("repositoriosPessoa");
    elemento.style.display = "flex";
    let elemento2 = document.getElementById("feed");
    elemento2.style.display = "none";
    let elemento3 = document.getElementById("coments");
    elemento3.style.display = "none";
    
}

function mudarDisplayPostagem(){
    let elemento = document.getElementById("repositoriosPessoa");
    elemento.style.display = "none";
    let elemento2 = document.getElementById("feed");
    elemento2.style.display = "flex";
    let elemento3 = document.getElementById("coments");
    elemento3.style.display = "none";
}

function mudarDisplayComentario(){
    let elemento = document.getElementById("repositoriosPessoa");
    elemento.style.display = "none";
    let elemento2 = document.getElementById("feed");
    elemento2.style.display = "none";
    let elemento3 = document.getElementById("coments");
    elemento3.style.display = "flex";
}

function seguindo(){
    let elemento = document.getElementById("seguidoresPerfil");
    elemento.style.display = "block";
    let fundo = document.getElementById("conteudo");
    fundo.style.opacity = "50%"
}

function fecharSeguindo(){
    let elemento = document.getElementById("seguidoresPerfil");
    elemento.style.display = "none";
    let fundo = document.getElementById("conteudo");
    fundo.style.opacity = "100%"
}

document.addEventListener('DOMContentLoaded', function() {
    const botaoNovo = document.querySelector('.botao-novo');
    const dropdown = document.querySelector('.dropdown');
    const overlay = document.querySelector('.overlay');

    botaoNovo.addEventListener('click', () => {
        dropdown.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        dropdown.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (!botaoNovo.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

