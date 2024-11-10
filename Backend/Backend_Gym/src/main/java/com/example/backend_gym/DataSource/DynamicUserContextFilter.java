package com.example.backend_gym.DataSource;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public class DynamicUserContextFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String username = (String) httpRequest.getSession().getAttribute("username");

        if (username != null) {
            // Configura el contexto de usuario en DynamicUserContextHolder
            DynamicUserContextHolder.setCurrentUser(username);
        } else {
            System.out.println("No se encontró usuario en la sesión.");
        }

        try {
            chain.doFilter(request, response);
        } finally {
            DynamicUserContextHolder.clear();
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Método de inicialización (opcional)
    }

    @Override
    public void destroy() {
        // Método de destrucción (opcional)
    }
}
