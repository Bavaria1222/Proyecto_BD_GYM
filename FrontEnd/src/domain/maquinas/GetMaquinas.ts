import { AuthClient } from "src/data/AuthClient";

async function GetMaquinas() {
  const usersClient = new AuthClient();

  try {
    return await usersClient.getMaquinas();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default GetMaquinas;
