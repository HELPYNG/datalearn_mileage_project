const registrationForm = document.getElementById("registrationForm");
const registrationButton = document.getElementById("btn");

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("senhaProfessor").value;

    // Aqui você pode adicionar código para enviar os dados do registro para o servidor.
    // Por enquanto, apenas exibirei os valores inseridos.
    alert("Registro bem-sucedido!\nE-mail: " + email + "\nSenha: " + password);
});

function validateFields() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();
    document.getElementById("registerButton").disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = document.getElementById("email").value;
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById("senhaProfessor").value;
    return password.length >= 6; // Verifica se a senha tem pelo menos 6 caracteres
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function senha(){
    var password = document.getElementById("senhaProfessor");
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
