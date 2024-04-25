import axios from "axios";
import { Global } from './Global';

export const loginService = {
  inicioService: async () => {
    try {
      const { data } = await axios.post(
        `${Global.APIURL}`,
        { hola: "hola" }
      );
      return data;
    } catch (error) {
      return null;
    }
  }
}