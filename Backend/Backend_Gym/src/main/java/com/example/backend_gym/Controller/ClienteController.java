package com.example.backend_gym.Controller;


import com.example.backend_gym.DTO.ClienteDTO.ActualizarClienteDTO;
import com.example.backend_gym.DTO.ClienteDTO.CrearClienteDTO;
import com.example.backend_gym.Entity.Cliente;
import com.example.backend_gym.Repository.ClienteRepository;
import com.example.backend_gym.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend_gym.DTO.ClienteDTO.ClienteDTO;

import java.util.List;


@RestController
@RequestMapping({"/api"})
public class ClienteController {
    @Autowired
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/obtenerClienteId")
    public ResponseEntity<Cliente> obtenerDatosCliente(@RequestParam String cedula) {
        Cliente cliente = clienteService.obtenerDatosClientePorCedula(cedula);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }
    @GetMapping("/clientes")
    public ResponseEntity<List<Cliente>> obtenerClientes() {
        List<Cliente> clientes = clienteService.obtenerTodosLosClientes();
        return ResponseEntity.ok(clientes);
    }

    @PutMapping("/ActualizarCliente/{cedula}")
    public ResponseEntity<String> actualizarCliente(
            @PathVariable String cedula,
            @RequestBody ActualizarClienteDTO clienteDTO) {
        boolean actualizado = clienteService.actualizarCliente(cedula, clienteDTO);

        if (actualizado) {
            return ResponseEntity.ok("Cliente actualizado correctamente");
        } else {
            return ResponseEntity.status(404).body("Cliente no encontrado");
        }
    }

    @PutMapping("/actualizarEstado/{cedula}/{estado}")
    public ResponseEntity<String> actualizarEstadoCliente(
            @PathVariable String cedula,
            @RequestParam String estado) {

        boolean actualizado = clienteService.actualizarEstadoCliente(cedula, estado);

        if (actualizado) {
            return ResponseEntity.ok("Estado del cliente actualizado correctamente.");
        } else {
            return ResponseEntity.status(404).body("Cliente no encontrado.");
        }
    }
    @PostMapping("/registrarCliente")
    public ResponseEntity<String> agregarCliente(@RequestBody CrearClienteDTO clienteDT0) {
        boolean clienteAgregado = clienteService.agregarClienteYCrearUsuario(clienteDT0, clienteDT0.getPassword());

        if (clienteAgregado) {
            return ResponseEntity.ok("Cliente agregado correctamente y usuario creado.");
        } else {
            return ResponseEntity.status(400).body("La cédula ya existe en la tabla de empleados.");
        }
    }


}
