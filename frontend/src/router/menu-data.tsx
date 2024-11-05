import ArchiveIcon from '@heroicons/react/24/outline/ArchiveBoxIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentMagnifyingGlassIcon';
import ReportIcon from '@heroicons/react/24/outline/FlagIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
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
        title: 'Dashboard',
        subMenu: [
          {
            title: 'Home',
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
            title: 'Another page',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <ReportIcon />
              </Box>
            ),
            route: routes.pageExample,
          },
          {
            title: 'Dropdown menu',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <DocumentIcon />
              </Box>
            ),
            subMenu: [
              {
                title: 'Listings',
                route: routes.dummy,
              },
              {
                title: 'Reviews',
                route: routes.dummy,
              },
              {
                title: 'Files',
                subMenu: [
                  {
                    title: 'Reports',
                    route: routes.dummy,
                  },
                  {
                    title: 'Logs',
                    route: routes.dummy,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Archive',
        subMenu: [
          {
            title: 'Old Docs',
            icon: (
              <Box
                width={24}
                height={24}
              >
                <ArchiveIcon />
              </Box>
            ),
            route: routes.dummy,
          },
        ],
      },
    ];
  }, [t]);
};
