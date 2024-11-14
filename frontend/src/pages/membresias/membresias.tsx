import { THeader } from 'src/models/table';
import CandyPage from '../generic/page';
import CandyTableGeneric from '../generic/table';
import { TActions, ModalTypes } from 'src/models/action-types';
import React, { useCallback, useState } from 'react';
import { getActionText } from 'src/utils/actions-utils';
import { routes } from 'src/router/routes';
import GetMembresias from 'src/domain/membresias/GetMembresias';
import { useNavigate } from 'react-router-dom';
import PatchStatusEmpleado from 'src/domain/empleados/PatchEstadoEmpleado';

const MembresiasLista = () => {
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const navigate = useNavigate();

    const breadcrumbs = [
        { label: "Membresias", bold: true }
    ];

    const headers = [
        new THeader('Nombre del Cliente', 'clienteNombre', 20),
        new THeader('Tipo de Membresía', 'tipoMembresia', 20),
        new THeader('Fecha Inicio', 'fechaInicio', 20),
        new THeader('Fecha Fin', 'fechaFin', 20),
        new THeader('Estado', 'estado', 20),
        new THeader('Monto', 'monto', 20),
    ];
    /*
    const membresiasConNombreCompleto = membresias.map((membresia) => ({
    ...membresia,
    nombreCompleto: `${membresia.cliente.nombre} ${membresia.cliente.apellido1} ${membresia.cliente.apellido2}`,
})); */

    
    

    const handleEdit = async () => {
        navigate(routes.membresia + "/" + selectedRow.cedula);
    };

    const onProcess = async () => {
        const id = selectedRow.cedula;
        const estado = selectedRow.cedula;

        try {
            await PatchStatusEmpleado(id, estado);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const actions = [
        new TActions(
            ModalTypes.YesNo,
            ` ${getActionText(selectedRow?.status)} `, onProcess,
            `¿Está segura que desea ${getActionText(selectedRow?.status).toLowerCase()} el registro?`,
        ),
        new TActions(
            ModalTypes.None,
            "Editar",
            handleEdit
        ),
    ];

    const loadMembresias = useCallback(async () => {
        const membresias = await GetMembresias();
        // Verifica que el resultado sea un array y añade 'clienteNombre'
  return Array.isArray(membresias)
  ? membresias.map(membresia => ({
      ...membresia,
      clienteNombre: `${membresia.cliente.nombre} ${membresia.cliente.apellido1} ${membresia.cliente.apellido2}`
    }))
  : [];
}, []);

    const handleSelectItem = (row: any) => {
        setSelectedRow(row);
    };

    return (
        <CandyPage
            title='Listado de Membresias'
            description={'Módulo de gestión de membresias'}
            breadcrumbs={breadcrumbs}
            isExportable={false}
            redirectLabel="Agregar"
            redirectTo={routes.membresia}
        >
            <CandyTableGeneric
                headers={headers}
                isActionsEnabled={true}
                onLoadData={loadMembresias}
                showFilter={true}
                actions={actions}
                onSelectItem={handleSelectItem}
            />
        </CandyPage>
    );
};

export default MembresiasLista;