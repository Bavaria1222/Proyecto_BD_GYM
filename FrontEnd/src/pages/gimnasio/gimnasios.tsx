import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetEmpleados from 'src/domain/empleados/GetEmpleados';
import GetGimnasios from 'src/domain/gimnasio/GetGimnasios';
import { ModalTypes, TActions } from 'src/models/action-types';
import { THeader } from 'src/models/table';
import { routes } from 'src/router/routes';
import { getActionText } from 'src/utils/actions-utils';
import CandyPage from '../generic/page';
import CandyTableGeneric from '../generic/table';

const GimnasiosLista = () => {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const navigate = useNavigate();

  const breadcrumbs = [{ label: 'Gimnasios', bold: true }];

  const headers = [
    new THeader('Id', 'idGimnasio', 20),
    new THeader('Nombre', 'nombre', 20),
    new THeader('Celular', 'celular', 20),
    new THeader('horario', 'horario', 20),
    new THeader('Tel. Habitación', 'telHabitacion', 20),
    new THeader('Correo', 'email', 30),
  ];




  const loadEmpleados = useCallback(async () => {
    const gimnasios = await GetGimnasios();
    console.log(gimnasios);
    return Array.isArray(gimnasios) ? gimnasios : [];
  }, []);

  const handleSelectItem = (row: any) => {
    setSelectedRow(row);
  };

  return (
    <CandyPage
      title="Listado de Gimnasios"
      description={'Módulo de gestión de gimnasios'}
      breadcrumbs={breadcrumbs}
      isExportable={false}
      redirectLabel="Agregar"
      redirectTo={""}
    >
      <CandyTableGeneric
        headers={headers}
        isActionsEnabled={false}
        onLoadData={loadEmpleados}
        showFilter={true}
        onSelectItem={handleSelectItem}
      />
    </CandyPage>
  );
};

export default GimnasiosLista;
