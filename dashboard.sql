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

CREATE TABLE Visualizacoes (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Data DATE NOT NULL,
  Visualizacoes INT NOT NULL
);


INSERT INTO Visualizacoes (Data, Visualizacoes) VALUES
  ('2023-10-01', 100),
  ('2023-10-02', 150),
  ('2023-10-03', 120),
  ('2023-10-04', 180),
  ('2023-10-05', 130),
  ('2023-10-06', 90),
  ('2023-10-07', 200),
  ('2023-10-08', 170),
  ('2023-10-09', 110),
  ('2023-10-10', 160),
  ('2023-10-11', 140),
  ('2023-10-12', 190),
  ('2023-10-13', 120),
  ('2023-10-14', 170),
  ('2023-10-15', 140),
  ('2023-10-16', 130),
  ('2023-10-17', 210),
  ('2023-10-18', 180),
  ('2023-10-19', 150),
  ('2023-10-20', 170);



INSERT INTO CURSOS (NOME) VALUES
    ('Java'),
    ('JavaScript'),
    ('Python'),
    ('C#');
    
INSERT INTO TESTES (CURSO_ID, NOME) VALUES
    (1, 'Teste de Java 1'),
    (1, 'Teste de Java 2'),
    (2, 'Teste de JavaScript 1'),
    (2, 'Teste de JavaScript 2'),
    (3, 'Teste de Python 1'),
    (3, 'Teste de Python 2'),
    (4, 'Teste de C# 1'),
    (4, 'Teste de C# 2');

DELIMITER $$

DELIMITER $$

SET SESSION sql_mode='';


DELIMITER $$

CREATE PROCEDURE InsertRandomData()
BEGIN
    SET @i = 1;

    WHILE @i <= 200 DO
        INSERT INTO ALUNOS (NOME, IDADE) VALUES
            (CONCAT('Aluno_', @i), FLOOR(RAND() * 10) + 18);

        SET @aluno_id = LAST_INSERT_ID();

        SET @num_testes = FLOOR(RAND() * 4) + 1;

        SET @j = 1;

        WHILE @j <= @num_testes DO
            SET @curso_id = FLOOR(RAND() * 4) + 1;

            SET @teste_id = (SELECT ID FROM TESTES WHERE CURSO_ID = @curso_id ORDER BY RAND() LIMIT 1);

            INSERT INTO ALUNO_TESTES (ALUNO_ID, TESTE_ID, NOTA, PROGRESSO_CURSO)
            SELECT
                @aluno_id,
                @teste_id,
                FLOOR(RAND() * 10) + 1,
                FLOOR(RAND() * 100)
            LIMIT 1;

            SET @j = @j + 1;
        END WHILE;

        SET @i = @i + 1;
    END WHILE;
END$$

CALL InsertRandomData();
SELECT
    ALUNOS.NOME AS ALUNO,
    CURSOS.NOME AS CURSO,
    TESTES.NOME AS TESTE,
    ALUNO_TESTES.NOTA
FROM ALUNO_TESTES
JOIN ALUNOS ON ALUNOS.ID = ALUNO_TESTES.ALUNO_ID
JOIN TESTES ON TESTES.ID = ALUNO_TESTES.TESTE_ID
JOIN CURSOS ON CURSOS.ID = TESTES.CURSO_ID;

select * from alunos

