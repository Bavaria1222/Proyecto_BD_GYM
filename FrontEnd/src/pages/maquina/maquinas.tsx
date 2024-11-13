import { THeader } from 'src/models/table';
import CandyPage from '../generic/page';
import CandyTableGeneric from '../generic/table';
import { TActions, ModalTypes } from 'src/models/action-types';
import React, { useCallback, useState } from 'react';
import { getActionText } from 'src/utils/actions-utils';
import { routes } from 'src/router/routes';
import { useNavigate } from 'react-router-dom';
import PatchStatusEmpleado from 'src/domain/empleados/PatchEstadoEmpleado';
import GetMaquinas from 'src/domain/maquinas/GetMaquinas';
const MaquinasLista = () => {
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const navigate = useNavigate();

    const breadcrumbs = [
        { label: "Maquinas", bold: true }
    ];

    const headers = [
        new THeader('Id', 'idMaquina', 20),
        new THeader('Nombre', 'nombre', 20),
        new THeader('Descripcion', 'descripcion', 20),
        new THeader('Estado', 'estado', 20),
    ];

    const handleEdit = async () => {
        navigate(routes.maquina + "/" + selectedRow.cedula);
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

    const loadEmpleados = useCallback(async () => {
        const maquinas = await GetMaquinas();
        console.log(maquinas)
        return Array.isArray(maquinas) ? maquinas : [];
    }, []);

    const handleSelectItem = (row: any) => {
        setSelectedRow(row);
    };

    return (
        <CandyPage
            title='Listado de Maquinas'
            description={'Módulo de gestión de maquinas'}
            breadcrumbs={breadcrumbs}
            isExportable={false}
            redirectLabel="Agregar"
            redirectTo={routes.maquina}
        >
            <CandyTableGeneric
                headers={headers}
                isActionsEnabled={true}
                onLoadData={loadEmpleados}
                showFilter={true}
                actions={actions}
                onSelectItem={handleSelectItem}
            />
        </CandyPage>
    );
};

export default MaquinasLista;
