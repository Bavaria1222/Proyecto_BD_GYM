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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_instructor", nullable = false)
    private Empleado instructor;

    @Column(nullable = false, length = 15)
    private String descripcion;

    @Column(nullable = false, length = 50)
    private String horario;

    @Column(length = 10)
    private String disponibilidad;
}
