document.addEventListener('DOMContentLoaded', function() { //Precisei adicionar isso pois ele tentava pegar o botão antes da página ser carregada 
    const botaoMais = document.querySelectorAll(".mais");
    console.log("foi");
    botaoMais.forEach(function(botao) {
        botao.addEventListener('click', function(){
            const dropRepositorio = this.nextElementSibling;
            console.log(dropRepositorio.style.display);
            dropRepositorio.style.display = dropRepositorio.style.display == "none"? "block": "none";
        })
    })
})