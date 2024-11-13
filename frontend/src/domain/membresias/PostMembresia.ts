import { AuthClient } from "../../data/AuthClient";


export async function PostMembresia(membresiaDto) {
    try {
        const authClient = new AuthClient();
        const response = await authClient.postMembresias(membresiaDto);
        return response;
    } catch (error) {
        console.error("membresiaDto error", error);
        throw error;
    }
}