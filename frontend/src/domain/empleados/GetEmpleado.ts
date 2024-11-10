import UsersClient from 'src/data/UsersClient';
import { UserDTO } from 'src/models/users';

async function GetUser(token: string, id: string): Promise<UserDTO> {
  const usersClient = new UsersClient(token);

  try {
    return await usersClient.users.get(id);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default GetUser;
