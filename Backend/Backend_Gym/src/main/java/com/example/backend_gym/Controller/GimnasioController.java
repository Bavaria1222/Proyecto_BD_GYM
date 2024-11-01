package com.example.backend_gym.Controller;

import com.example.backend_gym.Entity.Gimnasio;
import com.example.backend_gym.Repository.GimnasioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/api"})
public class GimnasioController {

    @Autowired
    GimnasioRepository gimnasioRepository;

    @GetMapping("Gimnnasio")
    public ResponseEntity<List<Gimnasio>> getGimnasio(){
        return ResponseEntity.ok(gimnasioRepository.findAll());
    }


}