import { AuthClient } from "src/data/AuthClient";


async function GetUser(id: string) {
  try {
    const authClient = new AuthClient();
    const users = await authClient.getEmpleado(id);
    return users;
  } catch (error) {
    console.error("GetUser error", error);
    throw error;
  }
}

export default GetUser;
