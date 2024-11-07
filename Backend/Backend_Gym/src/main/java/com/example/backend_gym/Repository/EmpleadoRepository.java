package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Empleado;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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



    public boolean actualizarEmpleadoPorCedula(Empleado empleado) {
        String sql = "{call actualizar_empleado_por_cedula(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        SqlParameter[] parameters = {
                new SqlParameter(Types.VARCHAR),
                new SqlParameter(Types.VARCHAR),
                new SqlParameter(Types.VARCHAR),
                new SqlParameter(Types.VARCHAR),
                new SqlParameter(Types.VARCHAR),
                new SqlParameter(Types.DATE),
                new SqlParameter(Types.VARCHAR),
                new SqlParameter(Types.VARCHAR),
                new SqlParameter(Types.VARCHAR),
                new SqlOutParameter("p_rows_updated", Types.INTEGER)
        };

        Map<String, Object> result = jdbcTemplate.call(connection -> {
            CallableStatement cs = connection.prepareCall(sql);
            cs.setString(1, empleado.getCedula());
            cs.setString(2, empleado.getNombre());
            cs.setString(3, empleado.getApellido1());
            cs.setString(4, empleado.getApellido2());
            cs.setString(5, String.valueOf(empleado.getTelHabitacion()));
            cs.setDate(6, new java.sql.Date(empleado.getFechaContratacion().getTime()));
            cs.setString(7, empleado.getEmail());
            cs.setString(8, empleado.getRol());
            cs.setString(9, empleado.getEstado());
            cs.registerOutParameter(10, Types.INTEGER);
            return cs;
        }, List.of(parameters));

        Integer rowsUpdated = (Integer) result.get("p_rows_updated");
        return rowsUpdated != null && rowsUpdated > 0;
    }

}