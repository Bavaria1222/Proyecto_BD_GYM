import { AuthClient } from "src/data/AuthClient";


async function GetMembresia(id: string) {
  try {
    const authClient = new AuthClient();
    const users = await authClient.getMembresia(id);
    return users;
  } catch (error) {
    console.error("GetMembresia error", error);
    throw error;
  }
}

export default GetMembresia;