import { THeader } from 'src/models/table';
import CandyPage from '../generic/page';
import CandyTableGeneric from '../generic/table';
import { TActions, ModalTypes } from 'src/models/action-types';
import React, { useCallback, useState } from 'react';
import { getActionText } from 'src/utils/actions-utils';
import { routes } from 'src/router/routes';
import GetCursos from 'src/domain/cursos/GetCursos';
import { useNavigate } from 'react-router-dom';
import PatchStatusCurso from 'src/domain/cursos/PatchEstadoCurso';

const CursosLista = () => {
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const navigate = useNavigate();

    const breadcrumbs = [
        { label: "Cursos", bold: true }
    ];

    const headers = [
        new THeader('NombreInstructor', 'nombre', 20),
        new THeader('Apellido', 'apellido1', 20),
        new THeader('Apellido 2', 'apellido2', 20),
        new THeader('Curso', 'descripcion', 30), // Suponiendo que la descripción del curso es un campo relevante
        new THeader('Horario', 'horario', 20),
        new THeader('Disponibilidad', 'disponibilidad', 20),
    ];

    const handleEdit = async () => {
        navigate(routes.curso + "/" + selectedRow.idCurso); // Asegúrate de que la ruta sea correcta
    };

    const onProcess = async () => {
        const id = selectedRow.idCurso;
        const estado = selectedRow.estado;

        try {
            await PatchStatusCurso(id, estado);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const actions = [
        new TActions(
            ModalTypes.YesNo,
            ` ${getActionText(selectedRow?.estado)} `,
            onProcess,
            `¿Está segura que desea ${getActionText(selectedRow?.estado).toLowerCase()} el curso?`,
        ),
        new TActions(
            ModalTypes.None,
            "Editar",
            handleEdit
        ),
    ];

    const loadCursos = useCallback(async () => {
        const cursos = await GetCursos(); // Asegúrate de que esta función retorne los cursos correctamente
        return Array.isArray(cursos) ? cursos.map((curso: any) => ({
            ...curso,
            instructor: `${curso.instructor.nombre} ${curso.instructor.apellido1} ${curso.instructor.apellido2}`,
        })) : [];
    }, []);

    const handleSelectItem = (row: any) => {
        setSelectedRow(row);
    };

    return (
        <CandyPage
            title='Listado de Cursos'
            description={'Módulo de gestión de cursos'}
            breadcrumbs={breadcrumbs}
            isExportable={false}
            redirectLabel="Agregar"
            redirectTo={routes.curso} // Ruta para agregar curso
        >
            <CandyTableGeneric
                headers={headers}
                isActionsEnabled={true}
                onLoadData={loadCursos}
                showFilter={true}
                actions={actions}
                onSelectItem={handleSelectItem}
            />
        </CandyPage>
    );
};

export default CursosLista;
