const API_USUARIOS = 'https://api-storage-cantina-main-rho.vercel.app/'
async function tratarErroResponse(res, msgPadrao) {
    const textoErro = await res.text();
    let msgErro;
    try {
        const errorData = JSON.parse(textErro);
        msgErro = errorData.msg || errorData.error || errorData.message || textErro;
    } catch {
        msgErro = textoErro;
    }
    return { sucesso: false, msg: msgErro || msgPadrao || "Erro desconhecido na API" };
}

async function loginCozinheira(email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/login", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, senha }),

        });
        if (!res.ok) return await tratarErroResponse(res, "Erro ao acessar API")
        const data = await res.JSON();

        if (data.usuario) {
            localStorage.setItem("usuarioid:",data.usuario);
            localStorage.setItem("usuarioNome:",data.usuario.nome);
            localStorage.setItem("token:",data.token);


            return { sucesso: true, user: data.usuario, }

        } else {
            return { sucesso: false, msg: "Usuario ou senha incorretos", };

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
            body: JSON.stringify({ nome, email, senha }),

        });
        if (!res.ok) return await tratarErroResponse(res, "Erro ao cadastrar usuario")
        const data = await res.JSON();
        return { sucesso: true, user: data.usuario || null }




    } catch (error) {
        console.error("Erro ao fazer cadastro", error);
        return { sucesso: false, mensagem: 'Erro de conexão a API' }
    }
}
async function recuperarSenha(email) {

    try {
        const res = await fetch(API_USUARIOS + "/recupera", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        if (!res.ok) return await tratarErroResponse(res, "Erro ao recuperar senha")
        const data = await res.JSON();
        return { sucesso: true, msg: data.msg || "Instruções enviadas ao seu email", }

    } catch (error) {
        console.error("Erro ao tentar recuperar senha", error);
        return { sucesso: false, mensagem: 'Erro de conexão a API' }
    }
}

