package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Membresia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembresiaRepository extends JpaRepository<Membresia, Long> {

    List<Membresia> findByEstado(String estado);
}
