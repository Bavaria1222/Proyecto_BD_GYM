import ArchiveIcon from '@heroicons/react/24/outline/ArchiveBoxIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentMagnifyingGlassIcon';
import ReportIcon from '@heroicons/react/24/outline/FlagIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import ClipboardDocumentCheckIcon from '@heroicons/react/24/outline/ClipboardDocumentCheckIcon';
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon';
import JournalIcon from '@heroicons/react/24/outline/ClipboardDocumentIcon';
import BoltIcon from '@heroicons/react/24/outline/BoltIcon';
import CogIcon from '@heroicons/react/24/outline/CogIcon';

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
              <Box width={24}
                height={24}>
                <HomeIcon />
              </Box>
            ),
            route: routes.index,
          },
          {
            title: 'Clientes',
            icon: (
              <Box width={24}
                height={24}>
                <UserIcon />
              </Box>
            ),
            route: routes.dummy,
          },
          {
            title: 'Empleados',
            icon: (
              <Box width={24}
                height={24}>
                <UserIcon />
              </Box>
            ),
            route: routes.dummy,
          },
          {
            title: 'Membresías',
            icon: (
              <Box width={24}
                height={24}>
                <ClipboardDocumentCheckIcon />
              </Box>
            ),
            route: routes.dummy,
          },
          {
            title: 'Rutina',
            icon: (
              <Box width={24}
                height={24}>
                <BoltIcon />
              </Box>
            ),
            route: routes.dummy,
          },
          {
            title: 'Máquinas',
            icon: (
              <Box width={24}
                height={24}>
                <CogIcon />
              </Box>
            ),
            route: routes.dummy,
          },
          {
            title: 'Bitácora',
            icon: (
              <Box width={24}
                height={24}>
                <JournalIcon />
              </Box>
            ),
            route: routes.dummy,
          },
          {
            title: 'Cursos',
            icon: (
              <Box width={24}
                height={24}>
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
