import { AuthClient } from './AuthClient';

export class AuditoriaClient extends AuthClient {
  async getAuditoria(fechaInicio: string, fechaFin: string) {
    return this.get(`/auditoria?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }
}
