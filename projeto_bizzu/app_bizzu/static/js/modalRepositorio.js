document.addEventListener('DOMContentLoaded', function() { //Precisei adicionar isso pois ele tentava pegar o botão antes da página ser carregada 
    const botaoMais = document.querySelector(".mais");
    botaoMais.addEventListener('click', function(){
        const dropRepositorio = document.querySelector(".dropRepositorio");
        dropRepositorio.style.display = dropRepositorio.style.display == "none"? "block": "none";
})

})
