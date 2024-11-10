import React, { FC, useState } from 'react';
import {
    Box,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    Select,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { tableCellClasses } from '@mui/material/TableCell';
import { useTranslation } from 'react-i18next';
import GenericModal from './modal';
import { useNavigate } from 'react-router-dom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { ModalTypes, TActions } from 'src/models/action-types';
import { isActive } from 'src/utils/actions-utils';
import Confirm from 'src/components/animations/confirm.json'
import Cancel from 'src/components/animations/error.json'
import help from 'src/components/animations/help.json'
import Lottie from 'lottie-react'; // Asegúrate de importar Lottie desde 'lottie-react'

interface BasicTableProps {
    data: any[];
    headers: THeader[];
    isActionsEnabled: boolean;
    actions?: TActions[];
    onReloadData: () => void;
    onSelectItem?: (row: any) => void;

}

interface THeader {
    accessor: string;
    label: string;
    width: number;
    onMap?: (value: any) => any;
    defect?: string;
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: '#000C1D',
        borderBottom: 'none',
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: '#282828',
        borderBottom: 'none',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        textOverflow: 'clip',
        maxWidth: '200px',
        padding: '8px',
    },
}));

const BasicTableComponent: FC<BasicTableProps> = ({
    data,
    headers,
    isActionsEnabled,
    actions,
    onReloadData,
    onSelectItem,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [modalContent, setModalContent] = useState<{
        type: ModalTypes;
        title: string;
        description: string;
        icon: React.ReactNode;
        onConfirm: () => void;
    } | null>(null);

    const handlePageChange = (_event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value, 10));
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
        if (onSelectItem) {
            onSelectItem(row);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };


    const handleActionClick = (action: TActions) => {

        if (!selectedRow) return;
        if (action.type === ModalTypes.None) {
            action.onProcess();
            return;
        }
        handleMenuClose();

        if (action.preProcess) {
            action.preProcess();
        }
        setModalContent({
            type: action.type,
            title: action.title,
            description: action.description,
            icon: (
                <Lottie
                    animationData={help}
                    loop={false}
                    style={{ width: 150, height: 150 }}
                />
            ),
            onConfirm: async () => {
                try {
                    await action.onProcess();
                    onReloadData();

                    setModalContent({
                        type: ModalTypes.Accept,
                        title: 'Transacción exitosa',
                        description: 'Se guardó con éxito.',
                        icon: (
                            <Lottie
                                animationData={Confirm}
                                loop={false}
                                style={{ width: 150, height: 150 }}
                            />
                        ),
                        onConfirm: handleModalClose,
                    });
                } catch (error) {
                    setModalContent({
                        type: ModalTypes.Accept,
                        title: 'Transacción errónea',
                        description: 'Su transacción no pudo efectuarse, intente nuevamente.',
                        icon: (
                            <Lottie
                                animationData={Cancel}
                                loop={false}
                                style={{ width: 150, height: 150 }}
                            />
                        ),
                        onConfirm: handleModalClose,
                    });
                }
            },
        });
    };

    const handleModalClose = () => {
        setModalContent(null);
        // handleMenuClose();
    };


    const totalPages = Math.ceil(data.length / limit);
    const startItemIndex = page * limit + 1;
    const endItemIndex = Math.min((page + 1) * limit, data.length);

    return (
        <>
            {data.length === 0 ? (
                <Typography
                    sx={{
                        py: { xs: 2, sm: 3, md: 6, lg: 10 },
                    }}
                    variant="h3"
                    color="text.secondary"
                    align="center"
                    fontWeight={500}
                >
                    {t('No se encontró ningún elemento bajo el criterio solicitado')}
                </Typography>
            ) : (
                <>
                    <Box>
                        <TableContainer
                            sx={{
                                boxShadow: 'none',
                                backgroundColor: 'white',
                                border: 'none',
                            }}
                        >
                            <Table
                                sx={{
                                    boxShadow: 'none',
                                    border: 'none',
                                    backgroundColor: 'white',
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        {headers.map((label, index) => (
                                            <StyledTableCell key={index}>
                                                {label.label}
                                            </StyledTableCell>
                                        ))}
                                        {isActionsEnabled && (
                                            <StyledTableCell align="center">
                                                {t('Acciones')}
                                            </StyledTableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.slice(page * limit, page * limit + limit).map((element, rowIndex) => (
                                        <TableRow
                                            hover
                                            key={element.id}
                                            sx={{
                                                backgroundColor: rowIndex % 2 === 0 ? 'white' : '#f9f9f9',
                                                '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                                '&:nth-of-type(even)': { backgroundColor: 'white' },
                                                '&:hover': { backgroundColor: '#e0f7fa' },
                                            }}
                                        >
                                            {headers.map(
                                                (header, subIndex) => (
                                                    <StyledTableCell
                                                        key={subIndex}
                                                    >
                                                        {header.accessor ===
                                                            'status' ? (
                                                            <Chip
                                                                label={isActive(
                                                                    element[
                                                                    header
                                                                        .accessor
                                                                    ]
                                                                )
                                                                    ? t(
                                                                        'Activo'
                                                                    )
                                                                    : t(
                                                                        'Inactivo'
                                                                    )}
                                                                color={
                                                                    isActive(
                                                                        element[
                                                                        header
                                                                            .accessor
                                                                        ]
                                                                    )
                                                                        ? 'success'
                                                                        : 'error'
                                                                }
                                                                sx={{
                                                                    fontWeight:
                                                                        'bold',
                                                                }}
                                                            />
                                                        ) : (
                                                            <Typography
                                                                noWrap
                                                                variant="h6"
                                                                sx={{
                                                                    whiteSpace: 'normal',
                                                                    wordBreak: 'break-word',
                                                                    overflowWrap: 'break-word',
                                                                }}
                                                                fontWeight={
                                                                    500
                                                                }
                                                            >
                                                                {header.onMap
                                                                    ? header.onMap(
                                                                        element[
                                                                        header
                                                                            .accessor
                                                                        ]
                                                                    )
                                                                    : element[
                                                                    header
                                                                        .accessor
                                                                    ] ||
                                                                    header.defect}
                                                            </Typography>
                                                        )}
                                                    </StyledTableCell>
                                                )
                                            )}
                                            {isActionsEnabled && (
                                                <StyledTableCell align="center">
                                                    <IconButton
                                                        onClick={(e) => handleMenuOpen(e, element)}
                                                        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                                                    >
                                                        <MoreHorizIcon fontSize="small" />
                                                    </IconButton>
                                                </StyledTableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box pt={2}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center">
                            <Typography sx={{ mx: 1 }}>
                                {`Mostrando: ${startItemIndex} a ${endItemIndex} de ${data.length}`}
                            </Typography>
                            <IconButton
                                onClick={() => handlePageChange(null, Math.max(0, page - 1))}
                                disabled={page === 0}
                            >
                                <NavigateBeforeIcon />
                            </IconButton>
                            <Typography sx={{ mx: 1 }}>{`Página `}</Typography>
                            <Select
                                name="pageSelect" // Agregar name
                                labelId="page-select-label"
                                id="page-select"
                                value={page}
                                onChange={(e) => handlePageChange(null, parseInt(e.target.value as string, 10))}
                                sx={{ width: 55, height: 30 }}
                            >
                                {Array.from(Array(totalPages).keys()).map((pageIndex) => (
                                    <MenuItem key={pageIndex}
                                        value={pageIndex}>
                                        {pageIndex + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Typography sx={{ mx: 1 }}>{` de ${totalPages}`}</Typography>
                            <IconButton
                                onClick={() => handlePageChange(null, Math.min(totalPages - 1, page + 1))}
                                disabled={page >= totalPages - 1}
                            >
                                <NavigateNextIcon />
                            </IconButton>
                        </Box>
                        <Menu anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            keepMounted
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            sx={{ width: 200 }}
                        >
                            {actions.map((action, index) => (
                                <MenuItem key={index}
                                    onClick={() => handleActionClick(action)}>
                                    {action.label}
                                </MenuItem>
                            ))}
                        </Menu>
                        {modalContent && (
                            <GenericModal
                                open={Boolean(modalContent)}
                                title={modalContent.title}
                                description={modalContent.description}
                                icon={modalContent.icon}
                                onConfirm={modalContent.onConfirm}
                                onClose={handleModalClose}
                                type={modalContent.type}
                            />
                        )}

                    </Box>
                </>
            )}
        </>
    );
};

export default BasicTableComponent;
