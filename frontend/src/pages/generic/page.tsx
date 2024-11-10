import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, Container, useTheme, Card, Typography, Grid } from '@mui/material';
import { FC } from 'react';
import { Helmet } from 'src/components/base/helmet';
import PageHeading from 'src/components/base/page-heading';
import * as XLSX from 'xlsx';
import CandyButton from './button-export';
import RedirectButton from './button-redirect';
import CustomBreadcrumbs from './bread-crumbs';

interface BreadcrumbItem {
    label: string;
    route?: string;
    bold?: boolean;
    underline?: boolean;
}

interface CandyPageProps {
    title?: string;
    description?: string;
    isExportable: boolean;
    outputFileName?: string;
    onLoadData?: () => Promise<any>;
    breadcrumbs?: BreadcrumbItem[];
    redirectLabel?: string;
    redirectTo?: any;
    children: any;
}

const CandyPage: FC<CandyPageProps> = ({
    title,
    description,
    isExportable,
    outputFileName,
    onLoadData,
    breadcrumbs,
    redirectLabel,
    redirectTo,
    children,
}) => {
    const theme = useTheme();

    const exportToExcel = async (fileName: string) => {
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = 'xlsx';
        const data = await onLoadData();
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: fileExtension, type: 'array' });
        const buffer = new Blob([excelBuffer], { type: fileType });
    };

    return (
        <>
            <Helmet heading={title} />
            <Box
                component="main"
                display="flex"
                flexDirection="column"
                minHeight="100%"
                sx={{ backgroundColor: '#E9E9E9' }}
            >
                <Container
                    disableGutters
                    maxWidth="xl"
                    sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    {breadcrumbs && (
                        <Box sx={{ alignSelf: 'flex-start', ml: 2, mt: 1.5 }}>
                            <CustomBreadcrumbs items={breadcrumbs} />
                        </Box>
                    )}
                    <Grid container
                        spacing={2}
                        sx={{ width: '100%', mt: 0 }}>
                        <Grid item
                            xs={12}
                        >
                            <Card
                                sx={{
                                    backgroundColor: 'white',
                                    padding: 2,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                }}
                            >
                                <PageHeading
                                    sx={{
                                        px: { xs: 2, sm: 3 },
                                        pb: { xs: 2, sm: 3 },
                                    }}
                                    title={title}
                                    description={description}
                                    actions={
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: theme.spacing(1),
                                            }}
                                        >
                                            {redirectLabel && redirectTo && (
                                                <RedirectButton label={redirectLabel}
                                                    to={redirectTo} />
                                            )}
                                            {isExportable && (
                                                <CandyButton
                                                    label="Exportar"
                                                    icon={<FileDownloadOutlinedIcon fontSize="small" />}
                                                    onClick={() => {
                                                        exportToExcel(outputFileName);
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    }

                                />
                                <Box
                                    px={{ xs: 2, sm: 3 }}
                                    flex={1}
                                >
                                    {children}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                <Box
                    py={1}
                    textAlign="center"
                    sx={{ backgroundColor: '#E9E9E9' }}
                >
                    <Typography variant="body2"
                        color="textSecondary">
                        INAMU Costa Rica Copyright - Todos los derechos reservados
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default CandyPage;
