package com.example.proyecto_2_paradigmas.Entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "schedules")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date fecha; // fecha de la planificación

    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL)
    private List<Task> tareas;

}
