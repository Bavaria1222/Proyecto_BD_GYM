package com.example.proyecto_2_paradigmas.Entity;


import com.example.proyecto_2_paradigmas.Enum.Estado;
import com.example.proyecto_2_paradigmas.Enum.Prioridad;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor


@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Enumerated(EnumType.STRING)
    private Prioridad prioridad;

    private int tiempoEstimado;

    private Date fechaLimite;

    private String requisitos;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    private Date HoraInicio;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule; // Agrega este campo

    @OneToMany(mappedBy = "tarea", cascade = CascadeType.ALL)
    private  List<Dependency> dependencias;


}
