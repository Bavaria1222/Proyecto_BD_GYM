import React, { useCallback, useState } from 'react';
import GetHistorialCursos from 'src/domain/historialCursos/GetHistorialCursos';
import { THeader } from 'src/models/table';
import CandyPage from '../generic/page';
import CandyTableGeneric from '../generic/table';

const HistorialCursosLista = () => {
  const headers = [
    new THeader('ID', 'idHistorial', 20),
    new THeader('Membresía', 'membresia', 30),
    new THeader('Curso', 'curso', 30),
    new THeader('Horas', 'horas', 20),
    new THeader('Fecha', 'fecha', 20),
  ];

  const loadHistorialCursos = useCallback(async () => {
    const historialCursos = await GetHistorialCursos();
    const historialConClave = Array.isArray(historialCursos)
      ? historialCursos.map((item, index) => ({
          ...item,
          key: item.idHistorial || index,
          // Aseguramos que campos compuestos se transformen en strings legibles
          membresia: item.membresia?.tipoMembresia || 'Sin tipo',
          curso: item.curso?.descripcion || 'Sin descripción',
        }))
      : [];

    console.log("Datos de historial de cursos cargados:", historialConClave); // Verificar datos y claves únicas
    return historialConClave;
  }, []);

  return (
    <CandyPage
      title="Historial de Cursos"
      description="Historial de los cursos realizados"
      isExportable={false}
    >
      <CandyTableGeneric
        headers={headers}
        isActionsEnabled={false}
        onLoadData={loadHistorialCursos}
        showFilter={true}
        actions={[]} // Pasar un array vacío para evitar el error
      />
    </CandyPage>
  );
};

export default HistorialCursosLista;
