USE progest;

-- insert de estadosColaboradores
INSERT INTO estadosColaboradores (nombreEstado) VALUES ('Libre'),  ('En proyecto');

-- insert de estadosTareas
INSERT INTO estadosTareas (nombreEstado) VALUES ('TODO'), ('En progreso'), ('Completado');

-- insert de estadosProyectos
INSERT INTO estadosProyectos (nombreEstado) VALUES ('TODO'), ('En progreso'), ('Terminado');

-- insert de departamentos
INSERT INTO departamentos (nombreDepartamento) VALUES ('Sistemas'), ('Contabilidad');


-- Insert de colaboradores
INSERT INTO colaboradores (correo, contrasena, nombre, primerApellido, segundoApellido, cedula, nombreUsuario, idEstadoColaborador, idDepartamento, administrador, telefono)
VALUES 
('zQ5kP@example.com', '12345678', 'Juan', 'Perez', 'Gonzalez', '12345678', 'juanperez', 1, 1, 1, '12345678'),
('Lx2rT@example.com', '12345678', 'Maria', 'Lopez', 'Garcia', '87654321', 'marialopez', 1, 2, 0, '87654321'),
('bLg4Y@example.com', '12345678', 'Pedro', 'Martinez', 'Ramirez', '13579111', 'pedromartinez', 2, 1, 0, '13579111');


Select * FROM colaboradores;

-- insert de proyecto sin fecha de fin
INSERT INTO proyectos (nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, fechaInicio, historialCambios, idPersonaResponsable)
VALUES ('Proyecto 1', 'Recursos 1', 1000, 'Descripcion 1', 1, '2022-01-01', 'Historial 1', 1), ('Proyecto 2', 'Recursos 2', 2000, 'Descripcion 2', 1, '2022-01-01', 'Historial 2', 2);
-- insert de proyecto con fecha de fin
INSERT INTO proyectos (nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, fechaInicio, fechaFin, historialCambios, idPersonaResponsable)
VALUES ('Proyecto 3', 'Recursos 2', 2000, 'Descripcion 3', 2, '2022-01-01', '2022-02-01', 'Historial 2', 2), ('Proyecto 4', 'Recursos 2', 2000, 'Descripcion 4', 3, '2022-01-01', '2024-02-01', 'Historial 2', 2);


Select * FROM proyectos;

-- si les da algun error aquí puede ser porque el id del proyecto no es 1 o 2
-- insert de tareas
INSERT INTO tareas (nombreTarea, idProyecto, idEstadoTarea, idColaborador, storyPoints, recursosEconomicos, tiempoEstimado, descripcion)
VALUES ('Tarea 3', 3, 1, 1, 1, 100, 10, 'Descripcion 3'),
('Tarea 2', 3, 2, 2, 2, 200, 20, 'Descripcion 2'),
('Tarea 3', 3, 3, 3, 3, 300, 30, 'Descripcion 3'),
('Tarea 4', 3, 1, 1, 1, 100, 10, 'Descripcion 4'),
('Tarea 5', 3, 2, 2, 2, 200, 20, 'Descripcion 5'),
('Tarea 6', 3, 3, 3, 3, 300, 30, 'Descripcion 6'),
('Tarea 2', 4, 1, 1, 1, 100, 10, 'Descripcion 2'),
('Tarea 3', 4, 2, 2, 2, 200, 20, 'Descripcion 3');

Select * FROM tareas;