package com.example.backend_gym.Repository;

import com.example.backend_gym.DTO.ClienteDTO.CrearClienteDTO;
import com.example.backend_gym.Entity.Cliente;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.example.backend_gym.DTO.ClienteDTO.ActualizarClienteDTO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ClienteRepository   {



    private final JdbcTemplate jdbcTemplate;

    public ClienteRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Cliente obtenerDatosClientePorCedulaLogin(String cedula) {
        String sql = "{call obtener_datos_cliente_login(?, ?, ?, ?, ?)}"; // Agregar un parámetro de salida para apellido2

        return jdbcTemplate.execute((Connection connection) -> {
            CallableStatement callableStatement = connection.prepareCall(sql);
            callableStatement.setString(1, cedula);
            callableStatement.registerOutParameter(2, Types.VARCHAR); // p_nombre
            callableStatement.registerOutParameter(3, Types.VARCHAR); // p_apellido1
            callableStatement.registerOutParameter(4, Types.VARCHAR); // p_apellido2
            callableStatement.registerOutParameter(5, Types.VARCHAR); // p_cedula_out
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute();

            // Obtener los valores de salida
            String nombre = callableStatement.getString(2);
            String apellido1 = callableStatement.getString(3);
            String apellido2 = callableStatement.getString(4);
            String cedulaOut = callableStatement.getString(5);

            // Crear el objeto Cliente
            Cliente cliente = new Cliente();
            cliente.setNombre(nombre);
            cliente.setApellido1(apellido1);
            cliente.setApellido2(apellido2);
            cliente.setCedula(cedulaOut);

            return cliente;
        });

    }
    public Cliente obtenerDatosEmpleadoPorCedulaLogin(String cedula) {
        String sql = "{call obtener_datos_empleado_login(?, ?, ?, ?, ?)}"; // Llamada al procedimiento con el nombre correcto

        return jdbcTemplate.execute((Connection connection) -> {
            CallableStatement callableStatement = connection.prepareCall(sql);
            callableStatement.setString(1, cedula); // Parámetro de entrada p_cedula
            callableStatement.registerOutParameter(2, Types.VARCHAR); // Parámetro de salida p_nombre
            callableStatement.registerOutParameter(3, Types.VARCHAR); // Parámetro de salida p_apellido1
            callableStatement.registerOutParameter(4, Types.VARCHAR); // Parámetro de salida p_apellido2
            callableStatement.registerOutParameter(5, Types.VARCHAR); // Parámetro de salida p_cedula_out
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute(); // Ejecuta el procedimiento

            // Recupera los valores de salida después de la ejecución
            String nombre = callableStatement.getString(2);
            String apellido1 = callableStatement.getString(3);
            String apellido2 = callableStatement.getString(4);
            String cedulaOut = callableStatement.getString(5);

            // Crea el objeto Cliente y establece los valores obtenidos
            Cliente cliente = new Cliente();
            cliente.setNombre(nombre);
            cliente.setApellido1(apellido1);
            cliente.setApellido2(apellido2);
            cliente.setCedula(cedulaOut);

            return cliente; // Devuelve el objeto Cliente con los datos obtenidos
        });
    }

    public Cliente obtenerDatosClientePorCedula(String cedula) {
        return jdbcTemplate.execute((Connection connection) -> {
            String sql = "{call obtener_datos_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
            CallableStatement callableStatement = connection.prepareCall(sql);

            // Parámetro de entrada
            callableStatement.setString(1, cedula);

            // Parámetros de salida
            callableStatement.registerOutParameter(2, Types.INTEGER); // p_id_cliente
            callableStatement.registerOutParameter(3, Types.VARCHAR); // p_nombre
            callableStatement.registerOutParameter(4, Types.VARCHAR); // p_apellido1
            callableStatement.registerOutParameter(5, Types.VARCHAR); // p_apellido2
            callableStatement.registerOutParameter(6, Types.VARCHAR); // p_cedula_out
            callableStatement.registerOutParameter(7, Types.VARCHAR); // p_email
            callableStatement.registerOutParameter(8, Types.VARCHAR); // p_estado
            callableStatement.registerOutParameter(9, Types.INTEGER); // p_tel_habitacion
            callableStatement.registerOutParameter(10, Types.INTEGER); // p_celular
            callableStatement.registerOutParameter(11, Types.DATE); // p_fecha_registro
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute();

            // Crear el objeto Cliente y asignar los valores de salida
            Cliente cliente = new Cliente();
            cliente.setIdCliente((long) callableStatement.getInt(2));
            cliente.setNombre(callableStatement.getString(3));
            cliente.setApellido1(callableStatement.getString(4));
            cliente.setApellido2(callableStatement.getString(5));
            cliente.setCedula(callableStatement.getString(6));
            cliente.setEmail(callableStatement.getString(7));
            cliente.setEstado(callableStatement.getString(8));
            cliente.setTelHabitacion(callableStatement.getInt(9));
            cliente.setCelular(callableStatement.getInt(10));
            cliente.setFechaRegistro(callableStatement.getDate(11));

            return cliente;
        });
    }

    public List<Cliente> obtenerClientes() {
        List<Cliente> clientes = new ArrayList<>();

        jdbcTemplate.execute((Connection connection) -> {
            CallableStatement callableStatement = connection.prepareCall("{call obtener_clientes(?)}");
            callableStatement.registerOutParameter(1, java.sql.Types.REF_CURSOR);
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute();
            ResultSet resultSet = (ResultSet) callableStatement.getObject(1);

            while (resultSet.next()) {
                Cliente cliente = new Cliente();
                cliente.setIdCliente(resultSet.getLong("id_cliente"));
                cliente.setNombre(resultSet.getString("nombre"));
                cliente.setApellido1(resultSet.getString("apellido1"));
                cliente.setApellido2(resultSet.getString("apellido2"));
                cliente.setCedula(resultSet.getString("cedula"));
                cliente.setEmail(resultSet.getString("email"));
                cliente.setEstado(resultSet.getString("estado"));
                cliente.setTelHabitacion(resultSet.getInt("tel_habitacion"));
                cliente.setCelular(resultSet.getInt("celular"));
                cliente.setFechaRegistro(resultSet.getDate("fecha_registro"));
                clientes.add(cliente);
            }
            return null;
        });

        return clientes;
    }

    public boolean actualizarCliente(String cedula, ActualizarClienteDTO clienteDTO) {
        String sql = "{call actualizar_cliente_por_cedula(?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        return jdbcTemplate.execute((Connection connection) -> {
            CallableStatement callableStatement = connection.prepareCall(sql);
            callableStatement.setString(1, cedula);
            callableStatement.setString(2, clienteDTO.getNombre());
            callableStatement.setString(3, clienteDTO.getApellido1());
            callableStatement.setString(4, clienteDTO.getApellido2());
            callableStatement.setString(5, clienteDTO.getEmail());
            callableStatement.setString(6, clienteDTO.getEstado());
            callableStatement.setInt(7, clienteDTO.getTelHabitacion() != null ? clienteDTO.getTelHabitacion() : 0);
            callableStatement.setInt(8, clienteDTO.getCelular() != null ? clienteDTO.getCelular() : 0);

            // Parámetro de salida para filas afectadas
            callableStatement.registerOutParameter(9, Types.INTEGER);

            callableStatement.execute();

            // Obtiene el valor del parámetro de salida
            int filasAfectadas = callableStatement.getInt(9);
            return filasAfectadas > 0; // Devuelve true si se afectó alguna fila
        });
    }


    public boolean actualizarEstadoCliente(String cedula, String estado) {
        String sql = "UPDATE cliente SET estado = ? WHERE cedula = ?";

        int filasAfectadas = jdbcTemplate.update(sql, estado, cedula);
        return filasAfectadas > 0;  // Devuelve true si se actualizó al menos una fila
    }

    public void agregarCliente(CrearClienteDTO clienteDTO) {
        jdbcTemplate.execute((Connection con) -> {
            CallableStatement callableStatement = con.prepareCall("{call agregar_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
            callableStatement.setInt(1, 1); // Suponiendo que este es el ID del gimnasio
            callableStatement.setString(2, clienteDTO.getNombre());
            callableStatement.setString(3, clienteDTO.getApellido1());
            callableStatement.setString(4, clienteDTO.getApellido2());
            callableStatement.setString(5, clienteDTO.getCedula());
            callableStatement.setString(6, clienteDTO.getEmail());
            callableStatement.setString(7, clienteDTO.getEstado());
            callableStatement.setInt(8, clienteDTO.getTelHabitacion() != null ? clienteDTO.getTelHabitacion() : 0);
            callableStatement.setInt(9, clienteDTO.getCelular() != null ? clienteDTO.getCelular() : 0);
            callableStatement.setDate(10, new java.sql.Date(clienteDTO.getFechaRegistro().getTime()));
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute(); // Ejecuta el procedimiento
            return null;
        });
    }

    public void crearUsuarioCliente(String cedula, String password) {
        jdbcTemplate.execute((Connection con) -> {
            CallableStatement callableStatement = con.prepareCall("{call crear_cliente(?, ?)}");
            callableStatement.setString(1, cedula);
            callableStatement.setString(2, password);
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute(); // Ejecuta el procedimiento
            return null;
        });
    }


    public boolean agregarClienteYCrearUsuario(CrearClienteDTO clienteDTO, String password) {
        return jdbcTemplate.execute((Connection con) -> {
            // Iniciar la transacción
            con.setAutoCommit(false);
            try {
                // Validar que la cédula no exista en la tabla de empleados
                String query = "SELECT COUNT(*) FROM cliente WHERE cedula = ?";
                try (PreparedStatement preparedStatement = con.prepareStatement(query)) {
                    preparedStatement.setString(1, clienteDTO.getCedula());
                    ResultSet resultSet = preparedStatement.executeQuery();
                    if (resultSet.next() && resultSet.getInt(1) > 0) {
                        return false; // La cédula ya existe en la tabla de empleados
                    }
                }

                // Llamar al procedimiento para agregar el cliente
                CallableStatement callableStatement = con.prepareCall("{call agregar_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
                callableStatement.setInt(1, 1); // Suponiendo que este es el ID del gimnasio
                callableStatement.setString(2, clienteDTO.getNombre());
                callableStatement.setString(3, clienteDTO.getApellido1());
                callableStatement.setString(4, clienteDTO.getApellido2());
                callableStatement.setString(5, clienteDTO.getCedula());
                callableStatement.setString(6, clienteDTO.getEmail());
                callableStatement.setString(7, clienteDTO.getEstado());
                callableStatement.setInt(8, clienteDTO.getTelHabitacion() != null ? clienteDTO.getTelHabitacion() : 0);
                callableStatement.setInt(9, clienteDTO.getCelular() != null ? clienteDTO.getCelular() : 0);
                callableStatement.setDate(10, new java.sql.Date(clienteDTO.getFechaRegistro().getTime()));
                callableStatement.execute(); // Ejecuta el procedimiento para agregar el cliente

                // Llamar al procedimiento para crear el usuario del cliente
                CallableStatement callableStatementUsuario = con.prepareCall("{call crear_cliente(?, ?)}");
                callableStatementUsuario.setString(1, clienteDTO.getCedula());
                callableStatementUsuario.setString(2, password);
                callableStatementUsuario.execute(); // Ejecuta el procedimiento para crear el usuario

                // Confirmar la transacción
                con.commit();
                return true; // Operación exitosa
            } catch (SQLException e) {
                // En caso de error, revertir la transacción
                con.rollback();
                throw e; // Propagar la excepción
            } finally {
                // Restaurar el auto-commit
                con.setAutoCommit(true);
            }
        });
    }

}