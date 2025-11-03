import{mostrarMsg}from"./util.js";
import{recuperarSenha}from"./api.js";

document.getElementById('formRecuperar').addEventListener('submit',async(event)=>{
     event.preventDefault;
        const email = document.getElementById('email').Value.trim();
        
        if (!email ) {
            mostrarMsg('Por favor,verifique email .', red);
            return
        }
        const botao = document.getElementById('recuperar')
        botao.disabled = true;
        botao.textContent = 'eviando...'
    
        const { sucesso, msg } = await recuperarSenha(senha);
        botao.disabled = false;
        botao.textContent = 'Recuperar Senha'
        if (sucesso) {
            mostrarMsg(`Instução de recuperação enviadas para seu email,${user.nome}`, green);
            setTimeout(() => {
                window.location.href = "sistema.html";
            }, 1500);
        } else {
            mostrarMsg(msg || "Não foi impossivel enviar email de recuperação.", red);
        }
})