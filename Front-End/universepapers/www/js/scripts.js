document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (email === "admin" && senha === "admin") {
        alert('Login bem-sucedido!');
    } else {
        alert('Email ou senha incorretos.');
    }
});
