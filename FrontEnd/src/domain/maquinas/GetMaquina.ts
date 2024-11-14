import { AuthClient } from "src/data/AuthClient";


async function GetMaquina(id: string) {
  try {
    const authClient = new AuthClient();
    const users = await authClient.getMaquina(id);
    return users;
  } catch (error) {
    console.error("GetMaquina error", error);
    throw error;
  }
}

export default GetMaquina;
