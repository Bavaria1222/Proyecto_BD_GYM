package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
