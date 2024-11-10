import UsersClient from 'src/data/UsersClient';
import { UpdateUserDTO } from 'src/models/users';

async function PatchUser(token: string, id: string, updateUserDto: UpdateUserDTO): Promise<void> {
  const usersClient = new UsersClient(token);

  try {
    await usersClient.users.update(id, updateUserDto);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default PatchUser;
