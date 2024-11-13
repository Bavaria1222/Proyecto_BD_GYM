package com.example.backend_gym.Controller;

import com.example.backend_gym.Entity.HistorialCurso;
import com.example.backend_gym.Repository.HistorialCursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class HistorialCursoController {

    @Autowired
    private HistorialCursoRepository historialCursoRepository;

    // Obtener todos los historiales de curso
    @GetMapping("/ObtenerhistorialCursos")
    public ResponseEntity<List<HistorialCurso>> getAllHistorialCurso() {
        return ResponseEntity.ok(historialCursoRepository.findAll());
    }

    // Guardar un nuevo historial de curso
    @PostMapping("/CrearhistorialCurso")
    public ResponseEntity<HistorialCurso> saveHistorialCurso(@RequestBody HistorialCurso historialCurso) {
        return Optional.ofNullable(historialCurso)
                .filter(h -> h.getMembresia() != null)  // Validar que la membresía no sea nula
                .filter(h -> h.getCurso() != null)  // Validar que el curso no sea nulo
                .map(historialCursoRepository::save)  // Guardar si pasa las validaciones
                .map(ResponseEntity::ok)  // Devolver ResponseEntity con el objeto HistorialCurso
                .orElseGet(() -> ResponseEntity.badRequest().build());  // Si falla, devolver BadRequest (400)
    }

    // Actualizar un historial de curso existente
    @PutMapping("/ActualizarHistorialCurso")
    public ResponseEntity<HistorialCurso> updateHistorialCurso(@RequestBody HistorialCurso historialCurso) {
        return Optional.ofNullable(historialCurso)
                .filter(h -> h.getIdHistorial() != null && historialCursoRepository.existsById(h.getIdHistorial()))  // Verificar ID y existencia
                .filter(h -> h.getMembresia() != null)  // Validar que la membresía no sea nula
                .filter(h -> h.getCurso() != null)  // Validar que el curso no sea nulo
                .map(h -> {
                    // Encontrar el historial de curso y actualizar los datos
                    HistorialCurso existingHistorial = historialCursoRepository.findById(h.getIdHistorial()).orElseThrow();
                    existingHistorial.setMembresia(h.getMembresia());
                    existingHistorial.setCurso(h.getCurso());
                    existingHistorial.setHoras(h.getHoras());
                    existingHistorial.setFecha(h.getFecha());
                    return historialCursoRepository.save(existingHistorial);  // Guardar los cambios
                })
                .map(ResponseEntity::ok)  // Devolver 200 OK si todo está bien
                .orElseThrow(() -> new RuntimeException("Error interno al actualizar"));  // Para generar un error 500
    }

    // Eliminar un historial de curso por ID
    @DeleteMapping("/ElminarhistorialCurso/{id}")
    public ResponseEntity<Void> deleteHistorialCurso(@PathVariable("id") Long id) {
        return Optional.ofNullable(id)
                .filter(historialCursoRepository::existsById)  // Verificar si el ID existe en la base de datos
                .map(existingId -> {
                    historialCursoRepository.deleteById(existingId);  // Si existe, eliminar el historial de curso
                    return ResponseEntity.ok().<Void>build();  // Devolver 200 OK si se eliminó correctamente
                })
                .orElseGet(() -> ResponseEntity.notFound().build());  // Si no existe, devolver 404 Not Found
    }

    // Obtener un historial de curso por ID
    @GetMapping("/ObtenerHistorialCurso/{id}")
    public ResponseEntity<HistorialCurso> getHistorialCurso(@PathVariable("id") Long id) {
        return Optional.ofNullable(id)  // Asegura que el ID no sea nulo
                .flatMap(historialCursoRepository::findById)  // Buscar el historial en la base de datos
                .map(ResponseEntity::ok)  // Si existe, devolver 200 OK con el historial encontrado
                .orElseGet(() -> ResponseEntity.notFound().build());  // Si no existe, devolver 404 Not Found
    }
}
