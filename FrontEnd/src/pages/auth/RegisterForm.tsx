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
import { Login } from 'src/domain/login';
import { routes } from 'src/router/routes';
import { AuthClient } from 'src/data/AuthClient';
import { z as zod } from 'zod';

const schema = zod.object({
  nombre: zod.string().min(1, { message: 'Nombre requerido' }),
  apellido1: zod.string().min(1, { message: 'Primer apellido requerido' }),
  apellido2: zod.string().min(1, { message: 'Segundo apellido requerido' }),
  email: zod.string().email({ message: 'Correo inválido' }),
  cedula: zod.string().min(1, { message: 'Cédula requerida' }),
  password: zod.string().min(6, { message: 'Contraseña mínima de 6 caracteres' }),
  telHabitacion: zod.number().optional(),
  celular: zod.number().optional(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  nombre: '',
  apellido1: '',
  apellido2: '',
  email: '',
  cedula: '',
  password: '',
  telHabitacion: 0,
  celular: 0,
} satisfies Values;

export function RegisterForm(): React.JSX.Element {
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
    const authClient = new AuthClient();
    console.log(values); // Log para revisar el contenido antes de enviarlo
    try {
      const result = await authClient.registerClient(values);
      console.log(result.message); // Mostrar mensaje de éxito
      setError('root', {
        type: 'success',
        message: result.message,
      });
      navigate('/login');
    } catch (e) {
      setError('root', {
        type: 'server',
        message: 'Error al registrar el cliente',
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
        <Typography align="center" variant="h3" gutterBottom>
          Registrarse
        </Typography>
        <Typography align="center" variant="h6" fontWeight={400}>
          Cree su cuenta para continuar
        </Typography>
      </Container>
      <Stack mt={{ xs: 2, sm: 3 }} justifyContent="center" alignItems="center" spacing={{ xs: 2, sm: 3 }}>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.nombre)}>
                <Typography variant="h6" gutterBottom component="label" htmlFor="nombre-input" fontWeight={500}>
                  Nombre
                </Typography>
                <FilledInput {...register('nombre')} type="text" id="nombre-input" placeholder="Escriba su nombre" />
                {errors.nombre && <FormHelperText>{errors.nombre.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.apellido1)}>
                <Typography variant="h6" gutterBottom component="label" htmlFor="apellido1-input" fontWeight={500}>
                  Primer Apellido
                </Typography>
                <FilledInput {...register('apellido1')} type="text" id="apellido1-input" placeholder="Escriba su primer apellido" />
                {errors.apellido1 && <FormHelperText>{errors.apellido1.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.apellido2)}>
                <Typography variant="h6" gutterBottom component="label" htmlFor="apellido2-input" fontWeight={500}>
                  Segundo Apellido
                </Typography>
                <FilledInput {...register('apellido2')} type="text" id="apellido2-input" placeholder="Escriba su segundo apellido" />
                {errors.apellido2 && <FormHelperText>{errors.apellido2.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.email)}>
                <Typography variant="h6" gutterBottom component="label" htmlFor="email-input" fontWeight={500}>
                  Correo Electrónico
                </Typography>
                <FilledInput {...register('email')} type="email" id="email-input" placeholder="Escriba su correo" />
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.telHabitacion)}>
                <Typography variant="h6" gutterBottom component="label" htmlFor="telHabitacion-input" fontWeight={500}>
                  Teléfono de Habitación
                </Typography>
                <FilledInput {...register('telHabitacion', { valueAsNumber: true })} type="number" id="telHabitacion-input" placeholder="Escriba su teléfono de habitación" />
                {errors.telHabitacion && <FormHelperText>{errors.telHabitacion.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.celular)}>
                <Typography variant="h6" gutterBottom component="label" htmlFor="celular-input" fontWeight={500}>
                  Celular
                </Typography>
                <FilledInput {...register('celular', { valueAsNumber: true })} type="number" id="celular-input" placeholder="Escriba su celular" />
                {errors.celular && <FormHelperText>{errors.celular.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.cedula)}>
                <Typography variant="h6" gutterBottom component="label" htmlFor="cedula-input" fontWeight={500}>
                  Cédula
                </Typography>
                <FilledInput {...register('cedula')} type="text" id="cedula-input" placeholder="Escriba su cédula" />
                {errors.cedula && <FormHelperText>{errors.cedula.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.password)}>
                <Typography variant="h6" gutterBottom component="label" htmlFor="password-input" fontWeight={500}>
                  Contraseña
                </Typography>
                <FilledInput
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password-input"
                  placeholder="Escriba su contraseña"
                  endAdornment={
                    <InputAdornment position="end">
                      <ButtonIcon variant="outlined" color="secondary" onClick={handlePasswordVisibility}>
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </ButtonIcon>
                    </InputAdornment>
                  }
                />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Button disabled={isPending} variant="contained" type="submit" size="large" fullWidth>
                Registrarse
              </Button>
            </Grid>
            {errors.root && (
              <Grid xs={12}>
                <Alert variant="outlined" severity={errors.root.type === 'success' ? 'success' : 'error'}>
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
