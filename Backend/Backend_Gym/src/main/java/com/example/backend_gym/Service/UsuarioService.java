package com.example.backend_gym.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.sql.*;

@Service
public class UsuarioService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Value("${spring.datasource.url}")
    private String jdbcUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    public boolean verificarUsuario(String username) {
        // Captura el valor de salida
        // Devuelve true si el usuario existe, false si no existe
        return Boolean.TRUE.equals(jdbcTemplate.execute((Connection con) -> {
            CallableStatement callableStatement = con.prepareCall("{call verificar_usuario(?, ?)}");
            callableStatement.setString(1, username);
            callableStatement.registerOutParameter(2, Types.NUMERIC);
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute();
            int resultado = callableStatement.getInt(2);
            return resultado == 1;
        }));
    }

    public String obtenerPrimerRolGrantee(String grantee) {
        return jdbcTemplate.execute((Connection con) -> {
            CallableStatement callableStatement = con.prepareCall("{call obtener_roles_grantee(?, ?)}");
            callableStatement.setString(1, grantee);
            callableStatement.registerOutParameter(2, Types.VARCHAR);
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute();
            return callableStatement.getString(2);
        });
    }
    public boolean validarContrasena(String username, String password) {
        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
            return true;
        } catch (SQLException e) {
            return false;
        }
    }





}
