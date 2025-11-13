import{tratarErroResponse,getAuthHeaders}from"./utils.js"
const API_USUARIOS = 'https://cozinha-system-rvnz.onrender.com/usuarios';
const API_CARDAPIOS = 'https://cozinha-system-rvnz.onrender.com/cardapios';

export async function loginCozinheira(email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/login", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        if (!res.ok) return await tratarErroResponse(res, 'Erro ao fezer login');
        const data = await res.json();
        if (data.usuario) {
            localStorage.setItem('usuarioId:', data.usuario.id);
            localStorage.setItem('usuarioNome:', data.usuario.nome);
            localStorage.setItem('token:', data.token);
            return { sucesso: true, user: data.usuario, }
        } else {
            return { sucesso: false, msg: 'Usuário ou senha invalidas', }
        }




    } catch (error) {
        console.error("Erro ao fazer login", error);
        return { sucesso: false, mensagem: 'Erro de conexão a API' }
    }
}
export async function cadastrarCozinheira(nome, email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/cadastro", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });
        if (!res.ok) return await tratarErroResponse(res, 'Erro ao cadatrar usuario');
        const data = await res.json();
        return { sucesso: true, user: data.usuario || null }




    } catch (error) {
        console.error("Erro ao fazer cadastro", error);
        return { sucesso: false, mensagem: 'Erro de conexão a API' }
    }
}
export async function recuperarSenha(email) {
    try {
        const res = await fetch(API_USUARIOS + "/recuperar", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!res.ok) return await tratarErroResponse(res, 'Erro ao recuperar senha');
        const data = await res.json();
        return { sucesso: true, msg: data.msg || 'Instruções enviadas ao seu email', }




    } catch (error) {
        console.error("Erro ao tentar recuperar senha", error);
        return { sucesso: false, mensagem: 'Erro de conexão a API' }
    }
}
export async function listarCardapio() {
    try {
        const res = await fetch(API_USUARIOS);
        const cardapios = await res.json();
        return cardapios;
    } catch (error) {
        console.error('Erro ao listar cardapio', error);
        alert('Ocorreu um erro ao listar cardápio');
    }
}
export async function cadastrarCardapio(cardapio) {
    try {
        cardapio.usuarioId = Number(localStorage.getItem("usuarioId"));
        const res = await fetch(API_USUARIOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cardapio)
        });
        if (res.ok) {
            alert("Refeição cadastrada com sucesso!");
            listarCardapio();
        } else {
            alert("Erro ao cadastrar refeição")
        }
    } catch (error) {
        console.error('Erro ao cadastrar cardapio', error);
        alert('Ocorreu um erro ao cadastrar cardápio');
    }
}
export async function alterarCardapio(id, atualizarCardapio) {
    try {
        const res = await fetch(API_USUARIOS);
        const cardapio = await res.json();
        document.querySelector("#date").value = cardapio.data.split("T")[0];
        document.querySelector("select#turnos").value = cardapio.turno;
        document.querySelector("input[name='refeicao']").value = cardapio.refeicao.titulo;
        document.querySelector("textarea[name='itens']").value = cardapio.refeicao.itens.join(",");
        document.querySelector("input[name='bebida']").value = cardapio.refeicao.bebida.join(",");
        if (cardapio - lanche) {
            document.querySelector("input[name='refeicao']").value = cardapio.lanche.titulo;
            document.querySelector("textarea[name='itens']").value = cardapio.lanche.itens.join(",");
            document.querySelector("input[name='bebida']").value = cardapio.lanche.bebida.join(",");
        }


    } catch (error) {
        console.error('Erro ao alterar cardapio', error);
        alert('Ocorreu um erro ao alterar cardápio');
    }
}
export async function excluirCardapio(id) {
    try {
        const res = await fetch(`API_USUARIOS/${id}`);
    } catch (error) {
        console.error('Erro ao excluir cardapio', error);
        alert('Ocorreu um erro ao excluir cardápio');
    }
}
export async function buscarCardapio(id) {
    try {
        const res = await fetch(API_USUARIOS);
    } catch (error) {
        console.error('Erro ao buscar cardapio', error);
        alert('Ocorreu um erro ao buscar cardápio');
    }
}
export async function exibirTabelaCardapio(cardapio) {
    try {
        const res = await fetch(API_USUARIOS);
    } catch (error) {
        console.error('Erro ao exibir a tabela do cardapio', error);
        alert('Ocorreu um erro ao exibirir tabela cardápio');
    }
}



