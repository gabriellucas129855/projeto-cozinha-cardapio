const API_USUARIOS = 'https://api-storage-cantina-main-theta.vercel.app/';
async function tratarErroResponse(res, msgPadrao) {
    const textErro = await res.text();
    let msgErro;
    try {
        const errorData = JSON.parse(textErro)
        msgErro = errorData.msg || errorData.error || errorData.mensage || textErro;
    } catch {
        msgErro = textErro;
    }
    return { sucesso: false, msg: msgErro || "Erro desconhecido na API", };
}
async function loginCozinheira(email, senha) {
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
async function cadastrarCozinheira(nome, email, senha) {
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
async function recuperarSenha(email) {
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
        alert('ocorreu um erro ao listar cardápio');
    }
}
export async function cadastrarCardapio(cardapio) {
    try {


    } catch (error) {
        console.error('Erro ao cadastrar cardapio', error);
        alert('ocorreu um erro ao cadastrar cardápio');
    }
}
export async function alterarCardapio(id, atualizarCardapio) {
    try {
        const res = await fetch(API_USUARIOS);
        const cardapios = await res.json();
    } catch (error) {
        console.error('Erro ao alterar cardapio', error);
        alert('ocorreu um erro ao alterar cardápio');
    }
}
export async function excluirCardapio(id) {
    try {
        const res = await fetch(API_USUARIOS);
    } catch (error) {
        console.error('Erro ao excluir cardapio', error);
        alert('ocorreu um erro ao excluir cardápio');
    }
}
export async function buscarCardapio(id) {
    try {
        const res = await fetch(API_USUARIOS);
    } catch (error) {
        console.error('Erro ao buscar cardapio', error);
        alert('ocorreu um erro ao buscar cardápio');
    }
}
export async function exibirTabelaCardapio(cardapio) {
    try {
        const res = await fetch(API_USUARIOS);
    } catch (error) {
        console.error('Erro ao exibir a tabela do cardapio', error);
        alert('ocorreu um erro ao exibir a tabela cardápio');
    }
}



