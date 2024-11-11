package com.example.backend_gym.Controller;

import com.example.backend_gym.Class.LoginRequest;
import com.example.backend_gym.DTO.ClienteDTO.ClienteDTO;
import com.example.backend_gym.Entity.Cliente;
import com.example.backend_gym.Repository.ClienteRepository;
import com.example.backend_gym.Service.UsuarioOracleService;
import com.example.backend_gym.Service.UsuarioService;
import com.example.backend_gym.DataSource.DynamicUserContextHolder;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioOracleService usuarioOracleService;

    @PostMapping("/login")
    public ResponseEntity<ClienteDTO> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // Verificar si el usuario existe
        if (!usuarioService.verificarUsuario(username)) {
            return ResponseEntity.badRequest().body(null);
        }

        // Validar la contraseña
        if (usuarioService.validarContrasena(username, password)) {
            // Configura el usuario en el contexto inmediatamente después de validarlo
            DynamicUserContextHolder.setCurrentUser(username);
            request.getSession().setAttribute("username", username);

            // Obtener el rol del usuario
            String rol = usuarioService.obtenerPrimerRolGrantee(username);

            // Obtener los datos del cliente o empleado según el rol
            Cliente cliente;
            if (rol.toLowerCase().contains("empleado")) {
                cliente = clienteRepository.obtenerDatosEmpleadoPorCedulaLogin(username);
            } else {
                cliente = clienteRepository.obtenerDatosClientePorCedulaLogin(username);
            }

            // Verificar el usuario conectado a Oracle
            String usuarioConectadoOracle = usuarioOracleService.obtenerUsuarioConectado(username, password);
            System.out.println("Usuario de Oracle conectado: " + usuarioConectadoOracle); // Opcional: muestra el usuario conectado

            // Crear el DTO para devolver la información del cliente y rol
            ClienteDTO clienteDTO = new ClienteDTO(
                    cliente.getNombre(),
                    cliente.getApellido1(),
                    cliente.getApellido2(),
                    cliente.getCedula(),
                    rol
            );

            return ResponseEntity.ok(clienteDTO);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
