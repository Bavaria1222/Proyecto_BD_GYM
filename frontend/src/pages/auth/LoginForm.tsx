import { zodResolver } from '@hookform/resolvers/zod';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { RouterLink } from 'src/components/base/router-link';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import { routes } from 'src/router/routes';
import { z as zod } from 'zod';
import { Login } from 'src/domain/login';
const schema = zod.object({
  username: zod.string().min(1, { message: 'Nombre de usuario requerido' }),
  password: zod.string().min(1, { message: 'Contraseña requerida' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  username: '',
  password: '',
} satisfies Values;

export function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values): Promise<void> => {
    setIsPending(true);
    try {
      await Login(values.username, values.password);
      console.log(values.username, values.password);
      navigate('/');
    } catch (e) {
      setError('root', {
        type: 'server',
        message: 'Credenciales inválidas',
      });
    }
    setIsPending(false);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="sm">
        <Typography align="center"
          variant="h3"
          gutterBottom>
          Iniciar sesión
        </Typography>
        <Typography align="center"
          variant="h6"
          fontWeight={400}>
          Acceda a su cuenta para continuar
        </Typography>
      </Container>
      <Stack mt={{ xs: 2, sm: 3 }}
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, sm: 3 }}>
        <Container maxWidth="sm">
          <Grid container
            spacing={2}>
            <Grid xs={12}>
              <FormControl fullWidth
                error={Boolean(errors.username)}>
                <Typography variant="h6"
                  gutterBottom
                  component="label"
                  htmlFor="username-input"
                  fontWeight={500}>
                  Nombre de Usuario
                </Typography>
                <FilledInput
                  hiddenLabel
                  {...register('username')}
                  type="text"
                  id="username-input"
                  placeholder="Escriba su nombre de usuario"
                />
                {errors.username && <FormHelperText>{errors.username.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth
                error={Boolean(errors.password)}>
                <Typography variant="h6"
                  gutterBottom
                  component="label"
                  htmlFor="password-input"
                  fontWeight={500}>
                  Contraseña
                </Typography>
                <FilledInput
                  hiddenLabel
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password-input"
                  placeholder="Escriba su contraseña"
                  endAdornment={
                    <InputAdornment position="end">
                      <ButtonIcon
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: -0.8 }}
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </ButtonIcon>
                    </InputAdornment>
                  }
                />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Button disabled={isPending}
                variant="contained"
                type="submit"
                size="large"
                fullWidth>
                Acceder
              </Button>
            </Grid>
            {errors.root && (
              <Grid xs={12}>
                <Alert variant="outlined"
                  severity="error">
                  {errors.root.message}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Container>
      </Stack>
    </form>
  );
}
