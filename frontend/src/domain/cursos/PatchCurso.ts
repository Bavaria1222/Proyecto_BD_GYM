import { AuthClient } from "../../data/AuthClient";

async function PatchCurso(id: string, updateUserDto) {
  try {
    const authClient = new AuthClient();
    await authClient.patchEmpleado(id, updateUserDto);
  } catch (error) {
    console.error("PatchStatusCurso error", error);
    throw error;
  }
}

export default PatchCurso;