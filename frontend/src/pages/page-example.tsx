import CogIcon from '@heroicons/react/24/outline/CogIcon';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'src/components/base/helmet';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';

const Page = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Helmet heading="Another Page" />
      <Box
        sx={{ py: { xs: 2, sm: 3 } }}
        component="main"
        flex={1}
        display="flex"
        flexDirection="column"
      >
        <PageHeading
          sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}
          title="Another Page"
          description="This is a page example for the starter template"
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
              variant="rounded"
              state="error"
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
              <CogIcon />
            </AvatarState>
          }
        />
        <Divider />
        <Container
          disableGutters
          maxWidth="md"
        >
          <Box pt={{ xs: 2, sm: 3 }}>
            <Typography
              align="center"
              sx={{ mb: 2 }}
              variant="h4"
            >
              This is another page example for the starter template
            </Typography>
            <Card>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  align="center"
                  color="text.secondary"
                >
                  As an example, this page has a different layout arrangement than the homepage.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
