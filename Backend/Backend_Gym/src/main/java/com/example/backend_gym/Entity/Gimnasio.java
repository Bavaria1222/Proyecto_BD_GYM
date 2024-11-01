package com.example.backend_gym.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Gimnasio", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Gimnasio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_gimnasio")
    private Long idGimnasio;

    @Column(nullable = false, length = 30)
    private String nombre;

    @Column(nullable = false, length = 30)
    private String direccion;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(length = 30)
    private String horario;

    @Column(name = "tel_habitacion")
    private Integer telHabitacion;

    private Integer celular;

}