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
-- IMPORTANTE
alter session set "_ORACLE_SCRIPT"=true;

-- Creacion del  Tablespace (AJUSTAR nombre de usuario en la ruta)
create tablespace GYM
datafile'C:\app\CAMBIAR\product\21c\oradata\tablespace_gym\gym.dbf'
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
    descripcion VARCHAR(50), 
    horario VARCHAR(50),  
    disponibilidad VARCHAR(15),  
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
    nombre VARCHAR(30),
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


-------- Procedures para USUARIOS  ------

------ Procedure para crear un cliente en oracle y asignar el rol de cliente
CREATE OR REPLACE PROCEDURE crear_cliente (
    p_cedula IN VARCHAR2,
    p_password IN VARCHAR2
) AUTHID CURRENT_USER AS
BEGIN
    -- Configura la sesión para permitir nombres de usuario sin prefijo C##
    EXECUTE IMMEDIATE 'ALTER SESSION SET "_ORACLE_SCRIPT"=true';
    
    -- Crea el usuario y asigna el rol
    EXECUTE IMMEDIATE 'CREATE USER "' || p_cedula || '" IDENTIFIED BY "' || p_password || '"';
    EXECUTE IMMEDIATE 'GRANT cliente TO "' || p_cedula || '"';
END crear_cliente;
/


--Este procedimiento tomara la cedula y la contrasena proporcionada como parametros y creara el usuario con rol mantenimiento en Oracle
CREATE OR REPLACE PROCEDURE crear_usuario_mantenimiento (
    p_cedula IN VARCHAR2,
    p_password IN VARCHAR2
) AUTHID CURRENT_USER AS
BEGIN
    -- Configura la sesión para permitir nombres de usuario sin prefijo C##
    EXECUTE IMMEDIATE 'ALTER SESSION SET "_ORACLE_SCRIPT"=true';
    
    -- Crea el usuario y asigna el rol
    EXECUTE IMMEDIATE 'CREATE USER "' || p_cedula || '" IDENTIFIED BY "' || p_password || '"';
    EXECUTE IMMEDIATE 'GRANT empleado_mantenimiento TO "' || p_cedula || '"';
END;



--Este procedimiento tomara la cedula y la contrasena proporcionada como parametros y creara el usuario con rol
--instructor en Oracle
CREATE OR REPLACE PROCEDURE crear_usuario_instructor (
    p_cedula IN VARCHAR2,
    p_password IN VARCHAR2
) AUTHID CURRENT_USER AS
BEGIN
    -- Configura la sesión para permitir nombres de usuario sin prefijo C##
    EXECUTE IMMEDIATE 'ALTER SESSION SET "_ORACLE_SCRIPT"=true';

    EXECUTE IMMEDIATE 'CREATE USER "' || p_cedula || '" IDENTIFIED BY "' || p_password || '"';
    EXECUTE IMMEDIATE 'GRANT empleado_instructor TO "' || p_cedula || '"';
END;
/



---- PROCEDURE VERIFICACION DE USUARIOS
CREATE OR REPLACE PROCEDURE verificar_usuario (
    p_username IN VARCHAR2,
    p_existe OUT NUMBER
) AS
    v_count NUMBER;
BEGIN
    -- Verifica si el usuario existe en la vista ALL_USERS
    SELECT COUNT(*)
    INTO v_count
    FROM all_users
    WHERE username = UPPER(p_username);

    -- Asigna 1 si el usuario existe, de lo contrario asigna 0
    p_existe := CASE WHEN v_count > 0 THEN 1 ELSE 0 END;
END verificar_usuario;
/



---Obtener el rol de un usuario
CREATE OR REPLACE PROCEDURE obtener_roles_grantee (
    p_grantee IN VARCHAR2,
    p_role OUT VARCHAR2
) AUTHID CURRENT_USER IS
    v_sql     VARCHAR2(1000);
    v_cursor  SYS_REFCURSOR;
BEGIN
  
    p_role := NULL;

 
    v_sql := 'SELECT granted_role FROM dba_role_privs WHERE grantee = :grantee';


    OPEN v_cursor FOR v_sql USING p_grantee;

   
    FETCH v_cursor INTO p_role;


    CLOSE v_cursor;

    -- Si no se encontró ningún rol, p_role permanecerá como NULL

EXCEPTION
    WHEN OTHERS THEN
        p_role := 'Error: ' || SQLERRM; -- Captura el error
        IF v_cursor%ISOPEN THEN
            CLOSE v_cursor; 
        END IF;
END obtener_roles_grantee;
/



---------   PROCEDURES PARA LOS EMPLEADOS  -----------------
---Obtener empleados
CREATE OR REPLACE PROCEDURE obtener_empleados (
    p_empleados OUT SYS_REFCURSOR
) IS
BEGIN
    OPEN p_empleados FOR
        SELECT id_usuario, id_gimnasio, nombre, apellido1, apellido2, cedula, 
               tel_habitacion, fecha_contratacion, email, rol, estado
        FROM Empleado;
END obtener_empleados;
/



------ Procedure Agregar un empleado
CREATE OR REPLACE PROCEDURE agregar_empleado (
    p_id_gimnasio INT,
    p_nombre VARCHAR2,
    p_apellido1 VARCHAR2,
    p_apellido2 VARCHAR2,
    p_cedula VARCHAR2,
    p_tel_habitacion INT,
    p_fecha_contratacion DATE,
    p_email VARCHAR2,
    p_rol VARCHAR2,
    p_estado VARCHAR2
) AS
BEGIN
    INSERT INTO Empleado (id_gimnasio, nombre, apellido1, apellido2, cedula, tel_habitacion, fecha_contratacion, email, rol, estado)
    VALUES (p_id_gimnasio, p_nombre, p_apellido1, p_apellido2, p_cedula, p_tel_habitacion, p_fecha_contratacion, p_email, p_rol, p_estado);
END;




----------- Actualizar empleado por cedula  -------------
CREATE OR REPLACE PROCEDURE actualizar_empleado_por_cedula(
    p_cedula IN VARCHAR2,
    p_nombre IN VARCHAR2,
    p_apellido1 IN VARCHAR2,
    p_apellido2 IN VARCHAR2,
    p_telHabitacion IN NUMBER,
    p_fechaContratacion IN DATE,
    p_email IN VARCHAR2,
    p_rol IN VARCHAR2,
    p_estado IN VARCHAR2,
    p_filas_afectadas OUT NUMBER
) AS
BEGIN
    UPDATE empleado
    SET nombre = p_nombre,
        apellido1 = p_apellido1,
        apellido2 = p_apellido2,
        tel_habitacion = p_telHabitacion,
        fecha_contratacion = p_fechaContratacion,
        email = p_email,
        rol = p_rol,
        estado = p_estado
    WHERE cedula = p_cedula;
    
    -- Asigna el número de filas afectadas al parámetro de salida
    p_filas_afectadas := SQL%ROWCOUNT;
END;



----------------------------- actualizar un empleado ----------------

--- Registrar una asistencia de curso (**  No testeado  **)
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



------ OBTENER LOS DATOS DE UN EMPLEADO
CREATE OR REPLACE PROCEDURE obtener_datos_empleado (
    p_cedula IN VARCHAR2,
    p_id_usuario OUT NUMBER,
    p_nombre OUT VARCHAR2,
    p_apellido1 OUT VARCHAR2,
    p_apellido2 OUT VARCHAR2,
    p_cedula_out OUT VARCHAR2,
    p_email OUT VARCHAR2,
    p_estado OUT VARCHAR2,
    p_tel_habitacion OUT NUMBER,
    p_fecha_contratacion OUT DATE
) IS
BEGIN
    -- Consulta para obtener los datos del empleado por c�dula
    SELECT id_usuario, nombre, apellido1, apellido2, cedula, email, estado, tel_habitacion, fecha_contratacion
    INTO p_id_usuario, p_nombre, p_apellido1, p_apellido2, p_cedula_out, p_email, p_estado, p_tel_habitacion, p_fecha_contratacion
    FROM EMPLEADO
    WHERE cedula = p_cedula;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_id_usuario := NULL;
        p_nombre := NULL;
        p_apellido1 := NULL;
        p_apellido2 := NULL;
        p_cedula_out := NULL;
        p_email := NULL;
        p_estado := NULL;
        p_tel_habitacion := NULL;
        p_fecha_contratacion := NULL;
        DBMS_OUTPUT.PUT_LINE('No se encontr� el empleado con la c�dula ' || p_cedula);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Ocurri� un error: ' || SQLERRM);
END obtener_datos_empleado;
/


--Procedure para CLIENTES

----Obtener los datos de un cliente
CREATE OR REPLACE PROCEDURE obtener_datos_cliente (
    p_cedula IN VARCHAR2,
    p_id_cliente OUT NUMBER,
    p_nombre OUT VARCHAR2,
    p_apellido1 OUT VARCHAR2,
    p_apellido2 OUT VARCHAR2,
    p_cedula_out OUT VARCHAR2,
    p_email OUT VARCHAR2,
    p_estado OUT VARCHAR2,
    p_tel_habitacion OUT NUMBER,
    p_celular OUT NUMBER,
    p_fecha_registro OUT DATE
) IS
BEGIN
    -- Consulta para obtener los datos del cliente por cédula
    SELECT id_cliente, nombre, apellido1, apellido2, cedula, email, estado,
           tel_habitacion, celular, fecha_registro
    INTO p_id_cliente, p_nombre, p_apellido1, p_apellido2, p_cedula_out, p_email, p_estado, p_tel_habitacion, p_celular, p_fecha_registro
    FROM Cliente
    WHERE cedula = p_cedula;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_id_cliente := NULL;
        p_nombre := NULL;
        p_apellido1 := NULL;
        p_apellido2 := NULL;
        p_cedula_out := NULL;
        p_email := NULL;
        p_estado := NULL;
        p_tel_habitacion := NULL;
        p_celular := NULL;
        p_fecha_registro := NULL;
        DBMS_OUTPUT.PUT_LINE('No se encontró el cliente con la cédula ' || p_cedula);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Ocurrió un error: ' || SQLERRM);
END obtener_datos_cliente;
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

----Agregar empleados



-- Insertar 4 empleados con rol "instructor"
INSERT INTO Empleado (id_gimnasio, nombre, apellido1, apellido2, cedula, tel_habitacion, fecha_contratacion, email, rol, estado)
VALUES (1, 'Ricardo', 'Santos', 'Vargas', '1111111', 22551122, TO_DATE('2023-01-15', 'YYYY-MM-DD'), 'ricardo.santos@example.com', 'instructor', 'activo');

INSERT INTO Empleado (id_gimnasio, nombre, apellido1, apellido2, cedula, tel_habitacion, fecha_contratacion, email, rol, estado)
VALUES (1, 'Lorena', 'Méndez', 'Quirós', '2222222', 22552233, TO_DATE('2022-05-20', 'YYYY-MM-DD'), 'lorena.mendez@example.com', 'instructor', 'activo');

INSERT INTO Empleado (id_gimnasio, nombre, apellido1, apellido2, cedula, tel_habitacion, fecha_contratacion, email, rol, estado)
VALUES (1, 'Esteban', 'Solano', 'García', '3333333', 22553344, TO_DATE('2021-03-10', 'YYYY-MM-DD'), 'esteban.solano@example.com', 'instructor', 'activo');

INSERT INTO Empleado (id_gimnasio, nombre, apellido1, apellido2, cedula, tel_habitacion, fecha_contratacion, email, rol, estado)
VALUES (1, 'Gabriela', 'Camacho', 'Rojas', '4444444', 22554455, TO_DATE('2020-08-30', 'YYYY-MM-DD'), 'gabriela.camacho@example.com', 'instructor', 'activo');

-- Insertar 2 empleados con rol "mantenimiento"
INSERT INTO Empleado (id_gimnasio, nombre, apellido1, apellido2, cedula, tel_habitacion, fecha_contratacion, email, rol, estado)
VALUES (1, 'Mario', 'Hernández', 'Campos', '5555555', 22555566, TO_DATE('2019-11-05', 'YYYY-MM-DD'), 'mario.hernandez@example.com', 'mantenimiento', 'activo');

INSERT INTO Empleado (id_gimnasio, nombre, apellido1, apellido2, cedula, tel_habitacion, fecha_contratacion, email, rol, estado)
VALUES (1, 'Patricia', 'Rojas', 'Ureña', '6666666', 22556677, TO_DATE('2018-02-18', 'YYYY-MM-DD'), 'patricia.rojas@example.com', 'mantenimiento', 'activo');

BEGIN
    crear_usuario_instructor('1111111', 'system');
    crear_usuario_instructor('2222222', 'system');
    crear_usuario_instructor('3333333', 'system');
    crear_usuario_instructor('4444444', 'system');
END;
/

BEGIN
    crear_usuario_mantenimiento('5555555', 'system');
    crear_usuario_mantenimiento('6666666', 'system');
END;
/

----Clientes genericos

-- Inserciones de clientes genéricos
INSERT INTO Cliente (id_gimnasio, nombre, apellido1, apellido2, cedula, email, estado, tel_habitacion, celular)
VALUES (1, 'Carlos', 'Ramírez', 'López', '1010101', 'carlos.ramirez@example.com', 'activo', 22221111, 89991111);

INSERT INTO Cliente (id_gimnasio, nombre, apellido1, apellido2, cedula, email, estado, tel_habitacion, celular)
VALUES (1, 'María', 'Fernández', 'Gómez', '2020202', 'maria.fernandez@example.com', 'activo', 22221212, 89992222);

INSERT INTO Cliente (id_gimnasio, nombre, apellido1, apellido2, cedula, email, estado, tel_habitacion, celular)
VALUES (1, 'Juan', 'Pérez', 'Martínez', '3030303', 'juan.perez@example.com', 'inactivo', 22221313, 89993333);

INSERT INTO Cliente (id_gimnasio, nombre, apellido1, apellido2, cedula, email, estado, tel_habitacion, celular)
VALUES (1, 'Ana', 'Rodríguez', 'Soto', '4040404', 'ana.rodriguez@example.com', 'activo', 22221414, 89994444);

INSERT INTO Cliente (id_gimnasio, nombre, apellido1, apellido2, cedula, email, estado, tel_habitacion, celular)
VALUES (1, 'Luis', 'González', 'Hernández', '5050505', 'luis.gonzalez@example.com', 'activo', 22221515, 89995555);

----- asignar roles a los clientes

BEGIN
    crear_cliente('1010101', 'system');
    crear_cliente('2020202', 'system');
    crear_cliente('3030303', 'system');
    crear_cliente('5050505', 'system');
    crear_cliente('4040404', 'system');
    --crear_cliente('87654323', 'system');
END;
/

--- Generar membresia



INSERT INTO Membresia (id_cliente, tipo_membresia, fecha_inicio, fecha_fin, estado, monto)
VALUES (1, 'Premium', TO_DATE('10/11/2024', 'DD/MM/YYYY'), TO_DATE('10/11/2025', 'DD/MM/YYYY'), 'activo', 500.00);

INSERT INTO Membresia (id_cliente, tipo_membresia, fecha_inicio, fecha_fin, estado, monto)
VALUES (2, 'Premium', TO_DATE('10/11/2024', 'DD/MM/YYYY'), TO_DATE('10/11/2025', 'DD/MM/YYYY'), 'activo', 500.00);

INSERT INTO Membresia (id_cliente, tipo_membresia, fecha_inicio, fecha_fin, estado, monto)
VALUES (3, 'Premium', TO_DATE('10/11/2024', 'DD/MM/YYYY'), TO_DATE('10/11/2025', 'DD/MM/YYYY'), 'inactivo', 500.00);

INSERT INTO Membresia (id_cliente, tipo_membresia, fecha_inicio, fecha_fin, estado, monto)
VALUES (4, 'Premium', TO_DATE('10/11/2024', 'DD/MM/YYYY'), TO_DATE('10/11/2025', 'DD/MM/YYYY'), 'activo', 500.00);

INSERT INTO Membresia (id_cliente, tipo_membresia, fecha_inicio, fecha_fin, estado, monto)
VALUES (5, 'Premium', TO_DATE('10/11/2024', 'DD/MM/YYYY'), TO_DATE('10/11/2025', 'DD/MM/YYYY'), 'activo', 500.00);



---
---cursos


INSERT INTO Curso (id_instructor, descripcion, horario, disponibilidad)
VALUES (1, 'Yoga Básico', 'Lunes y Miércoles 8:00-9:00 AM', 'Disponible');

INSERT INTO Curso (id_instructor, descripcion, horario, disponibilidad)
VALUES (2, 'Pilates Intermedio', 'Martes y Jueves 10:00-11:00 AM', 'Disponible');

INSERT INTO Curso (id_instructor, descripcion, horario, disponibilidad)
VALUES (3, 'HIIT Avanzado', 'Lunes, Miércoles y Viernes 6:00-7:00 AM', 'Disponible');

INSERT INTO Curso (id_instructor, descripcion, horario, disponibilidad)
VALUES (4, 'Cardio Box', 'Martes y Jueves 5:00-6:00 PM', 'Disponible');

INSERT INTO Curso (id_instructor, descripcion, horario, disponibilidad)
VALUES (5, 'Crossfit', 'Sábados 9:00-11:00 AM', 'Disponible');

INSERT INTO Curso (id_instructor, descripcion, horario, disponibilidad)
VALUES (6, 'Zumba', 'Viernes 6:00-7:00 PM', 'Disponible');



---cambiar varchar a 30
/*ALTER TABLE Maquina
MODIFY (nombre VARCHAR(30));*/

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Cinta de correr', 'Ejercicio de carrera', 'operativa');

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Elíptica', 'Ejercicio de bajo impacto', 'operativa');

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Remo', 'Fortalecimiento completo', 'en mantenimiento');

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Bicicleta estática', 'Entrenamiento de resistencia', 'operativa');

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Banco de pesas', 'Ejercicios con pesas libres', 'operativa');

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Press de pecho', 'Trabajo de pectorales', 'en mantenimiento');

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Pectoral Contractor', 'Ejercicio de pectorales', 'inactiva');

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Prensa de piernas', 'Ejercicio de piernas', 'operativa');

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Polea alta', 'Trabajo de dorsales y tríceps', 'operativa');

INSERT INTO Maquina (nombre, descripcion, estado)
VALUES ('Máquina de abdominales', 'Fortalecimiento abdominal', 'en mantenimiento');







-- Rutina para el cliente Carlos Ramírez (id_cliente) asignada al instructor Ricardo Santos (id_empleado)
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (1, 1, 1, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (1, 1, 4, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (1, 1, 8, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (1, 1, 9, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (1, 1, 10, 1);

-- Rutina para la cliente María Fernández (id_cliente) asignada al instructor Lorena Méndez (id_empleado)
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (2, 2, 5, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (2, 2, 2, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (2, 2, 7, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (2, 2, 5, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (2, 2, 10, 1);

-- Rutina para la cliente Ana Rodríguez (id_cliente) asignada al instructor Esteban Solano (id_empleado)
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (4, 3, 10, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (4, 3, 1, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (4, 3, 9, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (4, 3, 8, 1);
INSERT INTO Rutina (id_cliente, id_empleado, id_maquina, horas) VALUES (4, 3, 3, 1);


----

-- Inserciones para la tabla Historial_Curso
INSERT INTO Historial_Curso (id_membresia, id_curso, horas) VALUES (1, 1, 2); -- Cliente en "Yoga Básico"
INSERT INTO Historial_Curso (id_membresia, id_curso, horas) VALUES (2, 4, 1); -- Cliente en "Cardio Box"
INSERT INTO Historial_Curso (id_membresia, id_curso, horas) VALUES (3, 5, 3); -- Cliente en "Crossfit"
INSERT INTO Historial_Curso (id_membresia, id_curso, horas) VALUES (4, 6, 1); -- Cliente en "Zumba"
INSERT INTO Historial_Curso (id_membresia, id_curso, horas) VALUES (5, 4, 2); -- Cliente en "Cardio Box"


---Procedure para el login
---Procedure usado para el login
CREATE OR REPLACE PROCEDURE obtener_datos_empleado_login (
    p_cedula IN VARCHAR2,
    p_nombre OUT VARCHAR2,
    p_apellido1 OUT VARCHAR2,
    p_apellido2 OUT VARCHAR2,
    p_cedula_out OUT VARCHAR2
) IS
BEGIN
    -- Consulta para obtener los datos del empleado por cédula
    SELECT nombre, apellido1, apellido2, cedula
    INTO p_nombre, p_apellido1, p_apellido2, p_cedula_out
    FROM Empleado
    WHERE cedula = p_cedula;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_nombre := NULL;
        p_apellido1 := NULL;
        p_apellido2 := NULL;
        p_cedula_out := NULL;
        DBMS_OUTPUT.PUT_LINE('No se encontró el empleado con la cédula ' || p_cedula);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Ocurrió un error: ' || SQLERRM);
END obtener_datos_empleado_login;
/


---Procedure usado para login

CREATE OR REPLACE PROCEDURE obtener_datos_cliente_login (
    p_cedula IN VARCHAR2,
    p_nombre OUT VARCHAR2,
    p_apellido1 OUT VARCHAR2,
    p_apellido2 OUT VARCHAR2,
    p_cedula_out OUT VARCHAR2
) IS
BEGIN
    -- Consulta para obtener los datos del cliente por cédula
    SELECT nombre, apellido1, apellido2, cedula
    INTO p_nombre, p_apellido1, p_apellido2, p_cedula_out
    FROM Cliente
    WHERE cedula = p_cedula;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Si no se encuentra un cliente, se asignan valores NULL a los parámetros de salida
        p_nombre := NULL;
        p_apellido1 := NULL;
        p_apellido2 := NULL;
        p_cedula_out := NULL;
        DBMS_OUTPUT.PUT_LINE('No se encontró el cliente con la cédula ' || p_cedula);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Ocurrió un error: ' || SQLERRM);
END obtener_datos_cliente_login;
/



--Procedures para Curso

CREATE OR REPLACE PROCEDURE agregar_curso (
    p_id_instructor IN INT,
    p_descripcion IN VARCHAR2,
    p_horario IN VARCHAR2,
    p_disponibilidad IN VARCHAR2
) AS
BEGIN
    INSERT INTO Curso (id_instructor, descripcion, horario, disponibilidad)
    VALUES (p_id_instructor, p_descripcion, p_horario, p_disponibilidad);
END agregar_curso;
/


CREATE OR REPLACE PROCEDURE obtener_curso_por_id (
    p_id_curso IN INT,
    p_id_instructor OUT INT,
    p_descripcion OUT VARCHAR2,
    p_horario OUT VARCHAR2,
    p_disponibilidad OUT VARCHAR2
) AS
BEGIN
    SELECT id_instructor, descripcion, horario, disponibilidad
    INTO p_id_instructor, p_descripcion, p_horario, p_disponibilidad
    FROM Curso
    WHERE id_curso = p_id_curso;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_id_instructor := NULL;
        p_descripcion := NULL;
        p_horario := NULL;
        p_disponibilidad := NULL;
END obtener_curso_por_id;
/


CREATE OR REPLACE PROCEDURE obtener_todos_los_cursos (
    p_cursos OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursos FOR
        SELECT id_curso, id_instructor, descripcion, horario, disponibilidad
        FROM Curso;
END obtener_todos_los_cursos;
/


CREATE OR REPLACE PROCEDURE actualizar_curso (
    p_id_curso IN INT,
    p_id_instructor IN INT,
    p_descripcion IN VARCHAR2,
    p_horario IN VARCHAR2,
    p_disponibilidad IN VARCHAR2,
    p_filas_afectadas OUT INT
) AS
BEGIN
    UPDATE Curso
    SET id_instructor = p_id_instructor,
        descripcion = p_descripcion,
        horario = p_horario,
        disponibilidad = p_disponibilidad
    WHERE id_curso = p_id_curso;

    p_filas_afectadas := SQL%ROWCOUNT;
END actualizar_curso;
/


CREATE OR REPLACE PROCEDURE eliminar_curso (
    p_id_curso IN INT
) AS
BEGIN
    DELETE FROM Curso WHERE id_curso = p_id_curso;
END eliminar_curso;
/



--Procedures para Gimnasio

CREATE OR REPLACE PROCEDURE agregar_gimnasio (
    p_nombre IN VARCHAR2,
    p_direccion IN VARCHAR2,
    p_email IN VARCHAR2,
    p_horario IN VARCHAR2,
    p_tel_habitacion IN INT,
    p_celular IN INT
) AS
BEGIN
    INSERT INTO Gimnasio (nombre, direccion, email, horario, tel_habitacion, celular)
    VALUES (p_nombre, p_direccion, p_email, p_horario, p_tel_habitacion, p_celular);
END agregar_gimnasio;
/


CREATE OR REPLACE PROCEDURE obtener_gimnasio_por_id (
    p_id_gimnasio IN INT,
    p_nombre OUT VARCHAR2,
    p_direccion OUT VARCHAR2,
    p_email OUT VARCHAR2,
    p_horario OUT VARCHAR2,
    p_tel_habitacion OUT INT,
    p_celular OUT INT
) AS
BEGIN
    SELECT nombre, direccion, email, horario, tel_habitacion, celular
    INTO p_nombre, p_direccion, p_email, p_horario, p_tel_habitacion, p_celular
    FROM Gimnasio
    WHERE id_gimnasio = p_id_gimnasio;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_nombre := NULL;
        p_direccion := NULL;
        p_email := NULL;
        p_horario := NULL;
        p_tel_habitacion := NULL;
        p_celular := NULL;
END obtener_gimnasio_por_id;
/


CREATE OR REPLACE PROCEDURE obtener_todos_los_gimnasios (
    p_gimnasios OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_gimnasios FOR
        SELECT id_gimnasio, nombre, direccion, email, horario, tel_habitacion, celular
        FROM Gimnasio;
END obtener_todos_los_gimnasios;
/


CREATE OR REPLACE PROCEDURE actualizar_gimnasio (
    p_id_gimnasio IN INT,
    p_nombre IN VARCHAR2,
    p_direccion IN VARCHAR2,
    p_email IN VARCHAR2,
    p_horario IN VARCHAR2,
    p_tel_habitacion IN INT,
    p_celular IN INT,
    p_filas_afectadas OUT INT
) AS
BEGIN
    UPDATE Gimnasio
    SET nombre = p_nombre,
        direccion = p_direccion,
        email = p_email,
        horario = p_horario,
        tel_habitacion = p_tel_habitacion,
        celular = p_celular
    WHERE id_gimnasio = p_id_gimnasio;

    p_filas_afectadas := SQL%ROWCOUNT;
END actualizar_gimnasio;
/


CREATE OR REPLACE PROCEDURE eliminar_gimnasio (
    p_id_gimnasio IN INT
) AS
BEGIN
    DELETE FROM Gimnasio WHERE id_gimnasio = p_id_gimnasio;
END eliminar_gimnasio;
/



--Procedures para Curso

CREATE OR REPLACE PROCEDURE agregar_membresia (
    p_id_cliente IN INT,
    p_tipo_membresia IN VARCHAR2,
    p_fecha_inicio IN DATE,
    p_fecha_fin IN DATE,
    p_estado IN VARCHAR2,
    p_monto IN NUMBER
) AS
BEGIN
    INSERT INTO Membresia (id_cliente, tipo_membresia, fecha_inicio, fecha_fin, estado, monto)
    VALUES (p_id_cliente, p_tipo_membresia, p_fecha_inicio, p_fecha_fin, p_estado, p_monto);
END agregar_membresia;
/


CREATE OR REPLACE PROCEDURE obtener_membresia_por_id (
    p_id_membresia IN INT,
    p_id_cliente OUT INT,
    p_tipo_membresia OUT VARCHAR2,
    p_fecha_inicio OUT DATE,
    p_fecha_fin OUT DATE,
    p_estado OUT VARCHAR2,
    p_monto OUT NUMBER
) AS
BEGIN
    SELECT id_cliente, tipo_membresia, fecha_inicio, fecha_fin, estado, monto
    INTO p_id_cliente, p_tipo_membresia, p_fecha_inicio, p_fecha_fin, p_estado, p_monto
    FROM Membresia
    WHERE id_membresia = p_id_membresia;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_id_cliente := NULL;
        p_tipo_membresia := NULL;
        p_fecha_inicio := NULL;
        p_fecha_fin := NULL;
        p_estado := NULL;
        p_monto := NULL;
END obtener_membresia_por_id;
/


CREATE OR REPLACE PROCEDURE eliminar_membresia (
    p_id_membresia IN INT
) AS
BEGIN
    DELETE FROM Membresia WHERE id_membresia = p_id_membresia;
END eliminar_membresia;
/


select * from membresia;


CREATE OR REPLACE PROCEDURE obtener_todas_las_membresias (
    p_membresias OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_membresias FOR
        SELECT m.id_membresia, m.id_cliente, m.tipo_membresia, m.fecha_inicio, m.fecha_fin, m.estado, m.monto,
               c.nombre, c.apellido1, c.apellido2, c.cedula, c.email, c.estado AS cliente_estado,
               c.tel_habitacion, c.celular, c.fecha_registro
        FROM Membresia m
        JOIN Cliente c ON m.id_cliente = c.id_cliente;
END obtener_todas_las_membresias;



CREATE OR REPLACE PROCEDURE actualizar_membresia (
    p_id_membresia IN INT,
    p_id_cliente IN INT,
    p_tipo_membresia IN VARCHAR2,
    p_fecha_inicio IN DATE,
    p_fecha_fin IN DATE,
    p_estado IN VARCHAR2,
    p_monto IN NUMBER,
    p_filas_afectadas OUT INT
) AS
BEGIN
    UPDATE Membresia
    SET id_cliente = p_id_cliente,
        tipo_membresia = p_tipo_membresia,
        fecha_inicio = p_fecha_inicio,
        fecha_fin = p_fecha_fin,
        estado = p_estado,
        monto = p_monto
    WHERE id_membresia = p_id_membresia;

    p_filas_afectadas := SQL%ROWCOUNT;
END actualizar_membresia;
/


CREATE OR REPLACE PROCEDURE eliminar_membresia (
    p_id_membresia IN INT
) AS
BEGIN
    DELETE FROM Membresia WHERE id_membresia = p_id_membresia;
END eliminar_membresia;
/
