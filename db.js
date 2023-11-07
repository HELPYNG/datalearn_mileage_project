const conectar = async () => {
    if (global.conexao && global.conexao.state !== 'disconnected') {
        return global.conexao;
    }
    const mysql = require('mysql2/promise');
    const con = mysql.createConnection("mysql://root:1234@localhost:3306/dashboard");
    console.log('Conectou ao banco');
    global.conexao = con;
    return con;
}

const registrarProfessor = async (senha, cpf, email) => {
    try {
        const con = await conectar();
        const [result] = await con.query(
            'INSERT INTO Professores (senha, cpf, email) VALUES (?, ?, ?)',
            [senha, cpf, email]
        );
        console.log('Professor registrado com sucesso.');
        return result;
    } catch (error) {
        console.error('Erro ao registrar professor:', error);
        throw error;
    }
}

const loginProfessor = async (email, senha) => {
    try {
        const con = await conectar();
        const [rows] = await con.query(
            'SELECT id, senha, cpf, email FROM Professores WHERE email = ?',
            [email]
        );

        if (rows.length > 0) {
            const professor = rows[0];
            if (professor.senha === senha) {
                console.log('Login do professor bem-sucedido');
                return professor;
            } else {
                console.error('Senha incorreta');
                return null;
            }
        } else {
            console.error('Professor não encontrado');
            return null;
        }
    } catch (error) {
        console.error('Erro no login do professor:', error);
        throw error;
    }
}

const obterMediasDasNotas = async () => {
    try {
      const con = await conectar();
      const [rows] = await con.query(`
        SELECT CURSOS.NOME AS CURSO_NOME, AVG(ALUNO_TESTES.NOTA) AS MEDIA_NOTAS
        FROM ALUNO_TESTES
        JOIN TESTES ON ALUNO_TESTES.TESTE_ID = TESTES.ID
        JOIN CURSOS ON TESTES.CURSO_ID = CURSOS.ID
        GROUP BY CURSOS.NOME;
      `);
      return rows;
    } catch (error) {
      console.error('Erro ao obter as médias das notas:', error);
      throw error;
    }
  }
  

  const obterProgressoDosAlunos = async () => {
    try {
        const con = await conectar();
        const [rows] = await con.query(`
            SELECT CURSOS.NOME AS CURSO_NOME, AVG(ALUNO_TESTES.PROGRESSO_CURSO) AS MEDIA_PROGRESSO_CURSO
            FROM ALUNO_TESTES
            JOIN TESTES ON ALUNO_TESTES.TESTE_ID = TESTES.ID
            JOIN CURSOS ON TESTES.CURSO_ID = CURSOS.ID
            GROUP BY CURSOS.NOME
        `);
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Erro ao obter a média do progresso dos alunos por curso:', error);
        throw error;
    }
}


const obterVisualizacoes = async () => {
    try {
        const con = await conectar();
        const [rows] = await con.query(`
            SELECT CURSOS.NOME AS Curso, Data, SUM(Visualizacoes) AS TotalVisualizacoes
            FROM Visualizacoes
            JOIN CURSOS ON CURSOS.ID = Visualizacoes.CURSO_ID
            GROUP BY CURSOS.NOME, Data
            ORDER BY Curso, Data;
        `);
        return rows;
    } catch (error) {
        console.error('Erro ao obter dados de visualizações diárias por curso:', error);
        throw error;
    }
};


  
const obterNotaPorProgresso = async () => {
    try {
        const con = await conectar();
        const [rows] = await con.query(`
            SELECT ALUNOS.NOME AS ALUNO, CURSOS.NOME AS CURSO, AVG(ALUNO_TESTES.NOTA) AS MEDIA_NOTAS, AVG(ALUNO_TESTES.PROGRESSO_CURSO) AS MEDIA_PROGRESSO
            FROM ALUNO_TESTES
            JOIN ALUNOS ON ALUNOS.ID = ALUNO_TESTES.ALUNO_ID
            JOIN TESTES ON TESTES.ID = ALUNO_TESTES.TESTE_ID
            JOIN CURSOS ON CURSOS.ID = TESTES.CURSO_ID
            GROUP BY ALUNOS.NOME, CURSOS.NOME;
        `);
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        throw error;
    }
};

module.exports = { conectar, registrarProfessor, loginProfessor, obterMediasDasNotas, obterProgressoDosAlunos, obterVisualizacoes, obterNotaPorProgresso };