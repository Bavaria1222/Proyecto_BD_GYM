package com.example.backend_gym.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "Cliente", uniqueConstraints = {
        @UniqueConstraint(columnNames = "cedula"),
        @UniqueConstraint(columnNames = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Long idCliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_gimnasio", nullable = false)
    @JsonIgnore
    private Gimnasio gimnasio;

    @Column(nullable = false, length = 30)
    private String nombre;

    @Column(nullable = false, length = 30)
    private String apellido1;

    @Column(nullable = false, length = 30)
    private String apellido2;

    @Column(nullable = false, length = 30, unique = true)
    private String cedula;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(length = 10)
    private String estado;

    @Column(name = "tel_habitacion")
    private Integer telHabitacion;

    private Integer celular;

    @Column(name = "fecha_registro", columnDefinition = "DATE DEFAULT CURRENT_DATE")
    private java.sql.Date fechaRegistro;

}
