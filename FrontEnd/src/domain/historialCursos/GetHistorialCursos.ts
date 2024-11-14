import { AuthClient } from 'src/data/AuthClient';

async function GetHistorialCursos() {
  const client = new AuthClient();
  return await client.getHistorialCursos();
}

export default GetHistorialCursos;