package com.example.backend_gym.Service;

import com.example.backend_gym.DTO.ClienteDTO.ActualizarClienteDTO;
import com.example.backend_gym.DTO.ClienteDTO.CrearClienteDTO;
import com.example.backend_gym.Entity.Cliente;
import com.example.backend_gym.Repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente obtenerDatosClientePorCedula(String cedula) {
        return clienteRepository.obtenerDatosClientePorCedula(cedula);
    }
    public List<Cliente> obtenerTodosLosClientes() {
        return clienteRepository.obtenerClientes();
    }
    public boolean actualizarCliente(String cedula, ActualizarClienteDTO clienteDTO) {
        return clienteRepository.actualizarCliente(cedula, clienteDTO);
    }
    public boolean actualizarEstadoCliente(String cedula, String estado) {
        return clienteRepository.actualizarEstadoCliente(cedula, estado);
    }
    public void agregarCliente(CrearClienteDTO clienteDTO) {
        clienteRepository.agregarCliente(clienteDTO);
    }

    public  void agregarClienteConUsuario(CrearClienteDTO clienteDTO) {

        clienteRepository.agregarCliente(clienteDTO);


        clienteRepository.crearUsuarioCliente(clienteDTO.getCedula(), clienteDTO.getPassword());
    }


    public boolean agregarClienteYCrearUsuario(CrearClienteDTO clienteDTO, String password) {
        return clienteRepository.agregarClienteYCrearUsuario(clienteDTO, password);
    }
}