package com.example.backend_gym.Controller;

import com.example.backend_gym.Service.UsuarioOracleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UsuarioOracleController {

    @Autowired
    private UsuarioOracleService usuarioOracleService;

}
