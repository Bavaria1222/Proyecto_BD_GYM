import { THeader } from 'src/models/table';
import CandyPage from '../generic/page';
import CandyTableGeneric from '../generic/table';
import { TActions, ModalTypes } from 'src/models/action-types';
import React, { useCallback, useState } from 'react';
import { getActionText } from 'src/utils/actions-utils';
import { routes } from 'src/router/routes';
import GetEmpleados from 'src/domain/empleados/GetEmpleados';
import { useNavigate } from 'react-router-dom';

const EmpleadosLista = () => {
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const navigate = useNavigate();

    const breadcrumbs = [
        { label: "Empleados", bold: true }
    ];

    const headers = [
        new THeader('Nombre', 'nombre', 20),
        new THeader('Apellido', 'apellido1', 20),
        new THeader('Apellido 2', 'apellido2', 20),
        new THeader('Cédula', 'cedula', 20),
        new THeader('Tel. Habitación', 'telHabitacion', 20),
        new THeader('Fecha de Contratación', 'fechaContratacion', 20),
        new THeader('Correo', 'email', 30),
        new THeader('Rol', 'rol', 20, 'Sin Rol'),
        new THeader('Estado', 'estado', 20),
    ];

    const handleEdit = async () => {
        navigate(routes.empleado + "/" + selectedRow.cedula);
    };

    const onProcess = async () => {
        const id = selectedRow.cedula;
        try {
            // await PatchRoleStatus(id);
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
    /*
        const loadEmpleados = useCallback(async () => {
            const empleados = await GetEmpleados();
            return Array.isArray(empleados) ? empleados : [];
        }, []);
    */



    const loadEmpleados = async () => {
        const list = [
            {
                idUsuario: 35,
                nombre: "Juan",
                apellido1: "Perez",
                apellido2: "Gomez",
                cedula: "87654321",
                telHabitacion: 1234567,
                fechaContratacion: "2024-10-25",
                email: "juan.perez@example.com",
                rol: "Mantenimiento",
                estado: "activo"
            },
            {
                idUsuario: 31,
                nombre: "Carlos",
                apellido1: "Garcia",
                apellido2: "Perez",
                cedula: "12345678",
                telHabitacion: 1234567,
                fechaContratacion: "2024-11-04",
                email: "carlos.garcia@example.com",
                rol: "Instructor",
                estado: "activo"
            },
            {
                idUsuario: 36,
                nombre: "Carlos",
                apellido1: "Martinez",
                apellido2: "Lopez",
                cedula: "87654322",
                telHabitacion: 1234567,
                fechaContratacion: "2024-10-25",
                email: "carlos.martinez@example.com",
                rol: "Instructor",
                estado: "activo"
            },
            {
                idUsuario: 38,
                nombre: "Carlos",
                apellido1: "Martinez",
                apellido2: "Lopez",
                cedula: "123123",
                telHabitacion: 1234567,
                fechaContratacion: "2024-10-25",
                email: "carlos.123@example.com",
                rol: "Instructor",
                estado: "activo"
            },
            {
                idUsuario: 61,
                nombre: "123123",
                apellido1: "string",
                apellido2: "string",
                cedula: "304990435",
                telHabitacion: 0,
                fechaContratacion: "2024-11-04",
                email: "string",
                rol: "string",
                estado: "string"
            }
        ];
        return list;
    };

    const handleSelectItem = (row: any) => {
        setSelectedRow(row);
    };

    return (
        <CandyPage
            title='Listado de Empleados'
            description={'Módulo de gestión de empleados'}
            breadcrumbs={breadcrumbs}
            isExportable={false}
            redirectLabel="Agregar"
            redirectTo={routes.empleado}
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

export default EmpleadosLista;
