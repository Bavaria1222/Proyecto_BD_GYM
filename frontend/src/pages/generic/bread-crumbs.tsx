import { Breadcrumbs, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { routes } from 'src/router/routes';

interface BreadcrumbItem {
    label: string;
    route?: string;
    bold?: boolean;
    underline?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const CustomBreadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {

    return (
        <Breadcrumbs aria-label="breadcrumb"
        >
            {items.map((item, index) => (
                <div key={index}>
                    {item.route ? (
                        <Link
                            underline="hover"
                            color="inherit"
                            href={item.route}
                            sx={{
                                fontWeight: item.bold ? 'bold' : 'normal',
                                textDecoration: item.underline ? 'underline' : 'none'
                            }}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <Typography
                            color="textPrimary"
                            sx={{
                                fontWeight: item.bold ? 'bold' : 'normal',
                                textDecoration: item.underline ? 'underline' : 'none'
                            }}
                        >
                            {item.label}
                        </Typography>
                    )}
                </div>
            ))}
        </Breadcrumbs>
    );
};

export default CustomBreadcrumbs;
