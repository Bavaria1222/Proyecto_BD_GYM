package com.example.backend_gym.Controller;


import com.example.backend_gym.DTO.EmpleadoDto.AgregarEmpleadoDTO;
import com.example.backend_gym.Entity.Empleado;
import com.example.backend_gym.Exception.EmpleadoNotFoundException;
import com.example.backend_gym.Repository.EmpleadoRepository;
import com.example.backend_gym.Service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api"})
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;
    @Autowired
    private EmpleadoService empleadoService;

    @PostMapping("/agregarEmpleado")
    public ResponseEntity<String> agregarEmpleado(@RequestBody AgregarEmpleadoDTO empleadoDTO) {
        // Validar el campo "estado"
        String rol = empleadoDTO.getRol();
        if (!"mantenimiento".equalsIgnoreCase(rol) && !"instructor".equalsIgnoreCase(rol)) {
            return ResponseEntity.badRequest().body("Error: El rol debe ser 'mantenimiento' o 'instructor'.");
        }

        try {
            empleadoService.agregarEmpleado(empleadoDTO);
            return ResponseEntity.ok("Empleado agregado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al agregar el empleado: " + e.getMessage());
        }
    }

    @GetMapping("/empleados")
    public List<Empleado> getEmpleados() {
        return empleadoService.obtenerEmpleados();
    }
    @GetMapping("/cedula/{cedula}")
    public Empleado getEmpleadoPorCedula(@PathVariable String cedula) {
        return empleadoService.obtenerEmpleadoPorCedula(cedula);
    }


    @PutMapping("/actualizar-por-cedula")
    public ResponseEntity<?> actualizarEmpleadoPorCedula(@RequestBody Empleado empleado) {
        try {
            empleadoService.actualizarEmpleadoPorCedula(empleado);
            return ResponseEntity.ok("Empleado actualizado correctamente.");
        } catch (EmpleadoNotFoundException e) {
            // Esta excepción será manejada por el GlobalExceptionHandler
            throw e;
        } catch (Exception e) {
            // Loguear el error para debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar el empleado: " + e.getMessage());
        }
    }

    @PostMapping("/crear/mantenimiento")
    public ResponseEntity<String> crearEmpleadoMantenimiento(@RequestParam String cedula, @RequestParam String password) {
        try {
            empleadoRepository.crearEmpleadoMantenimiento(cedula, password);
            return ResponseEntity.ok("Usuario de mantenimiento creado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al crear el usuario: " + e.getMessage());
        }
    }
}


