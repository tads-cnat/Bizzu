document.addEventListener("DOMContentLoaded", () => {
  const botaoLogin = document.getElementById("entrar");
  const popupLogin = document.getElementById("popup-login");
  const fecharPopup = document.querySelector(".fechar-popup");

  // Abrir o diálogo
  botaoLogin.addEventListener("click", () => {
      if (popupLogin && typeof popupLogin.showModal === "function") {
          popupLogin.showModal();
      } else {
          alert("Seu navegador não suporta o elemento <dialog>.");
      }
  });

  // Fechar o diálogo
  fecharPopup.addEventListener("click", () => {
      if (popupLogin && typeof popupLogin.close === "function") {
          popupLogin.close();
      }
  });
});