import { AuthClient } from "../../data/AuthClient";


export async function PostCurso(maquinaDto) {
    try {
        const authClient = new AuthClient();
        const response = await authClient.postCurso(maquinaDto);
        return response;
    } catch (error) {
        console.error("maquinaDto error", error);
        throw error;
    }
}