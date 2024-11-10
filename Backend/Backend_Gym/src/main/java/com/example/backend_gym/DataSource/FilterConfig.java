package com.example.backend_gym.DataSource;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<DynamicUserContextFilter> dynamicUserContextFilter() {
        FilterRegistrationBean<DynamicUserContextFilter> registrationBean = new FilterRegistrationBean<>();

        // Instancia el filtro y lo registra
        registrationBean.setFilter(new DynamicUserContextFilter());

        // Aplica el filtro a todas las URLs
        registrationBean.addUrlPatterns("/*");

        // Configura el orden de prioridad del filtro si tienes más filtros
        registrationBean.setOrder(1);

        return registrationBean;
    }
}
