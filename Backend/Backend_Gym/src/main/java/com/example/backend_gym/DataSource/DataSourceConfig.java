package com.example.backend_gym.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    private final DynamicDataSourceManager dynamicDataSourceManager;

    public DataSourceConfig(DynamicDataSourceManager dynamicDataSourceManager) {
        this.dynamicDataSourceManager = dynamicDataSourceManager;
    }

    @Bean
    public DataSource dataSource() {
        // Crea el UserRoutingDataSource y asigna el cache de DataSources de DynamicDataSourceManager
        UserRoutingDataSource routingDataSource = new UserRoutingDataSource();
        routingDataSource.setTargetDataSources(dynamicDataSourceManager.getAllDataSources());

        // Opcional: Configura un DataSource predeterminado para situaciones sin usuario autenticado
        routingDataSource.setDefaultTargetDataSource(dynamicDataSourceManager.createDataSource("system", "system"));

        return routingDataSource;
    }
}
