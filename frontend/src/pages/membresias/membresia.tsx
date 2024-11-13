import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TransactionModalManager from 'src/pages/generic/modal-confirmation';
import { routes } from 'src/router/routes';
import CandyPage from '../generic/page';
/*import { PostEmpleado } from 'src/domain/empleados/PostEmpleado';*/
/*import PatchEmpleado from 'src/domain/empleados/PatchEmpleado';*/
import GetMembresia from 'src/domain/membresias/GetMembresia';
import PatchMembresia from 'src/domain/membresias/PatchMembresia';
import { PostMembresia } from 'src/domain/membresias/PostMembresia';


const Membresia = () => {
  const params = useParams();
  const location = useLocation();
  const isViewMode = location.pathname.includes('view');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clienteId: '',
    tipoMembresia: '',
    fechaInicio: '',
    fechaFin: '',
    estado: '',
    monto: '',
  });

  const [titulo, setTitulo] = useState<string>('Agregar');
  const maxNombreCharacters = 100;
  const maxDescripcionCharacters = 250;

  interface Membresia {
    clienteId: string;
    tipoMembresia: string;
    fechaInicio: string;
    fechaFin: string;
    estado: string;
    monto: string;
  }
  // Función para cargar la membresía si params.id está presente
  const loadMembresia = async (id: string) => {
    const membresia = await GetMembresia(id) as Membresia;
    setFormData({
      clienteId: membresia.clienteId,
      tipoMembresia: membresia.tipoMembresia,
      fechaInicio: membresia.fechaInicio,
      fechaFin: membresia.fechaFin,
      estado: membresia.estado,
      monto: membresia.monto,
    });
  };

  // Verificar si se trata de una edición o una creación
  const checkUser = () => {
    const membresiaId = params.id;
    if (membresiaId) {
      setTitulo('Editar');
      loadMembresia(membresiaId);
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
    const membresiaId  = params.id;

    const dataToSend = {
        clienteId: formData.clienteId,
        tipoMembresia: formData.tipoMembresia,
        fechaInicio: formData.fechaInicio,
        fechaFin: formData.fechaFin,
        estado: formData.estado,
        monto: parseFloat(formData.monto), // Convertir monto a número
      };

      if (membresiaId) {
        try {
          console.log('Updating membership:', dataToSend);
          // Aquí va la llamada a la API para actualizar, por ejemplo:
          await PatchMembresia(membresiaId, dataToSend);
        } catch (error) {
          console.log('Error updating membership:', error);
        }
      } else {
        try {
          console.log('Creating membership:', dataToSend);
          // Aquí va la llamada a la API para crear, por ejemplo:
          await PostMembresia(dataToSend);
        } catch (error) {
          console.log('Error creating membership:', error);
        }
      }
    };

    const navigateAfterSuccess = () => {
        navigate(routes.membresias); // Redirige a la lista de membresías
      };
    
      const handleCancel = () => {
        navigate(routes.membresias); // Redirige a la lista de membresías
      };
    
      const breadcrumbs = [
        { label: 'Membresías', bold: true, route: routes.membresias, underline: true },
        { label: `${titulo} membresía`, bold: true },
      ];
      return (
        <CandyPage
          title={`${titulo} Membresía`}
          breadcrumbs={breadcrumbs}
          isExportable={false}
        >
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cliente ID"
                  name="clienteId"
                  value={formData.clienteId}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tipo de Membresía"
                  name="tipoMembresia"
                  value={formData.tipoMembresia}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de Inicio"
                  name="fechaInicio"
                  type="date"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de Fin"
                  name="fechaFin"
                  type="date"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Monto"
                  name="monto"
                  value={formData.monto}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                  type="number"
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

export default Membresia;