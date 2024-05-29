import { api } from "../services";


const api = {
    post: async function (url, data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            if (data.email === "existing@example.com") {
                reject({ response: { status: 400 } });
            } else {
                resolve({ data: "User created successfully" });
            }
        });
    }
};


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
