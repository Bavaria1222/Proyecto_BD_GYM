import { CandyClient, CandyClientOptions } from '@cabysis/candy-client';
import { getToken, isDevelopment } from 'src/utils/constants';

const authOptions: CandyClientOptions = {
  baseUrl: isDevelopment() ? 'http://localhost:8080/api' : 'http://localhost:8080/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  credentials: false,
};

export class AuthClient extends CandyClient {
  constructor() {
    super(authOptions);
  }

  async get<T>(url: string): Promise<T> {
    return super.get<T>(url);
  }

  async post<T>(url: string, data?: any): Promise<T> {
    super.setHeader('X-Client-URL', window.location.href);

    return super.post<T>(url, data);
  }

  async patch<T>(url: string, body?: any): Promise<T> {
    super.setHeader('X-Client-URL', window.location.href);
    return super.patch<T>(url, body);
  }

  async delete<T>(url: string): Promise<T> {
    super.setHeader('X-Client-URL', window.location.href);
    return super.delete<T>(url);
  }

  //auth
  async login(authCredentialsDto) {
    return this.post(`/login`, authCredentialsDto);
  }

  //Empleados
  async getEmpleados() {
    return this.get(`/empleados`);
  }


  async getEmpleado(id: string) {
    return this.get(`/cedula/${id}`);
  }

  async postEmpleados(empleadoDto) {
    return this.post(`/agregarEmpleado`, empleadoDto);
  }

  async patchStatusEmpleado(id: string, estado: string) {
    return this.patch(`/actualizarEstadoEmpleado/${id}/${estado}`);
  }

  async patchEmpleado(id: string, updateUserDTO) {
    return this.patch(`/actualizarEmpleado/${id}`, updateUserDTO);
  }
    //Membresias
    async getMembresias() {
      return this.get(`/membresias/todas`);
    }
  
  
    async getMembresia(id: string) {
      return this.get(`/membresias/${id}`);
    }
  
    async postMembresias(membresiaDto) {
      return this.post(`/membresias/crear`, membresiaDto);
    }
  
    async patchMembresia(id: string, updatemembresiaDto) {
      return this.patch(`membresias/actualizar/${id}`, updatemembresiaDto);
    }

  //Gimnasio

  async getGimnasios() {
    return this.get(`/Gimnnasios/todos`);
  }

  //Maquinas
  async getMaquinas() {
    return this.get(`/ObtenerMaquinas`);
  }
 
  async getMaquina(id: string) {
    return this.get(`/ObtenerMaquinas/${id}`);
  }
  async postMaquina(MaquinaDto) {
    return this.post(`/CrearMaquina`, MaquinaDto);
  }
  
  //Bitacoras
  async getBitacoras() {
    return this.get(`/ObtenerBitacoras `);
  }

   //Cursos
   async getCursos() {
    return this.get(`/ObtenerCursos`);
  }
  async getCurso(id: string) {
    return this.get(`/ObtenerCursos/${id}`);
  }
  async patchStatusCurso(id: string, estado: string) {
    return this.patch(`/ActualizarCurso/${id}/${estado}`);
  }
  async postCurso(CursoDto) {
    return this.post(`/CrearCurso`, CursoDto);
  }
}
