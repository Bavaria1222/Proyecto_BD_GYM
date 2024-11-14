package com.example.backend_gym.Controller;
import com.example.backend_gym.Entity.Maquina;
import com.example.backend_gym.Repository.MaquinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MaquinaController {

    @Autowired
    MaquinaRepository maquinaRepository;

    // Obtener todas las máquinas
    @GetMapping("/ObtenerMaquinas")
    public ResponseEntity<List<Maquina>> getMaquinas() {
        return ResponseEntity.ok(maquinaRepository.findAll());
    }

    // Guardar una nueva máquina
    @PostMapping("/CrearMaquina")
    public ResponseEntity<Maquina> saveMaquina(@RequestBody Maquina maquina) {
        return Optional.ofNullable(maquina)
                .filter(m -> m.getNombre() != null && !m.getNombre().isEmpty())  // Validar que el nombre no esté vacío
                .filter(m -> m.getDescripcion() != null && !m.getDescripcion().isEmpty())  // Validar que la descripción no esté vacía
                .map(maquinaRepository::save)  // Guardar si pasa las validaciones
                .map(ResponseEntity::ok)  // Devolver ResponseEntity con el objeto Maquina
                .orElseGet(() -> ResponseEntity.badRequest().build());  // Si falla, devolver un ResponseEntity vacío con BadRequest (400)
    }

    // Actualizar una máquina existente
    @PutMapping("/ActualizarMaquina")
    public ResponseEntity<Maquina> updateMaquina(@RequestBody Maquina maquina) {
        return Optional.ofNullable(maquina)
                .filter(m -> m.getIdMaquina() != null && maquinaRepository.existsById(m.getIdMaquina()))  // Verificar ID no nulo y si existe
                .filter(m -> m.getNombre() != null && !m.getNombre().isEmpty())  // Validar que el nombre no esté vacío
                .filter(m -> m.getDescripcion() != null && !m.getDescripcion().isEmpty())  // Validar que la descripción no esté vacía
                .map(m -> {
                    // Encontrar la máquina y actualizar los datos
                    Maquina existingMaquina = maquinaRepository.findById(m.getIdMaquina()).orElseThrow();
                    existingMaquina.setNombre(m.getNombre());
                    existingMaquina.setDescripcion(m.getDescripcion());
                    existingMaquina.setEstado(m.getEstado());
                    return maquinaRepository.save(existingMaquina);  // Guardar los cambios
                })
                .map(ResponseEntity::ok)  // Devolver 200 OK si todo está bien
                .orElseThrow(() -> new RuntimeException("Error interno al actualizar"));  // Para generar un error 500
    }

    // Eliminar una máquina por ID
    @DeleteMapping("/BorrarMaquina/{id}")
    public ResponseEntity<Void> deleteMaquina(@PathVariable("id") Long id) {
        return Optional.ofNullable(id)
                .filter(maquinaRepository::existsById)  // Verificar si el ID existe en la base de datos
                .map(existingId -> {
                    maquinaRepository.deleteById(existingId);  // Si existe, eliminar la máquina
                    return ResponseEntity.ok().<Void>build();  // Devolver 200 OK si se eliminó correctamente
                })
                .orElseGet(() -> ResponseEntity.notFound().build());  // Si no existe, devolver 404 Not Found
    }

    // Obtener una máquina por ID
    @GetMapping("/ObtenerMaquina/{id}")
    public ResponseEntity<Maquina> getMaquina(@PathVariable("id") Long id) {
        return Optional.ofNullable(id)  // Asegura que el ID no sea nulo
                .flatMap(maquinaRepository::findById)  // Buscar la máquina en la base de datos
                .map(ResponseEntity::ok)  // Si existe, devolver 200 OK con la máquina encontrada
                .orElseGet(() -> ResponseEntity.notFound().build());  // Si no existe, devolver 404 Not Found
    }
}
