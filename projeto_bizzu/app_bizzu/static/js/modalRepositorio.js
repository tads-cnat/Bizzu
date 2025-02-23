document.addEventListener('DOMContentLoaded', function() { //Precisei adicionar isso pois ele tentava pegar o botão antes da página ser carregada 
    const botaoMais = document.querySelectorAll(".mais");
    botaoMais.forEach(function(botao) {
        botao.addEventListener('click', function(){
            const dropRepositorio = this.nextElementSibling;
            dropRepositorio.style.display = dropRepositorio.style.display == "none"? "block": "none";
        })
    })
})