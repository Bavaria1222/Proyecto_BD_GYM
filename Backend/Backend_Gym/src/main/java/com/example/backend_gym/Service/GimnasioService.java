package com.example.backend_gym.Service;

import com.example.backend_gym.Entity.Gimnasio;
import com.example.backend_gym.Repository.GimnasioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GimnasioService {

    private final GimnasioRepository gimnasioRepository;

    public GimnasioService(GimnasioRepository gimnasioRepository) {
        this.gimnasioRepository = gimnasioRepository;
    }

    public void agregarGimnasio(Gimnasio gimnasio) {
        gimnasioRepository.agregarGimnasio(gimnasio);
    }

    public Gimnasio obtenerGimnasioPorId(Long id) {
        return gimnasioRepository.obtenerGimnasioPorId(id);
    }

    public List<Gimnasio> obtenerTodosLosGimnasios() {
        return gimnasioRepository.obtenerTodosLosGimnasios();
    }

    public boolean actualizarGimnasio(Long id, Gimnasio gimnasio) {
        return gimnasioRepository.actualizarGimnasio(id, gimnasio);
    }

    public boolean eliminarGimnasio(Long id) {
        return gimnasioRepository.eliminarGimnasio(id);
    }
}
