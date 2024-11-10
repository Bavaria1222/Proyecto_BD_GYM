import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Button } from '@mui/material';
import { FC } from 'react';

interface CandyButtonProps {
    label: string;
    icon: any;
    onClick: () => void;
}

const CandyButton: FC<CandyButtonProps> = ({ label, icon, onClick }) => {
    return (
        <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={icon ? icon : <FileDownloadOutlinedIcon fontSize="small" />}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

export default CandyButton;
