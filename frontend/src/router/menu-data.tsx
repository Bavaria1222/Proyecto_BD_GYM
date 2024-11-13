import ArchiveIcon from '@heroicons/react/24/outline/ArchiveBoxIcon';
import BoltIcon from '@heroicons/react/24/outline/BoltIcon';
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon';
import ClipboardDocumentCheckIcon from '@heroicons/react/24/outline/ClipboardDocumentCheckIcon';
import JournalIcon from '@heroicons/react/24/outline/ClipboardDocumentIcon';
import CogIcon from '@heroicons/react/24/outline/CogIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentMagnifyingGlassIcon';
import ReportIcon from '@heroicons/react/24/outline/FlagIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem } from 'src/router/menuItem';
import { routes } from 'src/router/routes';

export const useMenuItems = (): MenuItem[] => {
  const { t } = useTranslation();
  return useMemo(() => {
    return [
      {
        title: '',
        subMenu: [
          {
            title: 'Inicio',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <HomeIcon />
              </Box>
            ),
            route: routes.index,
          },
          {
            title: 'Gimnasios',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <UserIcon />
              </Box>
            ),
            route: routes.gimnasios,
          },
          {
            title: 'Clientes',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <UserIcon />
              </Box>
            ),
            route: routes.dummy,
          },
          {
            title: 'Empleados',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <UserIcon />
              </Box>
            ),
            route: routes.empleados,
          },
          {
            title: 'Membresías',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <ClipboardDocumentCheckIcon />
              </Box>
            ),
            route: routes.membresias,
          },
          {
            title: 'Rutina',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <BoltIcon />
              </Box>
            ),
            route: routes.dummy,
          },
          {
            title: 'Máquinas',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <CogIcon />
              </Box>
            ),
            route: routes.maquinas,
          },
          {
            title: 'Bitácora',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <JournalIcon />
              </Box>
            ),
            route: routes.dummy,
          },
          {
            title: 'Cursos',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <BookOpenIcon />
              </Box>
            ),
            subMenu: [
              {
                title: 'Listado de Cursos',
                route: routes.dummy,
              },
              {
                title: 'Historial de Cursos',
                route: routes.dummy,
              },
            ],
          },
        ],
      },
    ];
  }, [t]);
};
