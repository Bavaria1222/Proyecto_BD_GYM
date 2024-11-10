package com.example.backend_gym.Controller;

import com.example.backend_gym.Class.LoginRequest;
import com.example.backend_gym.DTO.ClienteDTO.ClienteDTO;
import com.example.backend_gym.Entity.Cliente;
import com.example.backend_gym.Repository.ClienteRepository;
import com.example.backend_gym.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api"})
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/login")
    public ResponseEntity<ClienteDTO> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // Verificar si el usuario existe
        if (!usuarioService.verificarUsuario(username)) {
            return ResponseEntity.badRequest().body(null); // O puedes enviar un mensaje
        }

        // Validar la contraseña
        if (usuarioService.validarContrasena(username, password)) {
            Cliente cliente = clienteRepository.obtenerDatosClientePorCedula(username);

            // Obtener el rol del usuario
            String rol = usuarioService.obtenerPrimerRolGrantee(username);

            // Crear el DTO
            ClienteDTO clienteDTO = new ClienteDTO(
                    cliente.getNombre(),
                    cliente.getApellido1(),
                    cliente.getApellido2(),
                    cliente.getCedula(),
                    rol
            );

            return ResponseEntity.ok(clienteDTO);
        } else {
            return ResponseEntity.badRequest().body(null); // O puedes enviar un mensaje
        }
    }





}
