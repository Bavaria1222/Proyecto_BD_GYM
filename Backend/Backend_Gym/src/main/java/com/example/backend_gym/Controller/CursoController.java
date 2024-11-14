package com.example.backend_gym.Controller;

import com.example.backend_gym.Entity.Curso;
import com.example.backend_gym.Repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CursoController {

    @Autowired
    CursoRepository cursoRepository;

    // Obtener todos los cursos
    @GetMapping("/ObtenerCursos")
    public ResponseEntity<List<Curso>> getCursos() {
        return ResponseEntity.ok(cursoRepository.findAll());
    }

    // Guardar un nuevo curso
    @PostMapping("/CrearCurso")
    public ResponseEntity<Curso> saveCurso(@RequestBody Curso curso) {
        return Optional.ofNullable(curso)
                .filter(c -> c.getInstructor() != null)  // Validar que el instructor no sea nulo
                .filter(c -> c.getDescripcion() != null && !c.getDescripcion().isEmpty())  // Validar que la descripción no esté vacía
                .map(cursoRepository::save)  // Guardar si pasa las validaciones
                .map(ResponseEntity::ok)  // Devolver ResponseEntity con el objeto Curso
                .orElseGet(() -> ResponseEntity.badRequest().build());  // Si falla, devolver BadRequest (400)
    }

    // Actualizar un curso existente
    @PutMapping("/ActualizarCurso")
    public ResponseEntity<Curso> updateCurso(@RequestBody Curso curso) {
        return Optional.ofNullable(curso)
                .filter(c -> c.getIdCurso() != null && cursoRepository.existsById(c.getIdCurso()))  // Verificar ID y existencia
                .map(c -> {
                    // Encontrar el curso y actualizar los datos
                    Curso existingCurso = cursoRepository.findById(c.getIdCurso()).orElseThrow();
                    existingCurso.setInstructor(c.getInstructor());
                    existingCurso.setDescripcion(c.getDescripcion());
                    existingCurso.setHorario(c.getHorario());
                    existingCurso.setDisponibilidad(c.getDisponibilidad());
                    return cursoRepository.save(existingCurso);  // Guardar los cambios
                })
                .map(ResponseEntity::ok)  // Devolver 200 OK si todo está bien
                .orElseThrow(() -> new RuntimeException("Error interno al actualizar"));  // Para generar un error 500
    }

    // Eliminar un curso por ID
    @DeleteMapping("/EliminarCurso/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable("id") Long id) {
        return Optional.ofNullable(id)
                .filter(cursoRepository::existsById)  // Verificar si el ID existe en la base de datos
                .map(existingId -> {
                    cursoRepository.deleteById(existingId);  // Si existe, eliminar el curso
                    return ResponseEntity.ok().<Void>build();  // Devolver 200 OK si se eliminó correctamente
                })
                .orElseGet(() -> ResponseEntity.notFound().build());  // Si no existe, devolver 404 Not Found
    }

    // Obtener un curso por ID
    @GetMapping("/ObtenerCurso/{id}")
    public ResponseEntity<Curso> getCurso(@PathVariable("id") Long id) {
        return Optional.ofNullable(id)  // Asegura que el ID no sea nulo
                .flatMap(cursoRepository::findById)  // Buscar el curso en la base de datos
                .map(ResponseEntity::ok)  // Si existe, devolver 200 OK con el curso encontrado
                .orElseGet(() -> ResponseEntity.notFound().build());  // Si no existe, devolver 404 Not Found
    }
}
