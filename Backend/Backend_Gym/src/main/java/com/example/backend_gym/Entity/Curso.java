package com.example.backend_gym.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Curso")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_curso")
    private Long idCurso;

    @ManyToOne
    @JoinColumn(name = "id_instructor", nullable = false)
    private Empleado instructor;

    @Column(name = "descripcion", length = 50)
    private String descripcion;

    @Column(name = "horario", length = 50)
    private String horario;

    @Column(name = "disponibilidad", length = 15)
    private String disponibilidad;
}
