import { AuthClient } from 'src/data/AuthClient';

async function GetCursos() {
  const client = new AuthClient();
  return await client.getCursos();
}

export default GetCursos;