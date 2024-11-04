package com.example.backend_gym.Repository;
import com.example.backend_gym.Entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
}
