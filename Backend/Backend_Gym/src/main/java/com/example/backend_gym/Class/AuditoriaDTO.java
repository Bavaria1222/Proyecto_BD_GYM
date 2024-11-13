package com.example.backend_gym.Class;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditoriaDTO {
    private String username;
    private String tabla;
    private String accion;
    private String fechaHora;
    private Integer returncode;
    private String osUsername;
    private String userhost;
}
