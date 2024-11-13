package com.example.backend_gym.Controller;
import com.example.backend_gym.Class.AuditoriaDTO;
import com.example.backend_gym.Service.AuditoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AuditoriaController {

    @Autowired
    private AuditoriaService auditoriaService;

    @GetMapping
    public List<AuditoriaDTO> obtenerAuditoria(
            @RequestParam("fechaInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaInicio,
            @RequestParam("fechaFin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaFin) {
        return auditoriaService.obtenerAuditoriaPorFecha(fechaInicio, fechaFin);
    }
}
