package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.List;
import java.util.Map;

@Repository
public class ClienteRepository   {

    

    private final JdbcTemplate jdbcTemplate;

    public ClienteRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Cliente obtenerDatosClientePorCedula(String cedula) {
        String sql = "{call obtener_datos_cliente(?, ?, ?, ?, ?)}"; // Agregar un parámetro de salida para apellido2

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
}
