document.addEventListener("DOMContentLoaded", function () {
    const btnNovo = document.getElementById("btn-novo");
    const modal = document.getElementById("modal-novo");

    if (btnNovo && modal) {
        btnNovo.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita que o clique dispare no document
            modal.classList.toggle("show");

            // Posiciona o modal abaixo do botão
            const rect = btnNovo.getBoundingClientRect();
            modal.style.top = `${rect.bottom + window.scrollY}px`;
            modal.style.left = `${rect.left + window.scrollX}px`;
        });

        document.addEventListener("click", function (event) {
            if (!modal.contains(event.target) && event.target !== btnNovo) {
                modal.classList.remove("show");
            }
        });
    }
});
