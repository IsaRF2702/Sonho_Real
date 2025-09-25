import { json } from "body-parser";

document.addEventListener("DOMContentLoaded", () => {

    function criarModalCadastro() {
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";
        overlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>Criar conta</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <input type="email" placeholder="E-mail" required>
                    <input type="password" placeholder="Senha" required>
                    <input type="password" placeholder="Confirmar senha" required>
                    <button class="btn btn-primary">Cadastrar</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector(".modal-close").addEventListener("click", () => overlay.remove());
        overlay.addEventListener("click", e => {
            if (e.target === overlay) overlay.remove();
        });

        overlay.querySelector(".modal-body .btn-primary").addEventListener("click", async(event) => {
            event.preventDefault();
            const email = overlay.querySelector('input[type="email"]').value.trim();
            const senha = overlay.querySelectorAll('input[type="password"]')[0].value.trim();
            const confirmar = overlay.querySelectorAll('input[type="password"]')[1].value.trim();



            if (!email || !senha || !confirmar) {
                alert("Preencha todos os campos.");
                return;
            }

            if (senha !== confirmar) {
                alert("As senhas não coincidem.");
                return;
            }

            
            const res = await fetch ('https://192.168.1.46:3000/cadastrar', {
                method:'post', 
                headers:{'content-type':"application/Json"},
                body: JSON.stringify({email, senha})
            })
            if(res.status==200){
                alert("Cadastro realizado com sucesso!");
            }
            else{
                alert('Ops, usuário não cadastrado')
                return
            }
            overlay.remove();
        });
    }

    const btnRegister = document.querySelector(".btn-primary");
    if (btnRegister) {
        btnRegister.addEventListener("click", () => criarModalCadastro());
    }
});