package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Cliente;
import com.example.backend_gym.Entity.Membresia;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MembresiaRepository {

    private final JdbcTemplate jdbcTemplate;

    public MembresiaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Crear Membresia
    public void agregarMembresia(Membresia membresia) {
        jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call agregar_membresia(?, ?, ?, ?, ?, ?)}")) {
                callableStatement.setLong(1, membresia.getCliente().getIdCliente());
                callableStatement.setString(2, membresia.getTipoMembresia());
                callableStatement.setDate(3, java.sql.Date.valueOf(membresia.getFechaInicio()));
                callableStatement.setDate(4, java.sql.Date.valueOf(membresia.getFechaFin()));
                callableStatement.setString(5, membresia.getEstado());
                callableStatement.setDouble(6, membresia.getMonto());
                callableStatement.execute();
            }
            return null;
        });
    }

    // Obtener Membresia por ID
    public Membresia obtenerMembresiaPorId(Long id) {
        return jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call obtener_membresia_por_id(?, ?, ?, ?, ?, ?, ?)}")) {
                callableStatement.setLong(1, id);
                callableStatement.registerOutParameter(2, Types.BIGINT); // ID del cliente
                callableStatement.registerOutParameter(3, Types.VARCHAR); // Tipo de membresía
                callableStatement.registerOutParameter(4, Types.DATE); // Fecha inicio
                callableStatement.registerOutParameter(5, Types.DATE); // Fecha fin
                callableStatement.registerOutParameter(6, Types.VARCHAR); // Estado
                callableStatement.registerOutParameter(7, Types.DOUBLE); // Monto
                callableStatement.execute();

                Membresia membresia = new Membresia();
                Cliente cliente = new Cliente();
                cliente.setIdCliente(callableStatement.getLong(2));
                membresia.setCliente(cliente);
                membresia.setIdMembresia(id);
                membresia.setTipoMembresia(callableStatement.getString(3));
                membresia.setFechaInicio(callableStatement.getDate(4).toLocalDate());
                membresia.setFechaFin(callableStatement.getDate(5).toLocalDate());
                membresia.setEstado(callableStatement.getString(6));
                membresia.setMonto(callableStatement.getDouble(7));

                return membresia;
            }
        });
    }

    public List<Membresia> obtenerTodasLasMembresias() {
        return jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call obtener_todas_las_membresias(?)}")) {
                callableStatement.registerOutParameter(1, Types.REF_CURSOR);
                callableStatement.execute();

                List<Membresia> membresias = new ArrayList<>();
                try (ResultSet resultSet = (ResultSet) callableStatement.getObject(1)) {
                    while (resultSet.next()) {
                        Membresia membresia = new Membresia();
                        Cliente cliente = new Cliente();

                        // Asignación de los datos del cliente
                        cliente.setIdCliente(resultSet.getLong("id_cliente"));
                        cliente.setNombre(resultSet.getString("nombre"));
                        cliente.setApellido1(resultSet.getString("apellido1"));
                        cliente.setApellido2(resultSet.getString("apellido2"));
                        cliente.setCedula(resultSet.getString("cedula"));
                        cliente.setEmail(resultSet.getString("email"));
                        cliente.setEstado(resultSet.getString("cliente_estado"));
                        cliente.setTelHabitacion(Integer.valueOf(resultSet.getString("tel_habitacion")));
                        cliente.setCelular(Integer.valueOf(resultSet.getString("celular")));
                        cliente.setFechaRegistro(resultSet.getDate("fecha_registro") != null ? Date.valueOf(resultSet.getDate("fecha_registro").toLocalDate()) : null);

                        membresia.setCliente(cliente);

                        // Asignación de los datos de la membresía
                        membresia.setIdMembresia(resultSet.getLong("id_membresia"));
                        membresia.setTipoMembresia(resultSet.getString("tipo_membresia"));
                        membresia.setFechaInicio(resultSet.getDate("fecha_inicio").toLocalDate());
                        membresia.setFechaFin(resultSet.getDate("fecha_fin").toLocalDate());
                        membresia.setEstado(resultSet.getString("estado"));
                        membresia.setMonto(resultSet.getDouble("monto"));

                        membresias.add(membresia);
                    }
                }
                return membresias;
            }
        });
    }
    // Actualizar Membresia
    public boolean actualizarMembresia(Long id, Membresia membresia) {
        // Parámetro de salida para filas afectadas
        return Boolean.TRUE.equals(jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call actualizar_membresia(?, ?, ?, ?, ?, ?, ?)}")) {
                callableStatement.setLong(1, id);
                callableStatement.setLong(2, membresia.getCliente().getIdCliente());
                callableStatement.setString(3, membresia.getTipoMembresia());
                callableStatement.setDate(4, java.sql.Date.valueOf(membresia.getFechaInicio()));
                callableStatement.setDate(5, java.sql.Date.valueOf(membresia.getFechaFin()));
                callableStatement.setString(6, membresia.getEstado());
                callableStatement.setDouble(7, membresia.getMonto());
                callableStatement.registerOutParameter(8, Types.INTEGER); // Parámetro de salida para filas afectadas
                callableStatement.execute();

                int filasAfectadas = callableStatement.getInt(8);
                return filasAfectadas > 0;
            }
        }));
    }

    // Eliminar Membresia
    public boolean eliminarMembresia(Long id) {
        return Boolean.TRUE.equals(jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call eliminar_membresia(?)}")) {
                callableStatement.setLong(1, id);
                callableStatement.execute();
                return true;
            }
        }));
    }
}
