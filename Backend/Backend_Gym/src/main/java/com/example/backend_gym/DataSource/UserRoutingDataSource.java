package com.example.backend_gym.DataSource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class UserRoutingDataSource extends AbstractRoutingDataSource  {
    @Override
    protected Object determineCurrentLookupKey() {
        String currentUser = DynamicUserContextHolder.getCurrentUser();
        System.out.println("UserRoutingDataSource - Usuario actual en el contexto: " + currentUser);
        // Si no hay un usuario en el contexto, utiliza el DataSource predeterminado
        return currentUser != null ? currentUser : "system";
    }
}
