package com.example.backend_gym.Controller;


import com.example.backend_gym.Entity.Empleado;
import com.example.backend_gym.Exception.EmpleadoNotFoundException;
import com.example.backend_gym.Repository.EmpleadoRepository;
import com.example.backend_gym.Service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping({"/api"})
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;
    @Autowired
    private EmpleadoService empleadoService;

    @PostMapping("/agregar")
    public void agregarEmpleado(@RequestParam int idGimnasio,
                                @RequestParam String nombre,
                                @RequestParam String apellido1,
                                @RequestParam String apellido2,
                                @RequestParam String cedula,
                                @RequestParam int telHabitacion,
                                @RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") Date fechaContratacion,
                                @RequestParam String email,
                                @RequestParam String rol,
                                @RequestParam String estado) {
        empleadoService.agregarEmpleado(idGimnasio, nombre, apellido1, apellido2, cedula, telHabitacion, fechaContratacion, email, rol, estado);
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
}


