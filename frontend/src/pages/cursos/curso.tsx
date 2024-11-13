import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TransactionModalManager from 'src/pages/generic/modal-confirmation';
import { routes } from 'src/router/routes';
import CandyPage from '../generic/page';
import { PostCurso } from 'src/domain/cursos/PostCurso'; // Asume que esta función existe
import PatchCurso from 'src/domain/cursos/PatchCurso'; // Asume que esta función existe
import GetCurso from 'src/domain/cursos/GetCurso'; // Asume que esta función existe

const Curso = () => {
  const params = useParams();
  const location = useLocation();
  const isViewMode = location.pathname.includes('view');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    instructorId: '', // Puedes agregar un campo de instructor si lo necesitas
    descripcion: '',
    horario: '',
    disponibilidad: '',
  });

  const [titulo, setTitulo] = useState<string>('Agregar');
  const maxNombreCharacters = 100;
  const maxDescripcionCharacters = 250;
  interface Curso {
    instructorId: string, // Puedes agregar un campo de instructor si lo necesitas
    descripcion: string,
    horario: string,
    disponibilidad: string,
  }

  // Función para cargar el curso si params.id está presente
  const loadCurso = async (id: string) => {
    const curso = await GetCurso(id); // Aquí debes obtener los datos del curso
    setFormData({
      instructorId: curso.instructorId, // Si tienes un campo para el instructor
      descripcion: curso.descripcion,
      horario: curso.horario,
      disponibilidad: curso.disponibilidad,
    });
  };

  // Verificar si se trata de una edición o una creación
  const checkCurso = () => {
    const cursoId = params.id;
    if (cursoId) {
      setTitulo('Editar');
      loadCurso(cursoId);
    }
  };

  useEffect(() => {
    checkCurso();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const cursoId = params.id;

    const dataToSend = {
      instructorId: formData.instructorId,
      descripcion: formData.descripcion,
      horario: formData.horario,
      disponibilidad: formData.disponibilidad,
    };

    if (cursoId) {
      try {
        console.log('Updating course:', dataToSend);
        // Aquí va la llamada a la API para actualizar el curso
        await PatchCurso(cursoId, dataToSend);
      } catch (error) {
        console.log('Error updating course:', error);
      }
    } else {
      try {
        console.log('Creating course:', dataToSend);
        // Aquí va la llamada a la API para crear el curso
        await PostCurso(dataToSend);
      } catch (error) {
        console.log('Error creating course:', error);
      }
    }
  };

  const navigateAfterSuccess = () => {
    navigate(routes.cursos);
  };

  const handleCancel = () => {
    navigate(routes.cursos);
  };

  const breadcrumbs = [
    { label: 'Cursos', bold: true, route: routes.cursos, underline: true },
    { label: `${titulo} curso`, bold: true },
  ];

  return (
    <CandyPage
      title={`${titulo} Curso`}
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
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
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
              label="Horario"
              name="horario"
              value={formData.horario}
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
              label="Disponibilidad"
              name="disponibilidad"
              value={formData.disponibilidad}
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
              label="Instructor"
              name="instructor"
              value={formData.instructorId}
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

export default Curso;
