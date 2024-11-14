package com.example.proyecto_2_paradigmas.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "dependencias")
public class Dependency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tarea_id")
    private Task tarea;

    @ManyToOne
    @JoinColumn(name = "tarea_dependiente_id")
    private Task tareaDependiente;
}
