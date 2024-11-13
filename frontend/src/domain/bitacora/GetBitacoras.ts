import { AuthClient } from "src/data/AuthClient";

async function GetBitacoras() {
  const usersClient = new AuthClient();

  try {
    return await usersClient.getBitacoras();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default GetBitacoras;