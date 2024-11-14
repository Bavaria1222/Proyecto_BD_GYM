import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TransactionModalManager from 'src/pages/generic/modal-confirmation';
import { routes } from 'src/router/routes';
import CandyPage from '../generic/page';
import { PostEmpleado } from 'src/domain/empleados/PostEmpleado';
import PatchEmpleado from 'src/domain/empleados/PatchEmpleado';
import GetUser from 'src/domain/empleados/GetEmpleado';


const Empleado = () => {
  const params = useParams();
  const location = useLocation();
  const isViewMode = location.pathname.includes('view');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido1: '',
    apellido2: '',
    cedula: '',
    password: '',
    telHabitacion: '',
    fechaContratacion: '',
    email: '',
    rol: '',
    estado: '',
  });

  const [titulo, setTitulo] = useState<string>('Agregar');
  const maxNombreCharacters = 100;
  const maxDescripcionCharacters = 250;
  interface Empleado {
    nombre: string;
    apellido1: string;
    apellido2: string;
    cedula: string;
    password?: string;
    telHabitacion: string;
    fechaContratacion: string;
    email: string;
    rol: string;
    estado: string;
  }
  // Función para cargar el empleado si params.id está presente
  const loadUser = async (id: string) => {
    const empleado = await GetUser(id) as Empleado;
    setFormData({
      nombre: empleado.nombre,
      apellido1: empleado.apellido1,
      apellido2: empleado.apellido2,
      cedula: empleado.cedula,
      password: '',
      telHabitacion: empleado.telHabitacion,
      fechaContratacion: empleado.fechaContratacion,
      email: empleado.email,
      rol: empleado.rol,
      estado: empleado.estado,
    });
  };

  // Verificar si se trata de una edición o una creación
  const checkUser = () => {
    const userId = params.id;
    if (userId) {
      setTitulo('Editar');
      loadUser(userId);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const userId = params.id;

    const dataToSend = {
      nombre: formData.nombre,
      apellido1: formData.apellido1,
      apellido2: formData.apellido2,
      cedula: formData.cedula,
      password: formData.password,
      telHabitacion: parseInt(formData.telHabitacion),
      fechaContratacion: formData.fechaContratacion,
      email: formData.email,
      rol: formData.rol,
      estado: formData.estado,
    };

    if (userId) {
      try {
        console.log('Updating employee:', dataToSend);
        // Aquí va la llamada a la API para actualizar, por ejemplo:
        await PatchEmpleado(userId, dataToSend);
      } catch (error) {
        console.log('Error updating employee:', error);
      }
    } else {
      try {
        console.log('Creating employee:', dataToSend);
        // Aquí va la llamada a la API para crear, por ejemplo:
        await PostEmpleado(dataToSend);
      } catch (error) {
        console.log('Error creating employee:', error);
      }
    }
  };

  const navigateAfterSuccess = () => {
    navigate(routes.empleados);
  };

  const handleCancel = () => {
    navigate(routes.empleados);
  };
  const breadcrumbs = [
    { label: 'Empleados', bold: true, route: routes.empleados, underline: true },
    { label: `${titulo} empleado`, bold: true },
  ];
  return (
    <CandyPage
      title={`${titulo} Empleado`}
      breadcrumbs={breadcrumbs}
      isExportable={false}
    >
      <Box
        component="form"
        sx={{ mt: 3 }}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Primer Apellido"
              name="apellido1"
              value={formData.apellido1}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Segundo Apellido"
              name="apellido2"
              value={formData.apellido2}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Cédula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Teléfono Habitación"
              name="telHabitacion"
              value={formData.telHabitacion}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Fecha de Contratación"
              name="fechaContratacion"
              type="date"
              value={formData.fechaContratacion}
              onChange={handleChange}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Correo Electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              label="Estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 5, mb: 4 }}>
          <TransactionModalManager
            onSave={handleSave}
            onSuccessNavigate={navigateAfterSuccess}
            onCancel={handleCancel}
          />
        </Box>
      </Box>
    </CandyPage>
  );
};

export default Empleado;
