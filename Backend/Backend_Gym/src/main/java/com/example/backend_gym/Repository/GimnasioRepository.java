package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Gimnasio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GimnasioRepository extends JpaRepository<Gimnasio, Long> {
}
