import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetCursos from 'src/domain/cursos/GetCursos';
import { THeader } from 'src/models/table';
import CandyPage from '../generic/page';
import CandyTableGeneric from '../generic/table';

const CursosLista = () => {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const navigate = useNavigate();

  const headers = [
    new THeader('ID', 'idCurso', 20),
    new THeader('Nombre', 'descripcion', 30),
    new THeader('Instructor', 'instructorNombreCompleto', 30),
    new THeader('Horario', 'horario', 20),
    new THeader('Disponibilidad', 'disponibilidad', 20),
  ];

  const loadCursos = useCallback(async () => {
    const cursos = await GetCursos();
    const cursosConClave = Array.isArray(cursos)
      ? cursos.map((curso, index) => ({
          ...curso,
          key: curso.idCurso || index,
          instructorNombreCompleto: `${curso.instructor.nombre} ${curso.instructor.apellido1} ${curso.instructor.apellido2 || ''}`.trim(),
        }))
      : [];

    console.log("Datos de cursos cargados:", cursosConClave); // Verificar datos y claves únicas
    return cursosConClave;
  }, []);

  return (
    <CandyPage
      title="Listado de Cursos"
      description="Módulo de gestión de cursos"
      isExportable={false}
    >
      <CandyTableGeneric
        headers={headers}
        isActionsEnabled={false}
        onLoadData={loadCursos}
        showFilter={true}
        actions={[]} // Pasar un array vacío para evitar el error
        onSelectItem={(row) => {
          setSelectedRow(row);
          console.log("Fila seleccionada:", row); // Verificar fila seleccionada
        }}
      />
    </CandyPage>
  );
};

export default CursosLista;
