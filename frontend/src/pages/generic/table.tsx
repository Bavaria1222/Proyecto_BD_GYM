import React, { useState, useEffect, ChangeEvent, FC, useCallback } from 'react';
import {
    Alert,
    Box,
    Stack,
    TextField,
    InputAdornment,
    TableContainer,
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BasicTableComponent from './basic-table';
import { TActions, ModalTypes } from 'src/models/action-types';

interface CandyTableProps {
    headers: THeader[];
    searchAccessor?: string;
    showFilter: boolean;
    isActionsEnabled: boolean;
    actions?: TActions[];
    onLoadData: () => Promise<any[]>;
    onSelectItem?: (row: any) => void;
}

interface THeader {
    accessor: string;
    label: string;
    width: number;
    onMap?: (value: any) => any;
    defect?: string;
}

const CandyTable: FC<CandyTableProps> = ({
    headers,
    searchAccessor,
    showFilter,
    isActionsEnabled,
    onLoadData,
    actions,
    onSelectItem,
}) => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const { t } = useTranslation();
    const navigate = useNavigate();

    const loadData = useCallback(async () => {
        try {
            setIsLoading(true);
            const loadedData = await onLoadData();
            setData(loadedData);
            setFilteredData(loadedData);
            setIsLoading(false);
        } catch (err) {
            setError('No se pudieron cargar los datos');
            setIsLoading(false);
        }
    }, [onLoadData]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();

        const filtered = data.filter(item => {
            if (searchAccessor && searchAccessor.trim() !== '') {
                return item[searchAccessor]?.toString().toLowerCase().includes(lowercasedSearchTerm);
            } else {
                return Object.values(item).some(value =>
                    value?.toString().toLowerCase().includes(lowercasedSearchTerm)
                );
            }
        });

        setFilteredData(filtered);
    }, [searchTerm, data, searchAccessor]);

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    return (
        <>
            {error && (
                <Stack sx={{ marginBottom: 2 }}>
                    <Alert severity="error">{error}</Alert>
                </Stack>
            )}
            {showFilter && (
                <TextField
                    value={searchTerm}
                    onChange={handleQueryChange}
                    placeholder={t('Buscar...')}
                    size="small"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchTwoToneIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        marginBottom: 2,
                        width: '80%',
                        maxWidth: 300,
                    }}
                />
            )}
            <BasicTableComponent
                data={filteredData}
                headers={headers}
                isActionsEnabled={isActionsEnabled}
                actions={actions}
                onReloadData={loadData}
                onSelectItem={onSelectItem}
            />
        </>
    );
};


export default CandyTable;
