package com.example.backend_gym.DTO.MaquinaDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearMaquinaDTO {
    private String idMaquina;
    private String descripcion;
    private String estado;
}
