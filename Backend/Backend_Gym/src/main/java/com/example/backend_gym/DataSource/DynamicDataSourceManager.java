package com.example.backend_gym.DataSource;

import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class DynamicDataSourceManager {

    private final Map<Object, Object> dataSourceCache = new ConcurrentHashMap<>();

    public DataSource createDataSource(String username, String password) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
        dataSource.setUrl("jdbc:oracle:thin:@//localhost:1521/XE");
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSourceCache.put(username, dataSource); // Agrega el DataSource al cache
        return dataSource;
    }
    public DataSource getDataSource(String username) {
        return (DataSource) dataSourceCache.get(username); // Obtiene el DataSource si ya existe
    }
    public Map<Object, Object> getAllDataSources() {
        return dataSourceCache;
    }
}
