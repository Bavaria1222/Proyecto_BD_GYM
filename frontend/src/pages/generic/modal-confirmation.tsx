import React, { useState, FC } from 'react';
import GenericModal from '../generic/modal';  // Asegúrate de importar el componente modal
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { ModalTypes } from 'src/models/action-types';
import { Button } from '@mui/material';

import Agenda from 'src/components/animations/agenda.json'
import Confirm from 'src/components/animations/confirm.json'
import Cancel from 'src/components/animations/error.json'
import help from 'src/components/animations/help.json'
import Warning from 'src/components/animations/warning.json'

import Lottie from 'lottie-react';
interface TransactionModalManagerProps {
    onSave: () => Promise<void>;
    onCancel: () => void;
    onSuccessNavigate?: () => void;

}

const TransactionModalManager: FC<TransactionModalManagerProps> = ({ onSave, onCancel, onSuccessNavigate }) => {
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenSaveModal = () => {
        setIsSaveModalOpen(true);
    };

    const handleSave = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await onSave();
            setModalContent({
                type: ModalTypes.Accept,
                title: 'Transacción exitosa',
                description: 'Se guardó con éxito.',
                icon: <Lottie
                    animationData={Confirm}
                    loop={false}
                    style={{ width: 150, height: 150 }}
                />,
                onConfirm: () => {
                    setIsResultModalOpen(false);
                    if (onSuccessNavigate) {
                        onSuccessNavigate();
                    }
                },
            });

            setIsResultModalOpen(true);
        } catch (error: any) {
            if (error.statusCode === 409) {
                setModalContent({
                    type: ModalTypes.Accept,
                    title: 'Información duplicada',
                    description: 'No se puede guardar el registro, ya que existe un registro con la misma información: Nombre de documento',
                    icon: <Lottie
                        animationData={Agenda}
                        loop={false}
                        style={{ width: 150, height: 150 }}
                    />,
                    onConfirm: () => setIsResultModalOpen(false),
                });
            } else if (error.statusCode === 404) {
                setModalContent({
                    type: ModalTypes.Accept,
                    title: 'Acceso denegado',
                    description: 'Su cuenta no posee los permisos para ingresar a esta página. Contacte con Soporte Técnico para recibir asistencia.',
                    icon: <Lottie
                        animationData={Warning}
                        loop={false}
                        style={{ width: 150, height: 150 }}
                    />,
                    onConfirm: () => setIsResultModalOpen(false),
                });
            } else {
                setModalContent({
                    type: ModalTypes.Accept,
                    title: 'Transacción errónea',
                    description: 'Su transacción no pudo efectuarse, intente nuevamente.',
                    icon: <Lottie
                        animationData={Cancel}
                        loop={false}
                        style={{ width: 150, height: 150 }}
                    />,
                    onConfirm: () => setIsResultModalOpen(false),
                });
            }
            setIsResultModalOpen(true);
        } finally {
            setIsSaveModalOpen(false);
            setIsSubmitting(false);  // Restablecer el estado de envío
        }
    };


    const handleCancel = () => {
        setIsCancelModalOpen(true);
    };

    const confirmCancel = () => {
        onCancel();
        setIsCancelModalOpen(false);
    };

    return (
        <>


            <Button
                onClick={handleCancel}
                sx={{

                    width: { xs: '40%', sm: '30%', md: '20%' },
                    '&:hover': {
                        backgroundColor: 'grey.100',

                    },
                }}
            >
                Cancelar
            </Button>
            <Button
                onClick={handleOpenSaveModal}
                sx={{
                    backgroundColor: '#36799C',
                    '&:hover': { backgroundColor: '#2C627E' },
                    color: 'white',
                    width: { xs: '40%', sm: '30%', md: '20%' },
                }}
                autoFocus
            >
                Guardar
            </Button>

            <GenericModal
                open={isSaveModalOpen}
                title="¿Está segura que desea guardar la transacción?"
                description="Este movimiento se registrará en la bitácora."
                icon={<Lottie
                    animationData={help}
                    loop={false}
                    style={{ width: 150, height: 150 }}
                />}
                onConfirm={handleSave}
                onClose={() => setIsSaveModalOpen(false)}
                type={ModalTypes.YesNo}
                isSubmitting={isSubmitting}  // Pasa el estado al modal

            />

            <GenericModal
                open={isCancelModalOpen}
                title="¿Está segura que desea cancelar la transacción?"
                description="Los datos no se guardarán."
                icon={<Lottie
                    animationData={help}
                    loop={false}
                    style={{ width: 150, height: 150 }}
                />}
                onConfirm={confirmCancel}
                onClose={() => setIsCancelModalOpen(false)}
                type={ModalTypes.YesNo}
            />

            <GenericModal
                open={isResultModalOpen}
                title={modalContent.title}
                description={modalContent.description}
                icon={modalContent.icon}
                onConfirm={modalContent.onConfirm}
                onClose={() => setIsResultModalOpen(false)}
                type={ModalTypes.Accept}
            />
        </>
    );
};

export default TransactionModalManager;
