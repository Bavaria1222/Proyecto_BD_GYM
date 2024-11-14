import { AuthClient } from "src/data/AuthClient";

async function GetMembresias() {
  const usersClient = new AuthClient();

  try {
    return await usersClient.getMembresias();
  } catch (e) {
    console.log(e);
    throw e;
  }
}


export default GetMembresias;