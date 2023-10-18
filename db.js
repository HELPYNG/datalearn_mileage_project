const conectar = async ()=>{
    if(global.conexao && global.conexao.state != 'disconected')
        return global.conexao
    const mysql=require('mysql2/promise')
    const con=mysql.createConnection("mysql://root:SENHA@localhost:3306/dashboard")
    console.log('Conectou ao banco')
    global.conexao=con
    return con
}

module.exports = {conectar};

//conectar() faça com que vire comentário depois de verificar no node js

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
const obterMediasDasNotas = async () => {
    const con = await conectar();
    const [rows] = await con.query(`
        SELECT CURSOS.NOME AS CURSO_NOME, TESTES.NOME AS TESTE_NOME, AVG(ALUNO_TESTES.NOTA) AS MEDIA_NOTAS
        FROM ALUNO_TESTES
        JOIN TESTES ON ALUNO_TESTES.TESTE_ID = TESTES.ID
        JOIN CURSOS ON TESTES.CURSO_ID = CURSOS.ID
        GROUP BY CURSOS.NOME, TESTES.NOME
    `);
    return rows;
}

module.exports = {obterMediasDasNotas};


module.exports = {/*'nomeDaVariavel,insereVariavel,atualizaVariavel,deletaVariavel'*/}