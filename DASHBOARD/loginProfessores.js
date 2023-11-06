const loginForm = document.getElementById("login_Form");
const loginButton = document.getElementById("btn");

loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    // Enviar os dados de login para o servidor
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: password
            })
        });

        if (response.status === 200) {
            alert("Login bem-sucedido!");
            // Redirecionar para a página dos professores ou executar a ação desejada.
            window.location.href = "professores.html";
        } else {
            alert("Acesso negado. Verifique suas credenciais.");
        }
    } catch (error) {
        console.error('Erro no login:', error);
        alert("Erro no login. Tente novamente.");
    }
});

function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const cpfValid = isCpfValid();
    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !cpfValid || !passwordValid;
}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isCpfValid(cpf){
    const cpf = document.getElementById("cpf").value;
    if(!cpf) {
        return false;
    }
    return true;
}

function isPasswordValid() {
    const password = document.getElementById("senha").value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function senha() {
    var password = document.getElementById("senha");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function paginaProfessor() {
    window.location.href = "professores.html";
}
