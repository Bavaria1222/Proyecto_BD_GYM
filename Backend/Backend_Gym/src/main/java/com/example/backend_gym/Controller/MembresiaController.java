package com.example.backend_gym.Controller;

import com.example.backend_gym.Entity.Membresia;
import com.example.backend_gym.Service.MembresiaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membresias")
public class MembresiaController {

    private final MembresiaService membresiaService;

    public MembresiaController(MembresiaService membresiaService) {
        this.membresiaService = membresiaService;
    }

    @PostMapping("/crear")
    public ResponseEntity<String> agregarMembresia(@RequestBody Membresia membresia) {
        membresiaService.agregarMembresia(membresia);
        return ResponseEntity.ok("Membresia agregada correctamente.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Membresia> obtenerMembresiaPorId(@PathVariable Long id) {
        Membresia membresia = membresiaService.obtenerMembresiaPorId(id);
        return membresia != null ? ResponseEntity.ok(membresia) : ResponseEntity.notFound().build();
    }

    @GetMapping("/todas")
    public ResponseEntity<List<Membresia>> obtenerTodasLasMembresias() {
        List<Membresia> membresias = membresiaService.obtenerTodasLasMembresias();
        return ResponseEntity.ok(membresias);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarMembresia(@PathVariable Long id, @RequestBody Membresia membresia) {
        boolean actualizado = membresiaService.actualizarMembresia(id, membresia);
        return actualizado ? ResponseEntity.ok("Membresia actualizada correctamente.") : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarMembresia(@PathVariable Long id) {
        boolean eliminado = membresiaService.eliminarMembresia(id);
        return eliminado ? ResponseEntity.ok("Membresia eliminada correctamente.") : ResponseEntity.notFound().build();
    }
}
