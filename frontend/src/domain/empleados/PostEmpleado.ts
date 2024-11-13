import { AuthClient } from "../../data/AuthClient";


export async function PostEmpleado(empleadoDto) {
    try {
        const authClient = new AuthClient();
        const response = await authClient.postEmpleados(empleadoDto);
        return response;
    } catch (error) {
        console.error("empleadoDto error", error);
        throw error;
    }
}
