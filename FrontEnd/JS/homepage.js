document.addEventListener("DOMContentLoaded", () => {

    function criarModal(tipo) {
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";
        overlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>${tipo === "login" ? "Entrar" : "Criar conta"}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <input type="email" placeholder="E-mail">
                    <input type="password" placeholder="Senha">
                    ${tipo === "register" ? '<input type="password" placeholder="Confirmar senha">' : ""}
                    <button class="btn btn-primary">${tipo === "login" ? "Entrar" : "Cadastrar"}</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector(".modal-close").addEventListener("click", () => overlay.remove());

        overlay.addEventListener("click", e => {
            if (e.target === overlay) overlay.remove();
        });

        overlay.querySelector(".modal-body .btn-primary").addEventListener("click", () => {
            if (tipo === "login") {
                console.log("Tentando fazer login...");
            } else {
                console.log("Tentando criar conta...");
            }
        });
    }

    const btnLogin = document.querySelector(".btn-ghost");
    if (btnLogin) {
        btnLogin.addEventListener("click", () => criarModal("login"));
    }

    const btnRegister = document.querySelector(".btn-primary");
    if (btnRegister) {
        btnRegister.addEventListener("click", () => criarModal("register"));
    }
});