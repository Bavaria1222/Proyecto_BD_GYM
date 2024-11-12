package com.example.backend_gym.Service;

import com.example.backend_gym.Entity.Curso;
import com.example.backend_gym.Repository.CursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursoService {

    private final CursoRepository cursoRepository;

    public CursoService(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    public void agregarCurso(Curso curso) {
        cursoRepository.agregarCurso(curso);
    }

    public Curso obtenerCursoPorId(Long id) {
        return cursoRepository.obtenerCursoPorId(id);
    }

    public List<Curso> obtenerTodosLosCursos() {
        return cursoRepository.obtenerTodosLosCursos();
    }

    public boolean actualizarCurso(Long id, Curso curso) {
        return cursoRepository.actualizarCurso(id, curso);
    }

    public boolean eliminarCurso(Long id) {
        return cursoRepository.eliminarCurso(id);
    }
}

