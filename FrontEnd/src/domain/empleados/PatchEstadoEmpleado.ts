import { AuthClient } from "../../data/AuthClient";

async function PatchStatusEmpleado(id: string, estado: string) {
    try {
        const authClient = new AuthClient();
        await authClient.patchStatusEmpleado(id, estado);
    } catch (error) {
        console.error("PatchStatusEmpleado error", error);
        throw error;
    }
}

export default PatchStatusEmpleado;