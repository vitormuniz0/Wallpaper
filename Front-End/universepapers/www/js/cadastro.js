import { api } from "../services";

document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = {
        nome, email, senha
    }

    try {
        const response = await api.post("/createUser", data);
        console.log(response.data)
        alert("Usuário Criado com Sucesso!");
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setError("Usuário já existe. Por favor, escolha um email diferente.");
            console.log(error)
            alert("Usuário já Existe!")
        } else {
            setError("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
        }
    }
});
