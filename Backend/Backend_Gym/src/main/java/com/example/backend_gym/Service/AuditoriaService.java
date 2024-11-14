package com.example.backend_gym.Service;


import com.example.backend_gym.Class.AuditoriaDTO;
import com.example.backend_gym.Repository.AuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AuditoriaService {

    @Autowired
    private AuditoriaRepository auditoriaRepository;

    public List<AuditoriaDTO> obtenerAuditoriaPorFecha(Date fechaInicio, Date fechaFin) {
        return auditoriaRepository.findAuditoriaByFecha(fechaInicio, fechaFin);
    }
}
