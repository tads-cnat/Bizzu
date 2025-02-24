document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".abrir-modal-seguidores-seguindo").forEach(function (botao) {
        botao.addEventListener("click", function () {
            let userId = this.getAttribute("data-user-id");
            let tipo = this.getAttribute("data-tipo");
            let modal = document.getElementById("modal-seguidores-seguindo");

            fetch(`/perfil/${userId}/${tipo}/`)
                .then(response => response.json())
                .then(data => {
                    let listaUsuarios = document.getElementById("lista-usuarios-seguidores-seguindo");
                    let tituloModal = document.getElementById("titulo-modal-seguidores-seguindo");

                    tituloModal.textContent = tipo === "seguidores" ? "Seguidores" : "Seguindo";
                    listaUsuarios.innerHTML = "";

                    data.usuarios.forEach(user => {
                        let div = document.createElement("div");
                        div.classList.add("usuario-item-seguidores-seguindo");

                        div.innerHTML = `
                            <img src="${user.imagemPerfil}" alt="Foto de ${user.nome}" class="foto-modal-seguidores-seguindo">
                            <a href="/${user.username}/" class="nome-modal-seguidores-seguindo">${user.nome}</a>
                            <form class="form-seguir" data-user-id="${user.id}">
                                <input type="hidden" name="follow" value="${user.segue ? 'unfollow' : 'follow'}">
                                <button type="submit" class="btn-seguir-seguidores-seguindo">
                                    ${user.segue ? "Seguindo" : "Seguir"}
                                </button>
                            </form>
                        `;

                        listaUsuarios.appendChild(div);

                        // Evento para seguir/desseguir via AJAX
                        div.querySelector(".form-seguir").addEventListener("submit", function (e) {
                            e.preventDefault();
                            let form = this;
                            let userId = form.getAttribute("data-user-id");
                            let followInput = form.querySelector("[name=follow]");
                            let botao = form.querySelector(".btn-seguir-seguidores-seguindo");

                            let formData = new FormData();
                            formData.append("follow", followInput.value);

                            fetch(`/seguir/${userId}/`, {
                                method: "POST",
                                headers: {
                                    "X-CSRFToken": getCsrfToken(), // Obtendo o token CSRF corretamente
                                    "X-Requested-With": "XMLHttpRequest"
                                },
                                body: formData
                            })
                            .then(response => response.json())
                            .then(result => {
                                followInput.value = result.seguindo ? "unfollow" : "follow";
                                botao.textContent = result.seguindo ? "Seguindo" : "Seguir";
                            })
                            .catch(error => console.error("Erro ao seguir/desseguir:", error));
                        });
                    });

                    modal.style.display = "block";
                })
                .catch(error => console.error("Erro ao carregar seguidores/seguidos:", error));
        });
    });

    // Fechar modal
    document.getElementById("fechar-modal-seguidores-seguindo").addEventListener("click", function () {
        document.getElementById("modal-seguidores-seguindo").style.display = "none";
    });

    // Função para obter o token CSRF do cookie
    function getCsrfToken() {
        let cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            let [name, value] = cookies[i].split("=");
            if (name === "csrftoken") return value;
        }
        return "";
    }
});
