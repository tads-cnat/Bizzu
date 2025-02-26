    function toggleFiltroCategorias() {
        let menu = document.getElementById("menuFiltroCategorias");
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    }

    function mostrarAbaFiltro(aba) {
        let abas = document.querySelectorAll(".filtro-lista"); // Agora pega todas as listas corretas
        let botoes = document.querySelectorAll(".aba");
    
        abas.forEach(div => div.style.display = "none"); // Esconde todas
        botoes.forEach(btn => btn.classList.remove("ativa"));
    
        document.getElementById(aba).style.display = "block"; // Exibe a aba correta
        event.target.classList.add("ativa");
    }

    function filtrarCategoriasFiltro() {
        let input = document.getElementById("pesquisaFiltroCategorias").value.toLowerCase();
        let labels = document.querySelectorAll("#menuFiltroCategorias .lista-categorias label");

        labels.forEach(label => {
            let texto = label.textContent.toLowerCase();
            label.style.display = texto.includes(input) ? "block" : "none";
        });
    }

    function aplicarFiltro() {
        let checkboxes = document.querySelectorAll(".filtro-checkbox:checked");
        let categoriasSelecionadas = Array.from(checkboxes).map(checkbox => checkbox.value);
    
        let postagens = document.querySelectorAll(".postagem");
    
        postagens.forEach(postagem => {
            let categoriasPostagem = postagem.getAttribute("data-categorias");
            
            // Se a postagem não tiver categorias, esconde
            if (!categoriasPostagem) {
                postagem.style.display = "none";
                return;
            }
    
            let categoriasArray = categoriasPostagem.split(",").map(cat => cat.trim());
    
            // Se nenhuma categoria estiver selecionada, mostra todas as postagens
            if (categoriasSelecionadas.length === 0) {
                postagem.style.display = "block";
                return;
            }
    
            // Verifica se pelo menos uma das categorias selecionadas está na postagem
            let temCategoria = categoriasSelecionadas.some(cat => categoriasArray.includes(cat));
    
            postagem.style.display = temCategoria ? "block" : "none";
        });
    
        document.getElementById("menuFiltroCategorias").style.display = "none";
    }

    // Fechar menu ao clicar fora
    document.addEventListener("click", function (event) {
        let menu = document.getElementById("menuFiltroCategorias");
        let botao = document.getElementById("filtro-btn");

        if (!menu.contains(event.target) && !botao.contains(event.target)) {
            menu.style.display = "none";
        }
    });