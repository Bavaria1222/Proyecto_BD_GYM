package com.example.backend_gym.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Rutina")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rutina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rutina")
    private Long idRutina;

    @ManyToOne(fetch = FetchType.EAGER , optional = false)
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "id_empleado")
    private Empleado empleado;

    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "id_maquina")
    private Maquina maquina;

    @Column(columnDefinition = "DATE DEFAULT CURRENT_DATE")
    private LocalDate fecha;

    @Column(nullable = false)
    private Integer horas;
}
