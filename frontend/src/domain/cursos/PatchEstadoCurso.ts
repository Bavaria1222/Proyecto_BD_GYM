import { AuthClient } from "../../data/AuthClient";

async function PatchStatusCurso(id: string, estado: string) {
    try {
        const authClient = new AuthClient();
        await authClient.patchStatusCurso(id, estado);
    } catch (error) {
        console.error("PatchStatusCurso error", error);
        throw error;
    }
}

export default PatchStatusCurso;