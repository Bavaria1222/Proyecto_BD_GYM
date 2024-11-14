package com.example.backend_gym.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Historial_Curso")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialCurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private Long idHistorial;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_membresia", nullable = false)
    private Membresia membresia;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_curso", nullable = false)
    private Curso curso;

    @Column
    private Integer horas;

    @Column(columnDefinition = "DATE DEFAULT CURRENT_DATE")
    private LocalDate fecha;
}
