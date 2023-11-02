const loginForm = document.getElementById("login_Form");
const loginButton = document.getElementById("btn");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if(email === "a" && password == "a"){
        location.reload();
        window.location.href("professores.html");
    }
    else{
        alert("Acesso negado.");
    }
})

function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValido || !passwordValid;
}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if(!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById("senhaProfessor").value;
    if(!password) {
        return false;
    }
    return true;
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
