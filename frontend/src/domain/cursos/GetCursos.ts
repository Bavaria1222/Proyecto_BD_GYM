import { AuthClient } from "src/data/AuthClient";

async function GetCursos() {
  const usersClient = new AuthClient();

  try {
    return await usersClient.getCursos();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default GetCursos;
