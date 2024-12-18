package com.example.backend_gym.Repository;

import com.example.backend_gym.DTO.EmpleadoDto.ActualizarEmpleadoDTO;
import com.example.backend_gym.DTO.EmpleadoDto.AgregarEmpleadoDTO;
import com.example.backend_gym.Entity.Empleado;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class EmpleadoRepository {

    private final JdbcTemplate jdbcTemplate;

    public EmpleadoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Empleado> obtenerEmpleados() {
        List<Empleado> empleados = new ArrayList<>();
        jdbcTemplate.execute((Connection connection) -> {
            CallableStatement callableStatement = connection.prepareCall("{call obtener_empleados(?)}");
            callableStatement.registerOutParameter(1, java.sql.Types.REF_CURSOR);
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute();
            ResultSet resultSet = (ResultSet) callableStatement.getObject(1);
            while (resultSet.next()) {
                Empleado empleado = new Empleado();
                empleado.setIdUsuario(resultSet.getLong("id_usuario"));
                empleado.setNombre(resultSet.getString("nombre"));
                empleado.setApellido1(resultSet.getString("apellido1"));
                empleado.setApellido2(resultSet.getString("apellido2"));
                empleado.setCedula(resultSet.getString("cedula"));
                empleado.setTelHabitacion(Integer.valueOf(resultSet.getString("tel_habitacion")));
                empleado.setFechaContratacion(resultSet.getDate("fecha_contratacion"));
                empleado.setEmail(resultSet.getString("email"));
                empleado.setRol(resultSet.getString("rol"));
                empleado.setEstado(resultSet.getString("estado"));
                empleados.add(empleado);
            }
            return null;
        });
        return empleados;
    }


    public Empleado obtenerEmpleadoPorCedula(String cedula) {
        String sql = "SELECT * FROM empleado WHERE cedula = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{cedula}, (resultSet, rowNum) -> {
            Empleado empleado = new Empleado();
            empleado.setIdUsuario(resultSet.getObject("id_usuario") != null ? resultSet.getLong("id_usuario") : null);
            empleado.setNombre(resultSet.getString("nombre"));
            empleado.setApellido1(resultSet.getString("apellido1"));
            empleado.setApellido2(resultSet.getString("apellido2"));
            empleado.setCedula(resultSet.getString("cedula"));
            empleado.setTelHabitacion(Integer.valueOf(resultSet.getString("tel_habitacion")));
            empleado.setFechaContratacion(resultSet.getDate("fecha_contratacion"));
            empleado.setEmail(resultSet.getString("email"));
            empleado.setRol(resultSet.getString("rol"));
            empleado.setEstado(resultSet.getString("estado"));
            return empleado;
        });
    }


    public boolean actualizarEmpleado(String cedula, ActualizarEmpleadoDTO empleadoDTO) {
        String sql = "{call actualizar_empleado_por_cedula(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        return jdbcTemplate.execute((Connection connection) -> {
            CallableStatement callableStatement = connection.prepareCall(sql);
            callableStatement.setString(1, cedula);
            callableStatement.setString(2, empleadoDTO.getNombre());
            callableStatement.setString(3, empleadoDTO.getApellido1());
            callableStatement.setString(4, empleadoDTO.getApellido2());
            callableStatement.setInt(5, empleadoDTO.getTelHabitacion());
            callableStatement.setDate(6, new java.sql.Date(empleadoDTO.getFechaContratacion().getTime()));
            callableStatement.setString(7, empleadoDTO.getEmail());
            callableStatement.setString(8, empleadoDTO.getRol());
            callableStatement.setString(9, empleadoDTO.getEstado());

            // Parámetro de salida para filas afectadas
            callableStatement.registerOutParameter(10, java.sql.Types.INTEGER);

            callableStatement.execute();

            // Obtiene el valor del parámetro de salida
            int filasAfectadas = callableStatement.getInt(10);
            return filasAfectadas > 0;  // Devuelve true si se afectó alguna fila
        });
    }

    public void crearEmpleadoMantenimiento(String cedula, String password) {

        String procedureCall = "{call crear_usuario_mantenimiento(?, ?)}";
        jdbcTemplate.update(connection -> {
            var callableStatement = connection.prepareCall(procedureCall);
            callableStatement.setString(1, cedula);
            callableStatement.setString(2, password);
            return callableStatement;
        });
    }

    public void crearEmpleadoInstructor(String cedula, String password) {
        String procedureCall = "{call crear_usuario_instructor(?, ?)}";
        jdbcTemplate.update(connection -> {
            var callableStatement = connection.prepareCall(procedureCall);
            callableStatement.setString(1, cedula);
            callableStatement.setString(2, password);
            return callableStatement;
        });
    }
    public void agregarEmpleado(AgregarEmpleadoDTO empleadoDTO) {
        // Insertar el empleado en la base de datos utilizando el procedimiento almacenado
        jdbcTemplate.execute((Connection con) -> {
            CallableStatement callableStatement = con.prepareCall("{call agregar_empleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
            callableStatement.setInt(1, 1);
            callableStatement.setString(2, empleadoDTO.getNombre());
            callableStatement.setString(3, empleadoDTO.getApellido1());
            callableStatement.setString(4, empleadoDTO.getApellido2());
            callableStatement.setString(5, empleadoDTO.getCedula());
            callableStatement.setInt(6, empleadoDTO.getTelHabitacion());
            callableStatement.setDate(7, new java.sql.Date(empleadoDTO.getFechaContratacion().getTime()));
            callableStatement.setString(8, empleadoDTO.getEmail());
            callableStatement.setString(9, empleadoDTO.getRol());
            callableStatement.setString(10, empleadoDTO.getEstado());
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute();
            return null;
        });

        // Crear el usuario en Oracle con el rol correspondiente
        if ("mantenimiento".equalsIgnoreCase(empleadoDTO.getRol())) {
            crearEmpleadoMantenimiento(empleadoDTO.getCedula(), empleadoDTO.getPassword());
        } else if ("instructor".equalsIgnoreCase(empleadoDTO.getRol())) {
            crearEmpleadoInstructor(empleadoDTO.getCedula(), empleadoDTO.getPassword());
        }
    }

    public boolean actualizarEstadoEmpleado(String cedula, String estado) {
        String sql = "UPDATE empleado SET estado = ? WHERE cedula = ?";

        int filasAfectadas = jdbcTemplate.update(sql, estado, cedula);
        return filasAfectadas > 0;
    }


}