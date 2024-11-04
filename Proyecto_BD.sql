/*
Proyecto Gimnasio
Integrantes:
Bryan Femenías Téllez
Ana Lidieth Ramirez Elizondo
Isaac Mendez Rodriguez
Carlos Alvarez Ramirez

--  alter session set "_ORACLE_SCRIPT"=true; --

----TableSpace----
GYM

----Tablas---
CLIENTE
EMPLEADO
MEMBRESIA
CURSO
HISTORIAL_CURSO
MAQUINA
RUTINA

----Roles----
empleado_mantenimiento
Cliente
Soporte

--Usuarios
Usuario

--Procedures

--Triggers

*/
-- Creacion del  Tablespace
create tablespace GYM
datafile'C:\app\CAR\product\21c\oradata\tablespace_gym\gym.dbf'
size 100m 
extent management local 
autoallocate;

------------------------- CREACION DE LAS TABLAS  -------------------------------------

--Gimnasio Gym
CREATE TABLE Gimnasio(
    id_gimnasio INT GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR(30) NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    horario VARCHAR(30),
    tel_habitacion INT,
    celular INT,
    CONSTRAINT pk_gimnasio PRIMARY KEY(id_gimnasio),
    CONSTRAINT uq_email_gimnasio UNIQUE (email)  -- Unicidad de email
)TABLESPACE GYM;

--Tabla Cliente
CREATE TABLE Cliente(
    id_cliente INT GENERATED ALWAYS AS IDENTITY,
    id_gimnasio INT, 
    nombre VARCHAR(30) NOT NULL,
    apellido1 VARCHAR(30)NOT NULL,
    apellido2 VARCHAR(30)NOT NULL,
    cedula VARCHAR(30)NOT NULL,
    email VARCHAR(50) NOT NULL,
    estado VARCHAR(10),
    tel_habitacion INT,
    celular INT,
    fecha_registro DATE DEFAULT SYSDATE,
    CONSTRAINT uq_cedula_cliente UNIQUE (cedula),
    CONSTRAINT uq_email_cliente UNIQUE (email),  -- Unicidad de email -- Restriccion para que la cedula sea unica
    CONSTRAINT pk_usuario PRIMARY KEY(id_cliente),
    CONSTRAINT fk_gimnasio FOREIGN KEY(id_gimnasio) REFERENCES Gimnasio(id_gimnasio)
)TABLESPACE GYM;

-- TABLA EMPLEADO
CREATE TABLE Empleado (
    id_usuario INT GENERATED ALWAYS AS IDENTITY,  
    id_gimnasio INT,  
    nombre VARCHAR(30) NOT NULL,
    apellido1 VARCHAR(30) NOT NULL,
    apellido2 VARCHAR(30),
    cedula VARCHAR(30) UNIQUE NOT NULL,  -- La cédula es única y no nula
    tel_habitacion INT,
    fecha_contratacion DATE,
    email VARCHAR(50) NOT NULL,
    rol VARCHAR(30),
    estado VARCHAR(30),
     CONSTRAINT uq_email_empleado UNIQUE (email), 
    CONSTRAINT pk_empleado PRIMARY KEY (id_usuario),  -- Clave primaria
    CONSTRAINT fk_gimnasio_empleado FOREIGN KEY (id_gimnasio) REFERENCES Gimnasio(id_gimnasio)  -- Clave foránea
) TABLESPACE GYM;



---MEMBRESIA
CREATE TABLE Membresia(
    id_membresia INT GENERATED ALWAYS AS IDENTITY,
    id_cliente INT NOT NULL,
    tipo_membresia VARCHAR(30) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(30) DEFAULT 'activo',
    monto NUMBER(10,2) NOT NULL,
    CONSTRAINT pk_membresia PRIMARY KEY (id_membresia), 
    CONSTRAINT fk_cliente_membresia FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    CONSTRAINT ck_estado CHECK (estado IN ('activo', 'inactivo', 'cancelado')),
    CONSTRAINT ck_fecha CHECK (fecha_fin > fecha_inicio)
) TABLESPACE GYM;


---CURSO
CREATE TABLE Curso (
    id_curso INT GENERATED ALWAYS AS IDENTITY,  -- ID único del curso
    id_instructor INT,  -- Clave foránea para vincular al instructor
    descripcion VARCHAR(15), 
    horario VARCHAR(30),  
    disponibilidad VARCHAR(10),  
    CONSTRAINT pk_curso PRIMARY KEY (id_curso),  -- Clave primaria
    CONSTRAINT fk_instructor_curso FOREIGN KEY (id_instructor) REFERENCES Empleado(id_usuario)  -- Clave foránea hacia Empleado
) TABLESPACE GYM;


---HISTORIAL CURSO
CREATE TABLE Historial_Curso (
    id_historial INT GENERATED ALWAYS AS IDENTITY,  
    id_membresia INT NOT NULL,  
    id_curso INT NOT NULL,  
    horas INT,  
    fecha DATE DEFAULT SYSDATE,  
    CONSTRAINT pk_historial PRIMARY KEY (id_historial),  
    CONSTRAINT fk_membresia_historial FOREIGN KEY (id_membresia) REFERENCES Membresia(id_membresia),  
    CONSTRAINT fk_curso_historial FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) 
) TABLESPACE GYM;

---TABLA MAQUINA

CREATE TABLE Maquina (
    id_maquina INT GENERATED ALWAYS AS IDENTITY,  -- ID único de la máquina
    nombre VARCHAR(20),
    descripcion VARCHAR(50) NOT NULL,  
    estado VARCHAR(30) DEFAULT 'operativa',  
    CONSTRAINT pk_maquina PRIMARY KEY (id_maquina),  
    CONSTRAINT chk_estado_maquina CHECK (estado IN ('operativa', 'en mantenimiento', 'inactiva'))  -- Estado limitado a valores específicos
) TABLESPACE GYM;


--TABLA RUTINA

CREATE TABLE Rutina (
    id_rutina INT GENERATED ALWAYS AS IDENTITY,  
    id_cliente INT NOT NULL,  
    id_empleado INT,  
    id_maquina INT,  
    fecha DATE DEFAULT SYSDATE,  
    horas INT CHECK (horas > 0),  -- Número de horas dedicadas a la rutina, con restricción para ser positivo
    CONSTRAINT pk_rutina PRIMARY KEY (id_rutina),  -- Clave primaria
    CONSTRAINT fk_cliente_rutina FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),  -- Clave foránea con Cliente
    CONSTRAINT fk_empleado_rutina FOREIGN KEY (id_empleado) REFERENCES Empleado(id_usuario),  -- Clave foránea con Empleado
    CONSTRAINT fk_maquina_rutina FOREIGN KEY (id_maquina) REFERENCES Maquina(id_maquina)  -- Clave foránea con Maquina
) TABLESPACE GYM;

------------------------- **FIN** CREACION DE LAS TABLAS  -------------------------------------





-------------------------  CREACION DE LOS ROLES Y ASIGNACION DE PRIVILEGIOS  -------------------------------------

--Rol empleado_mantenimiento
CREATE ROLE empleado_mantenimiento;
GRANT DBA TO empleado_mantenimiento;


--Rol empleado_instructor

CREATE ROLE empleado_instructor;
--Iniciar session
GRANT CREATE SESSION TO empleado_instructor;
--Permisos para mantenimiento empleado_instructor
GRANT SELECT, INSERT, UPDATE, DELETE ON SYSTEM.Rutina TO empleado_instructor;
GRANT SELECT, INSERT, UPDATE, DELETE ON SYSTEM.Maquina TO empleado_instructor;
GRANT SELECT, INSERT, UPDATE, DELETE ON SYSTEM.Cliente TO empleado_instructor;
GRANT SELECT, INSERT, UPDATE, DELETE ON SYSTEM.Curso TO empleado_instructor;
GRANT SELECT, INSERT, UPDATE, DELETE ON SYSTEM.Historial_Curso TO empleado_instructor;


CREATE ROLE cliente;

GRANT CREATE SESSION to cliente;








-------------------------  **FIN** CREACION DE LOS ROLES Y ASIGNACION DE PRIVILEGIOS  -------------------------------------





----------------------------------PROCEDURES --------------------------------------------

--Este procedimiento tomara la cedula y la contrasena proporcionada como parametros y creara el usuario con rol
--mantenimiento en Oracle
CREATE OR REPLACE PROCEDURE crear_usuario_mantenimiento (
    p_cedula IN VARCHAR2,
    p_password IN VARCHAR2
) AUTHID CURRENT_USER AS
BEGIN
    EXECUTE IMMEDIATE 'CREATE USER "' || p_cedula || '" IDENTIFIED BY "' || p_password || '"';
    EXECUTE IMMEDIATE 'GRANT empleado_mantenimiento TO "' || p_cedula || '"';
END;
/


--Crea un tigger para guardar los registros de un curso

CREATE OR REPLACE PROCEDURE registrar_asistencia_curso (
    p_id_membresia IN INT,
    p_id_curso IN INT,
    p_horas IN INT
)
AS
    v_membresia_activa INT;
BEGIN
    -- Verificar si la membresía está activa
    SELECT COUNT(*) INTO v_membresia_activa
    FROM Membresia
    WHERE id_membresia = p_id_membresia
    AND estado = 'activo'
    AND SYSDATE BETWEEN fecha_inicio AND fecha_fin;

    IF v_membresia_activa = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'La membresía no está activa o ha expirado.');
    END IF;

    -- Insertar el registro en Historial_Curso
    INSERT INTO Historial_Curso (id_membresia, id_curso, horas, fecha)
    VALUES (p_id_membresia, p_id_curso, p_horas, SYSDATE);

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Asistencia registrada con éxito.');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error al registrar la asistencia: ' || SQLERRM);
END;
/










--Este procedimiento tomara la cedula y la contrasena proporcionada como parametros y creara el usuario con rol
--instructor en Oracle

CREATE OR REPLACE PROCEDURE crear_usuario_instructor (
    p_cedula IN VARCHAR2,
    p_password IN VARCHAR2
) AUTHID CURRENT_USER AS
BEGIN
    EXECUTE IMMEDIATE 'CREATE USER "' || p_cedula || '" IDENTIFIED BY "' || p_password || '"';
    EXECUTE IMMEDIATE 'GRANT empleado_instructor TO "' || p_cedula || '"';
END;
/





--------------------------------FIN DE PROCEDURES --------------------------------------


---------------------------------- TRIGGERS --------------------------------------------
-- Trigger para verificar el rol en la tabla empleado

CREATE OR REPLACE TRIGGER trg_notificar_rol_mantenimiento
AFTER INSERT ON Empleado
FOR EACH ROW
WHEN (NEW.rol = 'Mantenimiento')
BEGIN
    -- Mensaje que avisa de la inserción de un empleado con rol de mantenimiento
    DBMS_OUTPUT.PUT_LINE('Insertado empleado con rol Mantenimiento. Crear usuario en Oracle.');
END;


-------------------

--Triger para que muestre un mensaje cuando se crea un rol instructor 
CREATE OR REPLACE TRIGGER trg_notificar_rol_instructor
AFTER INSERT ON Empleado
FOR EACH ROW
WHEN (NEW.rol = 'Instructor')
BEGIN
    -- Mensaje que avisa de la inserción de un empleado con rol de mantenimiento
    DBMS_OUTPUT.PUT_LINE('Insertado empleado con rol Instructor. Crear usuario en Oracle.');
END;


-----

CREATE OR REPLACE TRIGGER trg_notificar_nuevo_cliente
AFTER INSERT ON Cliente
FOR EACH ROW
BEGIN
    -- Mensaje que avisa de la creación de un nuevo cliente
    DBMS_OUTPUT.PUT_LINE('Se ha creado un nuevo cliente con nombre: ' || :NEW.nombre || ' ' || :NEW.apellido1);
END;
/






--Triger de inicio de sesion para cambiar el esquema SYSTEM como predetermiado a todos los usuarios
CREATE OR REPLACE TRIGGER set_default_schema_system
AFTER LOGON ON DATABASE
BEGIN
    EXECUTE IMMEDIATE 'ALTER SESSION SET CURRENT_SCHEMA = SYSTEM';
END;


--------------------------------            AUDITORIA            ----------------------------

--Activacion del parametro de auditoria el cual controla si la auditoria esta activada
ALTER SYSTEM SET AUDIT_TRAIL = DB, EXTENDED SCOPE = SPFILE;

-- Auditoria para inicio de sesion 
AUDIT SESSION;

-- Auditorias para el rol de empleado_mantenimiento

AUDIT CREATE TABLE;
AUDIT ALTER TABLE;
AUDIT SELECT TABLE;
AUDIT DROP ANY TABLE BY ACCESS;


--------------------------------FIN TRIGGERS --------------------------------------


-------------------------------- FUNCIONES  --------------------------------------

--- DATOS QUEMADOS  -----


-------------------------  CREACION DE LOS USUARIOS  -------------------------------------






-------------------------  FIn CREACION DE LOS USUARIOS  ---------------------------------



INSERT INTO Gimnasio (nombre, direccion, email, horario, tel_habitacion, celular)
VALUES ('Gimnasio Central', 'Av. Principal 123', 'contacto@gymcentral.com', '6am - 10pm', 22223333, 88889999);

---EMPLEADO INSTRUCTOR

INSERT INTO Empleado (id_gimnasio, nombre, apellido1, apellido2, cedula, tel_habitacion, fecha_contratacion, email, rol, estado)
VALUES (1, 'Carlos', 'Martinez', 'Lopez', '87654322', 1234567, TO_DATE('2024-10-25', 'YYYY-MM-DD'), 'carlos.martinez@example.com', 'Instructor', 'activo');

--EMPLEADO MANTENIMIENTO 

INSERT INTO Empleado (id_gimnasio, nombre, apellido1, apellido2, cedula, tel_habitacion, fecha_contratacion, email, rol, estado)
VALUES (1, 'Juan', 'Perez', 'Gomez', '87654321', 1234567, TO_DATE('2024-10-25', 'YYYY-MM-DD'), 'juan.perez@example.com', 'Mantenimiento', 'activo');






