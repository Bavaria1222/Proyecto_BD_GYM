import { AuthClient } from "../../data/AuthClient";


export async function PostMaquina(maquinaDto) {
    try {
        const authClient = new AuthClient();
        const response = await authClient.postMaquina(maquinaDto);
        return response;
    } catch (error) {
        console.error("maquinaDto error", error);
        throw error;
    }
}
