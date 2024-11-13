import { AuditoriaClient } from 'src/data/AuditoriaClient';
import { AuditoriaEntry } from 'src/pages/auditoria/Auditoria';

async function GetAuditoria(fechaInicio: string, fechaFin: string): Promise<AuditoriaEntry[]> {
  try {
    const auditoriaClient = new AuditoriaClient();
    const data = await auditoriaClient.getAuditoria(fechaInicio, fechaFin);
    return data as AuditoriaEntry[];
  } catch (error) {
    console.error("Error al obtener auditoría", error);
    throw error;
  }
}

export default GetAuditoria;
