document.addEventListener('DOMContentLoaded', function() { 
    //Para o campo de titulo
    const inputTitulo = document.querySelector(".input-titulo");
    const defaultValue = inputTitulo.value;
    inputTitulo.addEventListener('focus', function(){
        inputTitulo.value = "";
    })
    inputTitulo.addEventListener('blur', function(){
        inputTitulo.value = inputTitulo.value? inputTitulo.value: defaultValue
    })

    //Para o campo de descrição 
    const inputDescricao = document.querySelector(".input-descricao");
    const defaultDescricao = inputDescricao.value;
    inputDescricao.addEventListener('focus', function(){
        console.log(inputDescricao.value)
        inputDescricao.value = ""
    })
    inputDescricao.addEventListener('blur', function(){
        inputDescricao.value = inputDescricao.value? inputDescricao.value: defaultDescricao;
    })
})