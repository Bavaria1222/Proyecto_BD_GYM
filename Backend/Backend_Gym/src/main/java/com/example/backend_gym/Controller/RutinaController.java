package com.example.backend_gym.Controller;
import com.example.backend_gym.Entity.Rutina;
import com.example.backend_gym.Repository.RutinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RutinaController {

    @Autowired
    RutinaRepository rutinaRepository;

    // Obtener todas las rutinas
    @GetMapping("/ObteneRutinas")
    public ResponseEntity<List<Rutina>> getRutinas() {
        return ResponseEntity.ok(rutinaRepository.findAll());
    }

    // Guardar una nueva rutina
    @PostMapping("/CrearRutina")
    public ResponseEntity<Rutina> saveRutina(@RequestBody Rutina rutina) {
        return Optional.ofNullable(rutina)
                .filter(r -> r.getCliente() != null)  // Validar que el cliente no sea nulo
                .filter(r -> r.getHoras() != null && r.getHoras() > 0)  // Validar que las horas sean positivas
                .map(rutinaRepository::save)  // Guardar si pasa las validaciones
                .map(ResponseEntity::ok)  // Devolver ResponseEntity con el objeto Rutina
                .orElseGet(() -> ResponseEntity.badRequest().build());  // Si falla, devolver BadRequest (400)
    }

    // Actualizar una rutina existente
    @PutMapping("/ActualizarRutina")
    public ResponseEntity<Rutina> updateRutina(@RequestBody Rutina rutina) {
        return Optional.ofNullable(rutina)
                .filter(r -> r.getIdRutina() != null && rutinaRepository.existsById(r.getIdRutina()))  // Verificar ID y existencia
                .filter(r -> r.getCliente() != null)  // Validar que el cliente no sea nulo
                .filter(r -> r.getHoras() != null && r.getHoras() > 0)  // Validar que las horas sean positivas
                .map(r -> {
                    // Encontrar la rutina y actualizar los datos
                    Rutina existingRutina = rutinaRepository.findById(r.getIdRutina()).orElseThrow();
                    existingRutina.setCliente(r.getCliente());
                    existingRutina.setEmpleado(r.getEmpleado());
                    existingRutina.setMaquina(r.getMaquina());
                    existingRutina.setFecha(r.getFecha());
                    existingRutina.setHoras(r.getHoras());
                    return rutinaRepository.save(existingRutina);  // Guardar los cambios
                })
                .map(ResponseEntity::ok)  // Devolver 200 OK si todo está bien
                .orElseThrow(() -> new RuntimeException("Error interno al actualizar"));  // Para generar un error 500
    }

    // Eliminar una rutina por ID
    @DeleteMapping("/ElimarRutina/{id}")
    public ResponseEntity<Void> deleteRutina(@PathVariable("id") Long id) {
        return Optional.ofNullable(id)
                .filter(rutinaRepository::existsById)  // Verificar si el ID existe en la base de datos
                .map(existingId -> {
                    rutinaRepository.deleteById(existingId);  // Si existe, eliminar la rutina
                    return ResponseEntity.ok().<Void>build();  // Devolver 200 OK si se eliminó correctamente
                })
                .orElseGet(() -> ResponseEntity.notFound().build());  // Si no existe, devolver 404 Not Found
    }

    // Obtener una rutina por ID
    @GetMapping("/ObtenerRutina/{id}")
    public ResponseEntity<Rutina> getRutina(@PathVariable("id") Long id) {
        return Optional.ofNullable(id)  // Asegura que el ID no sea nulo
                .flatMap(rutinaRepository::findById)  // Buscar la rutina en la base de datos
                .map(ResponseEntity::ok)  // Si existe, devolver 200 OK con la rutina encontrada
                .orElseGet(() -> ResponseEntity.notFound().build());  // Si no existe, devolver 404 Not Found
    }
}
