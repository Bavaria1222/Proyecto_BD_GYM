import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'src/components/base/helmet';
import { RouterLink } from 'src/components/base/router-link';
import { AvatarState } from 'src/components/base/styles/avatar';
import { routes } from 'src/router/routes';

export default function Error404Page(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <Helmet heading="404 - Not found" />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Stack
            spacing={2}
            justifyContent="center"
            alignItems="center"
            direction="column"
            textAlign="center"
          >
            <AvatarState
              state="warning"
              isSoft
              sx={{
                width: 84,
                height: 84,
              }}
            >
              <WarningTwoToneIcon fontSize="large" />
            </AvatarState>
            <Stack
              width="100%"
              spacing={{ xs: 2, sm: 3 }}
            >
              <Box>
                <Typography
                  color="text.primary"
                  variant="h2"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    px: { xs: 0, sm: 2, md: 3 },
                  }}
                >
                  Page not found
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="h4"
                  fontWeight={500}
                >
                  We moved the content to a different page
                </Typography>
                <Divider sx={{ my: { xs: 2, sm: 3 } }} />
                <Typography
                  color="text.secondary"
                  variant="h5"
                  fontWeight={500}
                >
                  The search below should help!
                </Typography>
              </Box>
              <FormControl
                variant="outlined"
                fullWidth
              >
                <OutlinedInput
                  type="text"
                  placeholder="Search terms here..."
                  endAdornment={
                    <InputAdornment
                      sx={{ mr: -0.4 }}
                      position="end"
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Divider>
                <Divider
                  sx={{
                    borderWidth: 4,
                    width: 60,
                    borderRadius: 22,
                    borderColor: 'primary.main',
                  }}
                />
              </Divider>
              <Box>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={RouterLink}
                  href={routes.index}
                  startIcon={<WestRoundedIcon />}
                >
                  {t('Go to homepage')}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
