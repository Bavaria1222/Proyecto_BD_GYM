package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}
