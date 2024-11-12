package com.example.backend_gym.Service;

import com.example.backend_gym.Entity.Membresia;
import com.example.backend_gym.Repository.MembresiaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembresiaService {

    private final MembresiaRepository membresiaRepository;

    public MembresiaService(MembresiaRepository membresiaRepository) {
        this.membresiaRepository = membresiaRepository;
    }

    public void agregarMembresia(Membresia membresia) {
        membresiaRepository.agregarMembresia(membresia);
    }

    public Membresia obtenerMembresiaPorId(Long id) {
        return membresiaRepository.obtenerMembresiaPorId(id);
    }

    public List<Membresia> obtenerTodasLasMembresias() {
        return membresiaRepository.obtenerTodasLasMembresias();
    }

    public boolean actualizarMembresia(Long id, Membresia membresia) {
        return membresiaRepository.actualizarMembresia(id, membresia);
    }

    public boolean eliminarMembresia(Long id) {
        return membresiaRepository.eliminarMembresia(id);
    }
}
