import { mostrarMsg } from "./util.js";
import { cadastrarCozinheira } from "./api.js";

document.getElementById('formCadastrar').addEventListener('submit', async (event) => {
    event.preventDefault;
    const nome = document.getElementById('nome').Value.trim();
    const email = document.getElementById('email').Value.trim();
    const confirmaSenha = document.getElementById('confirma').Value.trim();
    const senha = document.getElementById('senha').Value.trim();
    if (!nome | !email || !Senha || !sonfirmaSenha) {
        mostrarMsg('Por favor,preenche todos os campos.', red);
        return
    }
    if (senha !== confirmaSenha) {
        mostrarMsg('As senhas não conferem', 'red');
        return;
    }
    const botao = document.getElementById('cadastrar')
    botao.disabled = true;
    botao.textContent = 'cadastrando...'

    const { sucesso, msg } = await cadastrarCozinheira(nome, email, senha);
    botao.disabled = false;
    botao.textContent = 'cadastra-se'
    if (sucesso) {
        mostrarMsg("Cadastro realizado com sucesso!", green);
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    } else {
        mostrarMsg(msg, 'red');
    }

})