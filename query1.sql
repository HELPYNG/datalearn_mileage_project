INSERT INTO Visualizacoes (Data, Visualizacoes, CURSO_ID) 
VALUES
  ('2023-10-03', 120, 1),
  ('2023-10-04', 180, 1),
  ('2023-10-05', 130, 1),
  ('2023-10-06', 90, 1),
  ('2023-10-07', 200, 1),
  ('2023-10-08', 170, 1),
  ('2023-10-09', 110, 1),
  ('2023-10-10', 160, 1),
  ('2023-10-11', 140, 1),
  ('2023-10-12', 190, 1),
  ('2023-10-13', 120, 1),
  ('2023-10-14', 170, 1),
  ('2023-10-15', 140, 1),
  ('2023-10-16', 130, 1),
  ('2023-10-17', 210, 1),
  ('2023-10-18', 180, 1),
  ('2023-10-19', 150, 1),
  ('2023-10-20', 170, 1);


INSERT INTO Visualizacoes (Data, Visualizacoes, CURSO_ID) 
VALUES
  ('2023-10-03', 100, 2),
  ('2023-10-04', 150, 2),
  ('2023-10-05', 120, 2),
  ('2023-10-06', 80, 2),
  ('2023-10-07', 190, 2),
  ('2023-10-08', 160, 2),
  ('2023-10-09', 110, 2),
  ('2023-10-10', 140, 2),
  ('2023-10-11', 130, 2),
  ('2023-10-12', 170, 2),
  ('2023-10-13', 120, 2),
  ('2023-10-14', 150, 2),
  ('2023-10-15', 130, 2),
  ('2023-10-16', 110, 2),
  ('2023-10-17', 180, 2),
  ('2023-10-18', 190, 2),
  ('2023-10-19', 140, 2),
  ('2023-10-20', 160, 2);


INSERT INTO Visualizacoes (Data, Visualizacoes, CURSO_ID) 
VALUES
  ('2023-10-03', 90, 3),
  ('2023-10-04', 120, 3),
  ('2023-10-05', 100, 3),
  ('2023-10-06', 70, 3),
  ('2023-10-07', 150, 3),
  ('2023-10-08', 130, 3),
  ('2023-10-09', 80, 3),
  ('2023-10-10', 110, 3),
  ('2023-10-11', 120, 3),
  ('2023-10-12', 140, 3),
  ('2023-10-13', 90, 3),
  ('2023-10-14', 110, 3),
  ('2023-10-15', 100, 3),
  ('2023-10-16', 120, 3),
  ('2023-10-17', 130, 3),
  ('2023-10-18', 140, 3),
  ('2023-10-19', 150, 3),
  ('2023-10-20', 110, 3);


INSERT INTO Visualizacoes (Data, Visualizacoes, CURSO_ID) 
VALUES
  ('2023-10-03', 80, 4),
  ('2023-10-04', 110, 4),
  ('2023-10-05', 90, 4),
  ('2023-10-06', 60, 4),
  ('2023-10-07', 130, 4),
  ('2023-10-08', 100, 4),
  ('2023-10-09', 70, 4),
  ('2023-10-10', 90, 4),
  ('2023-10-11', 100, 4),
  ('2023-10-12', 120, 4),
  ('2023-10-13', 80, 4),
  ('2023-10-14', 90, 4),
  ('2023-10-15', 80, 4),
  ('2023-10-16', 100, 4),
  ('2023-10-17', 110, 4),
  ('2023-10-18', 120, 4),
  ('2023-10-19', 130, 4),
  ('2023-10-20', 100, 4);


SELECT CURSOS.NOME AS Curso, Data, SUM(Visualizacoes) AS TotalVisualizacoes
            FROM Visualizacoes
            JOIN CURSOS ON CURSOS.ID = Visualizacoes.CURSO_ID
            GROUP BY CURSOS.NOME, Data
            ORDER BY Curso, Data;
            
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

            SET @nota = FLOOR(RAND() * 11);

            IF @nota = 0 THEN
				SET @progresso = 0;
			ELSEIF @nota < 2 THEN
				SET @progresso = FLOOR(RAND() * 20 - 10);
			ELSEIF @nota < 4 THEN
				SET @progresso = FLOOR(RAND() * 40 - 20) + 20;
			ELSEIF @nota < 6 THEN
				SET @progresso = FLOOR(RAND() * 20) + 40;
			ELSEIF @nota < 8 THEN
				SET @progresso = FLOOR(RAND() * 20) + 60;
			ELSE
				SET @progresso = FLOOR(RAND() * 20) + 80;
			END IF;



            INSERT INTO ALUNO_TESTES (ALUNO_ID, TESTE_ID, NOTA, PROGRESSO_CURSO)
            VALUES (@aluno_id, @teste_id, @nota, @progresso);

            SET @j = @j + 1;
        END WHILE;

        SET @i = @i + 1;
    END WHILE;
END$$

DELIMITER ;

CALL InsertRandomData();


SELECT * FROM ALUNO_TESTES
