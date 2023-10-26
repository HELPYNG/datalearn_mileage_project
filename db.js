const conectar = async ()=>{
    if(global.conexao && global.conexao.state != 'disconected')
        return global.conexao
    const mysql=require('mysql2/promise')
    const con=mysql.createConnection("mysql://root:1234@localhost:3306/dashboard")
    console.log('Conectou ao banco')
    global.conexao=con
    return con
}

module.exports = {conectar};

conectar() //faça com que vire comentário depois de verificar no node js

/*const nomeDaVariavel = async()={
    const con=await conectar()
    const [linhas] = await.con.query('SELECT * FROM nomeDaVariavel')
    return await linhas
} */

/*const insereVariavel = async(Variavel)={
    const con=await conectar()
    const sql='SELECT * FROM nomeDaVariavel'
    const sql='INSERT INTO nomeDaVariavel (nome,idade) VALUES (?,?)'
    const valores=[Variavel.nome,variavel.idade]
    const [linhas] = await.con.query('SELECT * FROM nomeDaVariavel')
    return await linhas
} */

/*const atualizaVariavel = async(Variavel)={
    const con=await conectar()
    const sql='SELECT * FROM nomeDaVariavel'
    const sql='UPDATE nomeDaVariavel SET nome-?,idade-? WHERE id=?'
    const valores=[Variavel.nome,variavel.idade,id]
    console.log(id)
    console.log(variavel.nome)
    console.log(variavel.idade)
    const [linhas] = await.con.query('SELECT * FROM nomeDaVariavel')
    return await linhas
} */

/*const deletaVariavel = async(Variavel)={
    const con=await conectar()
    const sql='SELECT * FROM nomeDaVariavel'
    const sql='DELETE FROM nomeDaVariavel WHERE id=?'
    const valores=[id]
    console.log(id)
    console.log(variavel.nome)
    console.log(variavel.idade)
    const [linhas] = await.con.query('SELECT * FROM nomeDaVariavel')
    return await linhas
} */
// db.js

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
            SELECT Data, SUM(Visualizacoes) AS TotalVisualizacoes
            FROM Visualizacoes
            GROUP BY Data
            ORDER BY Data;
        `);
        return rows;
    } catch (error) {
        console.error('Erro ao obter dados de visualizações:', error);
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


module.exports = { obterMediasDasNotas, obterProgressoDosAlunos, obterVisualizacoes, obterNotaPorProgresso };


