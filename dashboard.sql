CREATE DATABASE dashboard;
USE dashboard;

CREATE TABLE ALUNOS (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(100) NOT NULL,
    IDADE INT NOT NULL
);

CREATE TABLE CURSOS (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(100) NOT NULL
);

CREATE TABLE TESTES (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    CURSO_ID INT NOT NULL,
    NOME VARCHAR(100) NOT NULL,
    FOREIGN KEY (CURSO_ID) REFERENCES CURSOS(ID)
);

CREATE TABLE ALUNO_TESTES (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    ALUNO_ID INT NOT NULL,
    TESTE_ID INT NOT NULL,
    NOTA INT NOT NULL,
    PROGRESSO_CURSO INT NOT NULL,
    FOREIGN KEY (ALUNO_ID) REFERENCES ALUNOS(ID),
    FOREIGN KEY (TESTE_ID) REFERENCES TESTES(ID)
);

INSERT INTO ALUNOS (NOME, IDADE) VALUES
    ('João', 20),
    ('Maria', 22),
    ('Pedro', 21),
    ('Ana', 23);

INSERT INTO CURSOS (NOME) VALUES
    ('Matemática'),
    ('História'),
    ('Ciência da Computação'),
    ('Biologia');

INSERT INTO TESTES (CURSO_ID, NOME) VALUES
    (1, 'Prova de Álgebra'),
    (1, 'Prova de Geometria'),
    (3, 'Prova de Programação'),
    (4, 'Prova de Biologia Celular');

DELIMITER $$

DELIMITER $$

SET SESSION sql_mode='';
DELIMITER $$

CREATE PROCEDURE InsertRandomData()
BEGIN
    SET @i = 1;

    WHILE @i <= 200 DO
        -- Inserir alunos aleatórios
        INSERT INTO ALUNOS (NOME, IDADE) VALUES
            (CONCAT('Aluno_', @i), FLOOR(RAND() * 10) + 18);

        SET @aluno_id = LAST_INSERT_ID();

        -- Definir o número aleatório de testes a serem inseridos
        SET @num_testes = FLOOR(RAND() * 4) + 1;

        -- Loop para inserir testes aleatórios
        SET @j = 1;

        WHILE @j <= @num_testes DO
            INSERT INTO ALUNO_TESTES (ALUNO_ID, TESTE_ID, NOTA, PROGRESSO_CURSO)
            SELECT
                @aluno_id,
                TESTES.ID,
                FLOOR(RAND() * 10) + 1,
                FLOOR(RAND() * 100) -- Progresso do curso aleatório
            FROM TESTES
            ORDER BY RAND()
            LIMIT 1;

            SET @j = @j + 1;
        END WHILE;

        SET @i = @i + 1;
    END WHILE;
END$$

DELIMITER ;

CALL InsertRandomData();