const conectar = async ()=>{
    if(global.conexao && global.conexao.state != 'disconected')
        return global.conexao
    const mysql=require('mysql2/promise')
    const con=mysql.createConnection("mysql://root:senha@localhost:3306/banco")
    console.log('Conectou ao banco')
    global.conexao=con
    return con
}

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

module.exports = {/*'nomeDaVariavel,insereVariavel,atualizaVariavel,deletaVariavel'*/}