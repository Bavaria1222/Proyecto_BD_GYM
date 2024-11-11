package com.example.backend_gym.Service;


import com.example.backend_gym.DTO.EmpleadoDto.ActualizarEmpleadoDTO;
import com.example.backend_gym.DTO.EmpleadoDto.AgregarEmpleadoDTO;
import com.example.backend_gym.Entity.Empleado;
import com.example.backend_gym.Exception.EmpleadoNotFoundException;
import com.example.backend_gym.Repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.util.Date;
import java.util.List;

@Service
public class EmpleadoService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    public List<Empleado> obtenerEmpleados() {
        return empleadoRepository.obtenerEmpleados();
    }

    public Empleado obtenerEmpleadoPorCedula(String cedula) {
        return empleadoRepository.obtenerEmpleadoPorCedula(cedula);
    }

    public boolean actualizarEmpleado(String cedula, ActualizarEmpleadoDTO empleadoDTO) {
        return empleadoRepository.actualizarEmpleado(cedula, empleadoDTO);
    }


    public void agregarEmpleado(AgregarEmpleadoDTO empleadoDTO) {
        empleadoRepository.agregarEmpleado(empleadoDTO);
    }
    public boolean actualizarEstado(String cedula, String estado) {
        return empleadoRepository.actualizarEstadoEmpleado(cedula, estado);
    }


}
