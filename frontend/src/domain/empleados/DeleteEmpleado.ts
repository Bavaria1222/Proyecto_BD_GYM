import UsersClient from 'src/data/UsersClient';

async function DeleteUser(token: string, id: number): Promise<void> {
  const usersClient = new UsersClient(token);

  try {
    await usersClient.users.delete(id);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default DeleteUser;
