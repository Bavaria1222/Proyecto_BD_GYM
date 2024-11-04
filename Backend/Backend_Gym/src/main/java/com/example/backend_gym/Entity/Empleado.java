package com.example.backend_gym.Entity;
import  com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "Empleado", uniqueConstraints = {
        @UniqueConstraint(columnNames = "cedula"),
        @UniqueConstraint(columnNames = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_gimnasio", nullable = false)
    @JsonIgnore
    private Gimnasio gimnasio;
    @Column(nullable = false, length = 30)
    private String nombre;

    @Column(nullable = false, length = 30)
    private String apellido1;

    @Column(length = 30)
    private String apellido2;

    @Column(nullable = false, length = 30, unique = true)
    private String cedula;

    @Column(name = "tel_habitacion")
    private Integer telHabitacion;

    @Column(name = "fecha_contratacion")
    private Date fechaContratacion;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(length = 30)
    private String rol;

    @Column(length = 30)
    private String estado;

}
