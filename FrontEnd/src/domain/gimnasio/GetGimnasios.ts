import { AuthClient } from 'src/data/AuthClient';

async function GetGimnasios() {
  const usersClient = new AuthClient();

  try {
    return await usersClient.getGimnasios();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default GetGimnasios;
