package com.example.backend_gym.Controller;


import com.example.backend_gym.Entity.Curso;
import com.example.backend_gym.Repository.CursoRepository;
import com.example.backend_gym.Service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @PostMapping("/crear")
    public ResponseEntity<String> agregarCurso(@RequestBody Curso curso) {
        cursoService.agregarCurso(curso);
        return ResponseEntity.ok("Curso agregado correctamente.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> obtenerCursoPorId(@PathVariable Long id) {
        Curso curso = cursoService.obtenerCursoPorId(id);
        return curso != null ? ResponseEntity.ok(curso) : ResponseEntity.notFound().build();
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Curso>> obtenerTodosLosCursos() {
        List<Curso> cursos = cursoService.obtenerTodosLosCursos();
        return ResponseEntity.ok(cursos);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarCurso(@PathVariable Long id, @RequestBody Curso curso) {
        boolean actualizado = cursoService.actualizarCurso(id, curso);
        return actualizado ? ResponseEntity.ok("Curso actualizado correctamente.") : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarCurso(@PathVariable Long id) {
        boolean eliminado = cursoService.eliminarCurso(id);
        return eliminado ? ResponseEntity.ok("Curso eliminado correctamente.") : ResponseEntity.notFound().build();
    }
}
