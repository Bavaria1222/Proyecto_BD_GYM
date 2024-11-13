import { AuthClient } from "src/data/AuthClient";


async function GetCurso(id: string) {
  try {
    const authClient = new AuthClient();
    const users = await authClient.getCurso(id);
    return users;
  } catch (error) {
    console.error("GetCurso error", error);
    throw error;
  }
}

export default GetCurso;