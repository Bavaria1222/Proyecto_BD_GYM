package com.example.backend_gym.Repository;

import com.example.backend_gym.DataSource.DynamicDataSourceManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class UsuarioOracleRepository {

    private final DynamicDataSourceManager dynamicDataSourceManager;

    @Autowired
    public UsuarioOracleRepository(DynamicDataSourceManager dynamicDataSourceManager) {
        this.dynamicDataSourceManager = dynamicDataSourceManager;
    }

    public String obtenerUsuarioConectado(String username, String password) {
        // Crea o recupera un DataSource usando DynamicDataSourceManager
        DataSource dataSource = dynamicDataSourceManager.createDataSource(username, password);
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        String sql = "SELECT USER FROM dual";
        return jdbcTemplate.queryForObject(sql, String.class);
    }
}
