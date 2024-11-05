import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, Button, Container, Divider, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'src/components/base/helmet';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';

const Page = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Helmet heading="Homepage" />
      <Box
        component="main"
        flex={1}
        display="flex"
        flexDirection="column"
        py={{ xs: 2, sm: 3 }}
      >
        <Container
          disableGutters
          maxWidth="xl"
        >
          <PageHeading
            sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}
            title="Homepage"
            description="This is the Home page for the starter template"
            actions={
              <>
                <Button
                  sx={{ mt: { xs: 2, md: 0 } }}
                  variant="contained"
                  startIcon={<FileDownloadOutlinedIcon fontSize="small" />}
                >
                  {t('Export')}
                </Button>
              </>
            }
            iconBox={
              <AvatarState
                isSoft
                variant="rounded"
                state="primary"
                sx={{
                  height: theme.spacing(7),
                  width: theme.spacing(7),
                  svg: {
                    height: theme.spacing(4),
                    width: theme.spacing(4),
                    minWidth: theme.spacing(4),
                  },
                }}
              >
                <ChartBarIcon />
              </AvatarState>
            }
          />
          <Divider />
          <Box
            px={{ xs: 2, sm: 3 }}
            pt={{ xs: 2, sm: 3 }}
          >
            <Typography
              gutterBottom
              variant="h4"
            >
              This is the Home page for the starter template
            </Typography>
            <Typography variant="subtitle1">
              In the starter kits you will find a simple, clean and organized folder structure;
              components, pages, modules, layouts, routes, and other folders.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
