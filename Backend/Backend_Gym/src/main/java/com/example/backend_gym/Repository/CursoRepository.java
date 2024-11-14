package com.example.backend_gym.Repository;

import com.example.backend_gym.Entity.Curso;
import com.example.backend_gym.Entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {



}
