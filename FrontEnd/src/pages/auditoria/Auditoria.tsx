import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import GetAuditoria from 'src/domain/auditoria/GetAuditoria';

export interface AuditoriaEntry {
  username: string;
  tabla: string;
  accion: string;
  fechaHora: string;
  returncode: number;
  osUsername: string;
  userhost: string;
}

export function Auditoria(): React.JSX.Element {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [auditoriaData, setAuditoriaData] = useState<AuditoriaEntry[]>([]);
  const [error, setError] = useState('');

  const fetchAuditoriaData = async () => {
    setError('');
    try {
      const data = await GetAuditoria(fechaInicio, fechaFin);
      setAuditoriaData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Error al obtener los datos de auditoría');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>Bitácora de Auditoría</Typography>
      
      <TextField
        label="Fecha de Inicio"
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fecha de Fin"
        type="date"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={fetchAuditoriaData} fullWidth>
        Consultar Auditoría
      </Button>
      
      {error && <Typography color="error">{error}</Typography>}
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Tabla</TableCell>
            <TableCell>Acción</TableCell>
            <TableCell>Fecha y Hora</TableCell>
            <TableCell>Código de Retorno</TableCell>
            <TableCell>OS Usuario</TableCell>
            <TableCell>Host</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {auditoriaData.map((entry, index) => (
    <TableRow key={`${entry.username}-${entry.fechaHora}-${entry.accion}-${index}`}>
      <TableCell>{entry.username}</TableCell>
      <TableCell>{entry.tabla}</TableCell>
      <TableCell>{entry.accion}</TableCell>
      <TableCell>{entry.fechaHora}</TableCell>
      <TableCell>{entry.returncode}</TableCell>
      <TableCell>{entry.osUsername}</TableCell>
      <TableCell>{entry.userhost}</TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
    </Container>
  );
}
