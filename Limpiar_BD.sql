-- Deshabilitar las restricciones de FK temporalmente para evitar conflictos
ALTER TABLE Rutina DISABLE CONSTRAINT fk_cliente_rutina;
ALTER TABLE Rutina DISABLE CONSTRAINT fk_empleado_rutina;
ALTER TABLE Rutina DISABLE CONSTRAINT fk_maquina_rutina;
ALTER TABLE Historial_Curso DISABLE CONSTRAINT fk_membresia_historial;
ALTER TABLE Historial_Curso DISABLE CONSTRAINT fk_curso_historial;
ALTER TABLE Curso DISABLE CONSTRAINT fk_instructor_curso;
ALTER TABLE Membresia DISABLE CONSTRAINT fk_cliente_membresia;
ALTER TABLE Cliente DISABLE CONSTRAINT fk_gimnasio;
ALTER TABLE Empleado DISABLE CONSTRAINT fk_gimnasio_empleado;

-- Eliminar datos de las tablas en orden de dependencias
DELETE FROM Historial_Curso;
DELETE FROM Rutina;
DELETE FROM Curso;
DELETE FROM Maquina;
DELETE FROM Membresia;
DELETE FROM Empleado;
DELETE FROM Cliente;
DELETE FROM Gimnasio;

-- Restablecer contadores de secuencia de columnas IDENTITY
ALTER TABLE Gimnasio MODIFY id_gimnasio GENERATED BY DEFAULT AS IDENTITY (START WITH 1);
ALTER TABLE Cliente MODIFY id_cliente GENERATED BY DEFAULT AS IDENTITY (START WITH 1);
ALTER TABLE Empleado MODIFY id_usuario GENERATED BY DEFAULT AS IDENTITY (START WITH 1);
ALTER TABLE Membresia MODIFY id_membresia GENERATED BY DEFAULT AS IDENTITY (START WITH 1);
ALTER TABLE Curso MODIFY id_curso GENERATED BY DEFAULT AS IDENTITY (START WITH 1);
ALTER TABLE Historial_Curso MODIFY id_historial GENERATED BY DEFAULT AS IDENTITY (START WITH 1);
ALTER TABLE Maquina MODIFY id_maquina GENERATED BY DEFAULT AS IDENTITY (START WITH 1);
ALTER TABLE Rutina MODIFY id_rutina GENERATED BY DEFAULT AS IDENTITY (START WITH 1);

-- Habilitar nuevamente las restricciones de FK
ALTER TABLE Rutina ENABLE CONSTRAINT fk_cliente_rutina;
ALTER TABLE Rutina ENABLE CONSTRAINT fk_empleado_rutina;
ALTER TABLE Rutina ENABLE CONSTRAINT fk_maquina_rutina;
ALTER TABLE Historial_Curso ENABLE CONSTRAINT fk_membresia_historial;
ALTER TABLE Historial_Curso ENABLE CONSTRAINT fk_curso_historial;
ALTER TABLE Curso ENABLE CONSTRAINT fk_instructor_curso;
ALTER TABLE Membresia ENABLE CONSTRAINT fk_cliente_membresia;
ALTER TABLE Cliente ENABLE CONSTRAINT fk_gimnasio;
ALTER TABLE Empleado ENABLE CONSTRAINT fk_gimnasio_empleado;

-- Eliminar roles
DROP ROLE empleado_mantenimiento;
DROP ROLE empleado_instructor;
DROP ROLE cliente;

-- Eliminar usuarios creados en procedimientos
DROP USER "1010101" CASCADE;
DROP USER "2020202" CASCADE;
DROP USER "3030303" CASCADE;
DROP USER "4040404" CASCADE;
DROP USER "5050505" CASCADE;
DROP USER "1111111" CASCADE;
DROP USER "2222222" CASCADE;
DROP USER "3333333" CASCADE;
DROP USER "4444444" CASCADE;
DROP USER "5555555" CASCADE;
DROP USER "6666666" CASCADE;
DROP USER "87654323" CASCADE;

-- Eliminar procedimientos y triggers
DROP PROCEDURE crear_cliente;
DROP PROCEDURE crear_usuario_mantenimiento;
DROP PROCEDURE crear_usuario_instructor;
DROP PROCEDURE verificar_usuario;
DROP PROCEDURE obtener_roles_grantee;
DROP PROCEDURE obtener_empleados;
DROP PROCEDURE agregar_empleado;
DROP PROCEDURE actualizar_empleado_por_cedula;
DROP PROCEDURE registrar_asistencia_curso;
DROP PROCEDURE obtener_datos_empleado;
DROP PROCEDURE obtener_datos_cliente;
DROP PROCEDURE obtener_datos_empleado_login;
DROP PROCEDURE obtener_datos_cliente_login;

DROP TRIGGER trg_notificar_rol_mantenimiento;
DROP TRIGGER trg_notificar_rol_instructor;
DROP TRIGGER trg_notificar_nuevo_cliente;
DROP TRIGGER set_default_schema_system;

-- Opcional: eliminar el tablespace si es necesario
DROP TABLESPACE GYM INCLUDING CONTENTS AND DATAFILES;