package com.example.backend_gym.Controller;


import com.example.backend_gym.Entity.Membresia;
import com.example.backend_gym.Repository.MembresiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/api"})
public class MembresiaController {
    @Autowired
    MembresiaRepository membresiaRepository;

    @GetMapping("Membresia")
    public ResponseEntity<List<Membresia>> getMembresia(){return  ResponseEntity.ok(membresiaRepository.findByEstado("activo"));}
}
