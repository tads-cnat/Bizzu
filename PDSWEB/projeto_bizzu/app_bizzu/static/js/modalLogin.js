document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("popup-login");
    const btnAbrir = document.getElementById("btn-abrir-modal");
    const btnFechar = document.querySelector(".fechar-popup");
    const btnLogin = document.querySelector(".concluir-login");

    // Abre o modal ao clicar no botão "Entrar"
    btnAbrir.addEventListener("click", function () {
        modal.showModal();
    });

    // Fecha o modal ao clicar no botão de fechar
    btnFechar.addEventListener("click", function () {
        modal.close();
    });

    // Fecha o modal ao clicar fora dele
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.close();
        }
    });

    // Enviar login via AJAX
    btnLogin.addEventListener("click", function (event) {
        event.preventDefault();  // Prevenir comportamento padrão do botão

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const csrfToken = getCookie("csrftoken"); // Pega o token CSRF para Django aceitar o POST

        fetch("/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,  // Adicionando CSRF Token
            },
            body: JSON.stringify({ username: email, password: senha }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                window.location.href = data.redirect_url;  // Redireciona para o feed
            } else {
                alert("Usuário ou senha inválidos!");  // Exibe erro caso as credenciais estejam erradas
            }
        })
        .catch(error => console.error("Erro ao fazer login:", error));
    });

    // Função para obter o token CSRF do Django
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
