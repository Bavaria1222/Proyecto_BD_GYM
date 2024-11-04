package com.example.backend_gym.Controller;


import com.example.backend_gym.Entity.Cliente;
import com.example.backend_gym.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/api"})
public class ClienteController {
    @Autowired
    ClienteRepository clienteRepository;

    @GetMapping ("Cliente")
    public ResponseEntity<List<Cliente>> getCliente() {
        return ResponseEntity.ok(clienteRepository.findAll());
    }
}
