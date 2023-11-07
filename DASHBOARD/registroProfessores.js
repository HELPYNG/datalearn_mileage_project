const registrationForm = document.getElementById("registrationForm");
const registrationButton = document.getElementById("btn");
const express = require('express');
const app = express();
const mysql = require('mysql2/promise');

const conectar = async () => {
    const con = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        database: 'dashboard.sql'
    });

    console.log('Conectou ao banco');
    return con;
}

app.use(express.json());

const registrarProfessor = async (senha, cpf, email) => {
    try {
        const con = await conectar();
        const [result] = await con.execute(
            'INSERT INTO Professores (senha, cpf, email) VALUES (?, ?, ?)',
            [senha, cpf, email]
        );

        con.end();

        console.log('Professor registrado com sucesso.');
        return result;
    } catch (error) {
        console.error('Erro no registro:', error);
        throw error;
    }
}

app.post('/registrar', async (req, res) => {
    const { email, cpf, senha } = req.body;

    try {
        const result = await registrarProfessor(senha, cpf, email);
        console.log('Registro bem-sucedido:', result);

        res.status(200).send('Registro bem-sucedido');
    } catch (error) {
        console.error('Erro no registro:', error);

        res.status(500).send('Erro no registro. Tente novamente.');
    }
});

app.listen(3306, () => {
    console.log('Servidor está ouvindo na porta 3306');
});

registrationButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    if (!email || !cpf || !senha) {
        alert("Por favor, preencha todos os campos.");
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
                senha: senha
            })
        });

        if (response.status === 200) {
            alert("Registro bem-sucedido!");
        } else {
            alert("Erro no registro. Tente novamente.");
        }
    } catch (error) {
        console.error('Erro no registro:', error);
        alert("Erro no registro. Tente novamente.");
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
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
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
