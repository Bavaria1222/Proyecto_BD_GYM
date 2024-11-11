package com.example.backend_gym.DTO.ClienteDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarClienteDTO {
    private String nombre;
    private String apellido1;
    private String apellido2;
    private String cedula;
    private String email;
    private String estado;
    private Integer telHabitacion;
    private Integer celular;
}
