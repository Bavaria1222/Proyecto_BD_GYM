package com.example.backend_gym.Controller;


import com.example.backend_gym.Entity.Curso;
import com.example.backend_gym.Repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"api"})
public class CursoController {
    @Autowired
    CursoRepository cursoRepository;

    @GetMapping("Curso")
    public ResponseEntity<List<Curso>>getCursos(){return  ResponseEntity.ok(cursoRepository.findAll());}
}
