package com.example.backend_gym.Controller;

import com.example.backend_gym.Entity.Gimnasio;
import com.example.backend_gym.Service.GimnasioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gimnasios")
public class GimnasioController {

    private final GimnasioService gimnasioService;

    public GimnasioController(GimnasioService gimnasioService) {
        this.gimnasioService = gimnasioService;
    }

    @PostMapping("/crear")
    public ResponseEntity<String> agregarGimnasio(@RequestBody Gimnasio gimnasio) {
        gimnasioService.agregarGimnasio(gimnasio);
        return ResponseEntity.ok("Gimnasio agregado correctamente.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gimnasio> obtenerGimnasioPorId(@PathVariable Long id) {
        Gimnasio gimnasio = gimnasioService.obtenerGimnasioPorId(id);
        return gimnasio != null ? ResponseEntity.ok(gimnasio) : ResponseEntity.notFound().build();
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Gimnasio>> obtenerTodosLosGimnasios() {
        List<Gimnasio> gimnasios = gimnasioService.obtenerTodosLosGimnasios();
        return ResponseEntity.ok(gimnasios);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarGimnasio(@PathVariable Long id, @RequestBody Gimnasio gimnasio) {
        boolean actualizado = gimnasioService.actualizarGimnasio(id, gimnasio);
        return actualizado ? ResponseEntity.ok("Gimnasio actualizado correctamente.") : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarGimnasio(@PathVariable Long id) {
        boolean eliminado = gimnasioService.eliminarGimnasio(id);
        return eliminado ? ResponseEntity.ok("Gimnasio eliminado correctamente.") : ResponseEntity.notFound().build();
    }
}
