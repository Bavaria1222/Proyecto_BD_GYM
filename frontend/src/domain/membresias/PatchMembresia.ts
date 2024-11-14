import { AuthClient } from "../../data/AuthClient";

async function PatchMembresia(id: string, membresiaDto) {
  try {
    const authClient = new AuthClient();
    await authClient.patchMembresia(id, membresiaDto);
  } catch (error) {
    console.error("PatchMembresia error", error);
    throw error;
  }
}

export default PatchMembresia;
