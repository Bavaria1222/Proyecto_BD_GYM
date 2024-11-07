package com.example.backend_gym.Exception;

public class EmpleadoNotFoundException extends RuntimeException {

    public EmpleadoNotFoundException(String cedula) {
        super("No se encontró un empleado con la cédula: " + cedula);
    }
}
