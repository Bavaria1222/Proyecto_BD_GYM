import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TransactionModalManager from 'src/pages/generic/modal-confirmation';
import { routes } from 'src/router/routes';
import CandyPage from '../generic/page';
import { PostMaquina } from 'src/domain/maquinas/PostMaquina'; // Import the machine creation function
import GetMaquina from 'src/domain/maquinas/GetMaquina'; // Import the function to get a single machine

const Maquina = () => {
  const params = useParams();
  const location = useLocation();
  const isViewMode = location.pathname.includes('view');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    idMaquina: '',
    estado: '',
  });

  const [titulo, setTitulo] = useState<string>('Agregar');
  const maxNombreCharacters = 100;
  const maxDescripcionCharacters = 250;
  
  interface Maquina {
    nombre: string;
    descripcion: string;
    idMaquina: string;
    estado: string;
  }

  // Función para cargar la máquina si params.id está presente
  const loadMaquina = async (id: string) => {
    const maquina = await GetMaquina(id) as Maquina;
    setFormData({
      nombre: maquina.nombre,
      descripcion: maquina.descripcion,
      idMaquina: maquina.idMaquina,
      estado: maquina.estado,
    });
  };

  // Verificar si se trata de una edición o una creación
  const checkMaquina = () => {
    const idMaquina = params.id;
    if (idMaquina) {
      setTitulo('Editar');
      loadMaquina(idMaquina);
    }
  };

  useEffect(() => {
    checkMaquina();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const maquinaId = params.id;

    const dataToSend = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      idMaquina: formData.idMaquina,
      estado: formData.estado,
    };

    if (maquinaId) {
      try {
        console.log('Updating machine:', dataToSend);
        // Aquí va la llamada a la API para actualizar, por ejemplo:
        //await PatchMaquina(maquinaId, dataToSend);
      } catch (error) {
        console.log('Error updating machine:', error);
      }
    } else {
      try {
        console.log('Creating machine:', dataToSend);
        // Aquí va la llamada a la API para crear, por ejemplo:
        await PostMaquina(dataToSend);
      } catch (error) {
        console.log('Error creating machine:', error);
      }
    }
  };

  const navigateAfterSuccess = () => {
    navigate(routes.maquinas);
  };

  const handleCancel = () => {
    navigate(routes.maquinas);
  };
  
  const breadcrumbs = [
    { label: 'Maquinas', bold: true, route: routes.maquinas, underline: true },
    { label: `${titulo} maquina`, bold: true },
  ];

  return (
    <CandyPage
      title={`${titulo} Maquina`}
      breadcrumbs={breadcrumbs}
      isExportable={false}
    >
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID Máquina"
              name="idMaquina"
              value={formData.idMaquina}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
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

export default Maquina;
