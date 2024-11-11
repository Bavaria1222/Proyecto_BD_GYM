package com.example.backend_gym.Controller;


import com.example.backend_gym.DTO.EmpleadoDto.ActualizarEmpleadoDTO;
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


    @PutMapping("/ActualizarEmpleado/{cedula}")
    public ResponseEntity<String> actualizarEmpleado(
            @PathVariable String cedula,
            @RequestBody ActualizarEmpleadoDTO empleadoDTO) {
        boolean actualizado = empleadoService.actualizarEmpleado(cedula, empleadoDTO);

        if (actualizado) {
            return ResponseEntity.ok("Empleado actualizado correctamente");
        } else {
            return ResponseEntity.status(404).body("Empleado no encontrado");
        }
    }
    @PutMapping("/empleados/{cedula}/{estado}")
    public ResponseEntity<String> actualizarEstadoEmpleado(
            @PathVariable String cedula,
            @PathVariable String estado) {

        if (!estado.equalsIgnoreCase("activo") && !estado.equalsIgnoreCase("inactivo")) {
            return ResponseEntity.badRequest().body("Estado no válido. Use 'activo' o 'inactivo'.");
        }

        boolean actualizado = empleadoService.actualizarEstado(cedula, estado);

        if (actualizado) {
            return ResponseEntity.ok("Estado del empleado actualizado correctamente");
        } else {
            return ResponseEntity.status(404).body("Empleado no encontrado");
        }
    }




}


