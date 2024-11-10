import React, { FC } from 'react';
import { Box, Modal, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalTypes } from 'src/models/action-types';

interface GenericModalProps {
    open: boolean;
    title: string;
    description: string;
    icon: any;
    onConfirm: () => void;
    onClose: () => void;
    type: ModalTypes;
    isSubmitting?: boolean;

}
const GenericModal: FC<GenericModalProps> = ({
    open,
    title,
    description,
    icon,
    onConfirm,
    onClose,
    type = ModalTypes.None,
    isSubmitting,

}) => {
    const renderActions = () => {
        switch (type) {
            case ModalTypes.YesNo:
                return (
                    <>
                        <Button
                            onClick={onClose}
                            sx={{
                                border: `1px solid `,
                                width: '100%',
                                '&:hover': {
                                    backgroundColor: 'grey.100',
                                },
                                boxSizing: 'border-box',
                                fontSize: '0.875rem',
                            }}
                        >
                            No
                        </Button>
                        <Button
                            onClick={onConfirm}
                            sx={{

                                color: 'white',
                                width: '100%',
                                fontSize: '0.875rem',
                            }}
                            disabled={isSubmitting}
                            autoFocus
                        >
                            Sí
                        </Button>
                    </>
                );
            case ModalTypes.Info:
                return (
                    <Button
                        onClick={onConfirm}
                        color="primary"
                        autoFocus
                        sx={{ fontSize: '0.875rem' }}
                    >
                        OK
                    </Button>
                );
            case ModalTypes.Accept:
                return (
                    <Button
                        onClick={onConfirm}
                        sx={{

                            color: 'white',
                            width: '30%',
                            fontSize: '0.875rem',
                        }}
                        autoFocus
                    >
                        Aceptar
                    </Button>
                );
            default:
                return (
                    <Button
                        onClick={onClose}
                        sx={{

                            color: 'white',
                            width: '30%',
                            fontSize: '0.875rem',
                        }}
                        autoFocus
                    >
                        Cerrar
                    </Button>
                );
        }
    };

    return (
        <Modal open={open}
            onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '75%',
                    maxWidth: '500px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 3,
                    outline: 'none',
                    borderRadius: '8px',
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'grey.500',
                        fontSize: '1.25rem',
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                        fontSize: '1.75rem',
                    }}
                >
                    {icon}
                </Box>
                <Typography variant="h6"
                    component="h2"
                    align="center"
                    sx={{ fontSize: '1.25rem' }}>
                    {title}
                </Typography>
                <Typography sx={{ mt: 2, mb: 3, textAlign: 'center', fontSize: '1rem' }}>
                    {description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {renderActions()}
                </Box>
            </Box>
        </Modal>
    );
};

export default GenericModal;
