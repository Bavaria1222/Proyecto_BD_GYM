package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Curso;
import com.example.backend_gym.Entity.Empleado;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CursoRepository {

    private final JdbcTemplate jdbcTemplate;

    public CursoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Crear Curso
    public void agregarCurso(Curso curso) {
        jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call agregar_curso(?, ?, ?, ?)}")) {
                callableStatement.setLong(1, curso.getInstructor().getIdUsuario()); // ID del instructor
                callableStatement.setString(2, curso.getDescripcion());
                callableStatement.setString(3, curso.getHorario());
                callableStatement.setString(4, curso.getDisponibilidad());
                callableStatement.execute(); // Ejecuta el procedimiento
            }
            return null;
        });
    }

    // Obtener Curso por ID
    public Curso obtenerCursoPorId(Long id) {
        return jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call obtener_curso_por_id(?, ?, ?, ?, ?)}")) {
                callableStatement.setLong(1, id); // ID del curso
                callableStatement.registerOutParameter(2, Types.BIGINT); // ID del instructor
                callableStatement.registerOutParameter(3, Types.VARCHAR); // Descripción
                callableStatement.registerOutParameter(4, Types.VARCHAR); // Horario
                callableStatement.registerOutParameter(5, Types.VARCHAR); // Disponibilidad
                callableStatement.execute();

                Curso curso = new Curso();
                Empleado instructor = new Empleado();
                instructor.setIdUsuario(callableStatement.getLong(2));
                curso.setInstructor(instructor);
                curso.setIdCurso(id);
                curso.setDescripcion(callableStatement.getString(3));
                curso.setHorario(callableStatement.getString(4));
                curso.setDisponibilidad(callableStatement.getString(5));

                return curso;
            }
        });
    }

    // Obtener todos los cursos
    public List<Curso> obtenerTodosLosCursos() {
        return jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call obtener_todos_los_cursos(?)}")) {
                callableStatement.registerOutParameter(1, Types.REF_CURSOR);
                callableStatement.execute();

                List<Curso> cursos = new ArrayList<>();
                try (ResultSet resultSet = (ResultSet) callableStatement.getObject(1)) {
                    while (resultSet.next()) {
                        Curso curso = new Curso();
                        Empleado instructor = new Empleado();
                        instructor.setIdUsuario(resultSet.getLong("id_instructor"));
                        curso.setInstructor(instructor);
                        curso.setIdCurso(resultSet.getLong("id_curso"));
                        curso.setDescripcion(resultSet.getString("descripcion"));
                        curso.setHorario(resultSet.getString("horario"));
                        curso.setDisponibilidad(resultSet.getString("disponibilidad"));
                        cursos.add(curso);
                    }
                }
                return cursos;
            }
        });
    }

    // Actualizar Curso
    public boolean actualizarCurso(Long id, Curso curso) {
        // ID del instructor
        // Parámetro de salida para filas afectadas
        return Boolean.TRUE.equals(jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call actualizar_curso(?, ?, ?, ?, ?, ?)}")) {
                callableStatement.setLong(1, id);
                callableStatement.setLong(2, curso.getInstructor().getIdUsuario()); // ID del instructor
                callableStatement.setString(3, curso.getDescripcion());
                callableStatement.setString(4, curso.getHorario());
                callableStatement.setString(5, curso.getDisponibilidad());
                callableStatement.registerOutParameter(6, Types.INTEGER); // Parámetro de salida para filas afectadas
                callableStatement.execute();

                int filasAfectadas = callableStatement.getInt(6);
                return filasAfectadas > 0;
            }
        }));
    }

    // Eliminar Curso
    public boolean eliminarCurso(Long id) {
        return Boolean.TRUE.equals(jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call eliminar_curso(?)}")) {
                callableStatement.setLong(1, id);
                callableStatement.execute();
                return true;
            }
        }));
    }
}
