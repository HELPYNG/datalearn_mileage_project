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
    var password = document.getElementById("senhaProfesor");
    if(password.type === "password"){
        password.type = "text";
    }
    else{
        password.type = "password";
    }
}
