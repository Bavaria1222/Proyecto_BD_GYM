import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { RtlDirection } from 'src/components/base/rtl-direction';
import { Toastr } from 'src/components/base/toastr';
import { CustomizationConsumer, CustomizationProvider } from 'src/contexts/customization';
import { useNprogress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import 'src/i18n/i18n';
import 'src/global.css';
import { Helmet } from 'react-helmet-async';
import { SidebarProvider, useSidebarContext } from 'src/contexts/sidebar-context';
import { routesOutlets } from 'src/router';

export const App: FC = () => {
  useNprogress();

  const router = useRoutes(routesOutlets);

  const RenderComponent = () => {
    const { isSidebarCollapsed, isSidebarHovered } = useSidebarContext();

    if (!isSidebarCollapsed || !isSidebarHovered) {
      // return null;
    }

    return router;
  };

  return (
    <SidebarProvider>
      <CustomizationProvider>
        <CustomizationConsumer>
          {(settings) => {
            if (!settings.isInitialized) {
              // return null
            }

            const theme = createTheme({
              colorPreset: settings.colorPreset,
              direction: settings.direction,
              paletteMode: settings.paletteMode,
              layout: settings.layout,
            });

            return (
              <ThemeProvider theme={theme}>
                <Helmet>
                  <meta
                    name="color-scheme"
                    content={settings.paletteMode}
                  />
                  <meta
                    name="theme-color"
                    content={theme.palette.primary.main}
                  />
                </Helmet>
                <RtlDirection direction={settings.direction}>
                  <CssBaseline />
                  <RenderComponent />
                  <Toastr />
                </RtlDirection>
              </ThemeProvider>
            );
          }}
        </CustomizationConsumer>
      </CustomizationProvider>
    </SidebarProvider>
  );
};

export default App;
