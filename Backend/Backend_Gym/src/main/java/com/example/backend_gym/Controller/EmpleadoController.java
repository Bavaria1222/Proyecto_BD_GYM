package com.example.backend_gym.Controller;


import com.example.backend_gym.Entity.Empleado;
import com.example.backend_gym.Repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/api"})
public class EmpleadoController {

    @Autowired
    EmpleadoRepository empleadoRepository;

    @GetMapping("Empleado")
    public ResponseEntity<List<Empleado>> getEmpleado(){return ResponseEntity.ok(empleadoRepository.findAll()); }
}
