package com.example.backend_gym.Controller;


import com.example.backend_gym.Entity.Cliente;
import com.example.backend_gym.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend_gym.DTO.ClienteDTO.ClienteDTO;


@RestController
@RequestMapping({"/api"})
public class ClienteController {
    @Autowired
    ClienteRepository clienteRepository;

    @GetMapping("/{cedula}")
    public ResponseEntity<ClienteDTO> obtenerClientePorCedula(@PathVariable String cedula) {
        Cliente cliente = clienteRepository.obtenerDatosClientePorCedula(cedula);

        if (cliente == null) {
            return ResponseEntity.notFound().build(); // Retorna 404 si no se encuentra el cliente
        }

        // Crear ClienteDTO a partir de Cliente
        ClienteDTO clienteDTO = new ClienteDTO(cliente.getNombre(), cliente.getApellido1(), cliente.getApellido2(), cliente.getCedula(),"");

        return ResponseEntity.ok(clienteDTO); // Retorna 200 OK con el clienteDTO
    }

}
