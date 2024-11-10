import { AuthClient } from "src/data/AuthClient";

async function GetEmpleados() {
  const usersClient = new AuthClient();

  try {
    return await usersClient.getEmpleados();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default GetEmpleados;
