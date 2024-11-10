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

  //user
  /*  async getUsers() {
      return this.get<UserDTO[]>(`/user`);
    }
  
    async getUser(id: string) {
      return this.get(`/user/${id}`);
    }
  
    async patchStatus(id: string) {
      return this.patch<void>(`/user/status/${id}`);
    }
  
    async invite(inviteUserDTO: InviteUserDTO) {
      return this.post<void>(`/user/invite`, inviteUserDTO);
    }
  
    async patchUser(id: string, updateUserDTO: UpdateUserDTO) {
      return this.patch<void>(`/user/${id}`, updateUserDTO);
    }
  
  */
}
