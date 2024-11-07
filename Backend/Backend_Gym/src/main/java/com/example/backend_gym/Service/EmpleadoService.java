package com.example.backend_gym.Service;


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

    public void agregarEmpleado(int idGimnasio, String nombre, String apellido1, String apellido2, String cedula,
                                int telHabitacion, Date fechaContratacion, String email,
                                String rol, String estado) {
        jdbcTemplate.execute((Connection con) -> {
            CallableStatement callableStatement = con.prepareCall("{call agregar_empleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
            callableStatement.setInt(1, idGimnasio);
            callableStatement.setString(2, nombre);
            callableStatement.setString(3, apellido1);
            callableStatement.setString(4, apellido2);
            callableStatement.setString(5, cedula);
            callableStatement.setInt(6, telHabitacion);
            callableStatement.setDate(7, new java.sql.Date(fechaContratacion.getTime()));
            callableStatement.setString(8, email);
            callableStatement.setString(9, rol);
            callableStatement.setString(10, estado);
            return callableStatement;
        }, (CallableStatement callableStatement) -> {
            callableStatement.execute();
            return null;
        });
    }
    public List<Empleado> obtenerEmpleados() {
        return empleadoRepository.obtenerEmpleados();
    }

    public Empleado obtenerEmpleadoPorCedula(String cedula) {
        return empleadoRepository.obtenerEmpleadoPorCedula(cedula);
    }


    public void actualizarEmpleadoPorCedula(Empleado empleado) {
        boolean actualizado = empleadoRepository.actualizarEmpleadoPorCedula(empleado);
        if (!actualizado) {
            throw new EmpleadoNotFoundException(empleado.getCedula());
        }
    }
}
