package com.example.backend_gym.DTO.EmpleadoDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarEmpleadoDTO {

    private String nombre;
    private String apellido1;
    private String apellido2;
    private Integer telHabitacion;
    private Date fechaContratacion;
    private String email;
    private String rol;
    private String estado;
}
