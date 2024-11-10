package com.example.backend_gym.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;

@Configuration
public class JdbcTemplateConfig {

    private final DataSource dataSource;

    public JdbcTemplateConfig(DataSource dataSource) {
        this.dataSource = dataSource; // Injecta el UserRoutingDataSource configurado
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource);
    }
}
