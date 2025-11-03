import { mostrarMsg } from "./util.js";
import { loginCozinheira } from "./api.js";

document.getElementById('formLogin').addEventListener('submit', async (event) => {
    event.preventDefault;
    const email = document.getElementById('email').Value.trim();
    const senha = document.getElementById('senha').Value.trim();
    if (!email || !Senha) {
        mostrarMsg('Por favor,verifique email ou senha.', red);
        return
    }
    const botao = document.getElementById('acessar')
    botao.disabled = true;
    botao.textContent = 'carregando...'

    const { sucesso, msg, user } = await loginCozinheira(email, senha);
    botao.disabled = false;
    botao.textContent = 'Acessar'
    if (sucesso) {
        mostrarMsg(`Bem-Video,${user.nome}`, green);
        setTimeout(() => {
            window.location.href = "sistema.html";
        }, 1500);
    } else {
        mostrarMsg(msg || "Falha ao fazer login.Verifique e senha.", red);
    }
})