import { AuthClient } from "../../data/AuthClient";

async function PatchEmpleado(id: string, updateUserDto) {
  try {
    const authClient = new AuthClient();
    await authClient.patchEmpleado(id, updateUserDto);
  } catch (error) {
    console.error("PatchStatusEmpleado error", error);
    throw error;
  }
}

export default PatchEmpleado;
