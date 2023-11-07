const loginForm = document.getElementById("login_Form");
const loginButton = document.getElementById("btn");
const express = require('express');
const app = express();
const mysql = require('mysql2/promise');

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'Dashboard.sql',
};

app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, cpf, senha } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results, fields] = await connection.execute('SELECT * FROM Usuarios WHERE email = ? AND cpf = ? AND senha = ?', [email, cpf, senha]);

    if (results.length === 1) {
      res.status(200).send('Login bem-sucedido');
    } else {
      res.status(401).send('Acesso negado. Verifique suas credenciais.');
    }

    await connection.end();
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).send('Erro no login. Tente novamente.');
  }
});

app.listen(3306, () => {
  console.log('Servidor está ouvindo na porta 3306');
});

loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const cpf = loginForm.cpf.value;
    const password = loginForm.password.value;

    try {
        const response = await fetch('/login', {
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
            alert("Login bem-sucedido!");
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

function isCpfValid() {
    const cpf = document.getElementById("cpf").value;
    if (!cpf) {
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
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function senha() {
    var password = document.getElementById("senha");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}