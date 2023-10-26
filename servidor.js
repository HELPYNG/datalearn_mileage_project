const express = require('express');
const app = express();
const { obterMediasDasNotas } = require('./db');
const { obterProgressoDosAlunos } = require('./db');
const { obterVisualizacoes } = require('./db');
const { obterNotaPorProgresso } = require('./db');
const path = require('path');


app.use(express.static(path.join(__dirname, 'DASHBOARD')));

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' fonts.gstatic.com;");
    next();
});

app.get("/", function(req, res) {
    res.send("Funcionou");
})

app.get('/obterMediasDasNotas', async (req, res) => {
    try {
        const medias = await obterMediasDasNotas();
        res.json(medias);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter a média das notas'});
    }
});

/*app.get('/obterProgressoDosAlunos', async (req, res) => {
    try {
        const prog = await obterProgressoDosAlunos();
        res.json(prog);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o progresso dos alunos'});
    }
});*/


app.get('/obterVisualizacoes', async (req, res) => {
    try {
        const visu = await obterVisualizacoes();
        res.json(visu);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter a média das notas'});
    }
});

app.get('/obterNotaPorProgresso', async (req, res) =>{
    try {
        const prog =  await obterNotaPorProgresso();
        res.json(prog);
    } catch (error) {
        res.status(500).json({error: 'Erro ao obter o progresso e a nota dos alunos'});
    }
})

app.listen(3001, function() {
    console.log("Servidor Rodando na URL http://localhost:3001/alunos.html");
})