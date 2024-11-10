import { setToken } from 'src/utils/constants';
import { AuthClient } from '../data/AuthClient';

export async function Login(username: string, password: string) {
  try {
    const authClient = new AuthClient();
    const authCredentialsDto = {
      username: username,
      password: password,
    };
    const response = await authClient.login(authCredentialsDto);
    localStorage.setItem('userData', JSON.stringify(response));

    return response;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
}
