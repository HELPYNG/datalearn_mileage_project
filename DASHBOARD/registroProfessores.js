const registrationForm = document.getElementById("registrationForm");
const registrationButton = document.getElementById("btn");

document.getElementById("registrationForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const password = document.getElementById("senha").value;

    if (!isEmailValid() || !isCpfValid() || !isPasswordValid()) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    try {
        const response = await fetch('/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                cpf: cpf,
                senha: password
            })
        });

        if (response.status === 200) {
            alert("Registro bem-sucedido!");
            window.logation.href = "paginaProfessor.html";
        } else {
            alert("Erro ao registrar. Tente novamente.");
        }
    } catch (error) {
        console.error('Erro ao registrar:', error);
        alert("Erro ao registrar. Tente novamente.");
    }
});


function validateFields() {
    const emailValid = isEmailValid();
    const cpfValid = isCpfValid();
    const passwordValid = isPasswordValid();
    document.getElementById("registerButton").disabled = !emailValid || !cpfValid || !passwordValid;
}

function isEmailValid() {
    const email = document.getElementById("email").value;
    return validateEmail(email);
}

function isCpfValid() {
    const cpf = document.getElementById("cpf").value;
    return validateCpf(cpf);
}

function isPasswordValid() {
    const password = document.getElementById("senha").value;
    return password.length >= 6;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function validateCpf(cpf){
    const cpf = document.getElementById("cpf").value;
    return cpf.length == 11;
}

function senha(){
    var password = document.getElementById("senha");
    if(password.type === "password"){
        password.type = "text";
    }
    else{
        password.type = "password";
    }
}

function paginaProfessor(){
    window.location.href = "professores.html";
}
