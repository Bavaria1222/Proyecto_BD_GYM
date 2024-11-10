package com.example.backend_gym.Service;

import com.example.backend_gym.DataSource.DynamicUserContextHolder;
import com.example.backend_gym.Repository.UsuarioOracleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioOracleService {

    @Autowired
    private UsuarioOracleRepository usuarioOracleRepository;

    public String obtenerUsuarioConectado(String username, String password) {
        // Usa las credenciales proporcionadas para conectarse a Oracle
        return usuarioOracleRepository.obtenerUsuarioConectado(username, password);
    }
}
