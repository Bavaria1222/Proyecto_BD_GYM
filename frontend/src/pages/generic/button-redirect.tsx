import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface RedirectButtonProps {
    label: string;
    to: string;
}


const ButtonRedirect: FC<RedirectButtonProps> = ({ label, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <Button

            variant="contained"
            onClick={handleClick}
        >
            {label}
        </Button>
    );
};

export default ButtonRedirect;
