import { alpha, Box, Container, Grid, IconButton, Paper, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from 'src/components/base/logo';

const landscapeImages = [
  '/placeholders/covers/landscape1.png',
  '/placeholders/covers/landscape2.png',
  '/placeholders/covers/landscape3.png',
  '/placeholders/covers/landscape4.png',
  '/placeholders/covers/landscape5.png',
  '/placeholders/covers/landscape6.png',
  '/placeholders/covers/landscape7.png',
  '/placeholders/covers/landscape8.png',
];

const CardActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  zIndex: 12,
}));

const BoxComposedContent = styled(Box)(() => ({
  position: 'relative',
  zIndex: 7,
}));

const BoxComposedImage = styled(Box)(() => ({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 5,
  filter: 'grayscale(80%)',
  backgroundSize: 'cover',
  height: '100%',
  width: '100%',
  borderRadius: 'inherit',
}));

const BoxComposedBg = styled(Box)(() => ({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 6,
  height: '100%',
  width: '100%',
  borderRadius: 'inherit',
}));

const IconButtonWrapper = styled(IconButton)(({ theme }) => ({
  background: 'transparent',
  transition: theme.transitions.create(['all']),
  color: alpha(theme.palette.common.white, 0.7),
  borderRadius: '50px',

  '&:hover': {
    background: 'transparent',
    color: theme.palette.common.white,
  },
}));

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps): React.JSX.Element {
  const { t } = useTranslation();
  // Estado para almacenar la imagen de fondo actual
  const [backgroundImage, setBackgroundImage] = useState(getRandomImage());

  // Función para obtener una imagen aleatoria de la lista
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * landscapeImages.length);
    return landscapeImages[randomIndex];
  }

  // Función para cambiar la imagen de fondo a una nueva imagen aleatoria
  function changeBackgroundImage() {
    const newImage = getRandomImage();
    setBackgroundImage(newImage);
  }

  return (
    <React.Fragment>
      <Grid
        container
        minHeight={'100%'}
      >
        <Grid
          item
          xs={12}
          sm={3}
          md={6}
        >
          <Box
            display="flex"
            alignItems="center"
            position="relative"
            sx={{
              width: '100%',
              position: 'relative',
              minHeight: '100%',
              background: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%) !important',
            }}
          >
            <BoxComposedBg
              sx={{
                opacity: 0.3,
                background: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)',
              }}
            />
            <BoxComposedImage
              sx={{
                opacity: 0.8,
                backgroundImage: (theme) =>
                  theme.palette.mode === 'dark'
                    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${backgroundImage}")`
                    : `url("${backgroundImage}")`,
              }}
              onClick={changeBackgroundImage} // Cambiar la imagen al hacer clic en ella o cuando se hace el llamdo a la clase
            />
            <BoxComposedContent
              display="flex"
              flexGrow={1}
              alignItems="center"
              flexDirection="column"
              px={{ xs: 0, sm: 3, lg: 6, xl: 8 }}
              py={{ xs: 2, sm: 3, lg: 6, xl: 8 }}
            >
              <Container
                sx={{
                  flexDirection: 'column',
                  display: { xs: 'flex', sm: 'none', md: 'flex' },
                }}
                maxWidth="sm"
              >
                <Box
                  display="flex"
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                  sx={{
                    '& > *': { transform: 'scale(1.3)' },
                  }}
                >
                  <Logo
                    dark
                    isLinkStatic
                  />
                </Box>

              </Container>
            </BoxComposedContent>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            py={{ xs: 2, sm: 3 }}
            mx={{ xl: 6 }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
