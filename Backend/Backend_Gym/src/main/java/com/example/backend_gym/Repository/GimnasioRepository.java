package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Gimnasio;
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
public class GimnasioRepository {

    private final JdbcTemplate jdbcTemplate;

    public GimnasioRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Crear Gimnasio
    public void agregarGimnasio(Gimnasio gimnasio) {
        jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call agregar_gimnasio(?, ?, ?, ?, ?, ?)}")) {
                callableStatement.setString(1, gimnasio.getNombre());
                callableStatement.setString(2, gimnasio.getDireccion());
                callableStatement.setString(3, gimnasio.getEmail());
                callableStatement.setString(4, gimnasio.getHorario());
                callableStatement.setInt(5, gimnasio.getTelHabitacion() != null ? gimnasio.getTelHabitacion() : 0);
                callableStatement.setInt(6, gimnasio.getCelular() != null ? gimnasio.getCelular() : 0);
                callableStatement.execute();
            }
            return null;
        });
    }

    // Obtener Gimnasio por ID
    public Gimnasio obtenerGimnasioPorId(Long id) {
        return jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call obtener_gimnasio_por_id(?, ?, ?, ?, ?, ?, ?)}")) {
                callableStatement.setLong(1, id);
                callableStatement.registerOutParameter(2, Types.VARCHAR); // Nombre
                callableStatement.registerOutParameter(3, Types.VARCHAR); // Dirección
                callableStatement.registerOutParameter(4, Types.VARCHAR); // Email
                callableStatement.registerOutParameter(5, Types.VARCHAR); // Horario
                callableStatement.registerOutParameter(6, Types.INTEGER); // Teléfono habitación
                callableStatement.registerOutParameter(7, Types.INTEGER); // Celular
                callableStatement.execute();

                Gimnasio gimnasio = new Gimnasio();
                gimnasio.setIdGimnasio(id);
                gimnasio.setNombre(callableStatement.getString(2));
                gimnasio.setDireccion(callableStatement.getString(3));
                gimnasio.setEmail(callableStatement.getString(4));
                gimnasio.setHorario(callableStatement.getString(5));
                gimnasio.setTelHabitacion(callableStatement.getInt(6));
                gimnasio.setCelular(callableStatement.getInt(7));

                return gimnasio;
            }
        });
    }

    // Obtener todos los gimnasios
    public List<Gimnasio> obtenerTodosLosGimnasios() {
        return jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call obtener_todos_los_gimnasios(?)}")) {
                callableStatement.registerOutParameter(1, Types.REF_CURSOR);
                callableStatement.execute();

                List<Gimnasio> gimnasios = new ArrayList<>();
                try (ResultSet resultSet = (ResultSet) callableStatement.getObject(1)) {
                    while (resultSet.next()) {
                        Gimnasio gimnasio = new Gimnasio();
                        gimnasio.setIdGimnasio(resultSet.getLong("id_gimnasio"));
                        gimnasio.setNombre(resultSet.getString("nombre"));
                        gimnasio.setDireccion(resultSet.getString("direccion"));
                        gimnasio.setEmail(resultSet.getString("email"));
                        gimnasio.setHorario(resultSet.getString("horario"));
                        gimnasio.setTelHabitacion(resultSet.getInt("tel_habitacion"));
                        gimnasio.setCelular(resultSet.getInt("celular"));
                        gimnasios.add(gimnasio);
                    }
                }
                return gimnasios;
            }
        });
    }

    // Actualizar Gimnasio
    public boolean actualizarGimnasio(Long id, Gimnasio gimnasio) {
        // Parámetro de salida para filas afectadas
        return Boolean.TRUE.equals(jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call actualizar_gimnasio(?, ?, ?, ?, ?, ?, ?)}")) {
                callableStatement.setLong(1, id);
                callableStatement.setString(2, gimnasio.getNombre());
                callableStatement.setString(3, gimnasio.getDireccion());
                callableStatement.setString(4, gimnasio.getEmail());
                callableStatement.setString(5, gimnasio.getHorario());
                callableStatement.setInt(6, gimnasio.getTelHabitacion() != null ? gimnasio.getTelHabitacion() : 0);
                callableStatement.setInt(7, gimnasio.getCelular() != null ? gimnasio.getCelular() : 0);
                callableStatement.registerOutParameter(8, Types.INTEGER); // Parámetro de salida para filas afectadas
                callableStatement.execute();

                int filasAfectadas = callableStatement.getInt(8);
                return filasAfectadas > 0;
            }
        }));
    }

    // Eliminar Gimnasio
    public boolean eliminarGimnasio(Long id) {
        return Boolean.TRUE.equals(jdbcTemplate.execute((Connection con) -> {
            try (CallableStatement callableStatement = con.prepareCall("{call eliminar_gimnasio(?)}")) {
                callableStatement.setLong(1, id);
                callableStatement.execute();
                return true;
            }
        }));
    }
}
