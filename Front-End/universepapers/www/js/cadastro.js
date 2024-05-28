document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (nome && email && usuario && senha) {
        alert('Cadastro realizado com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
