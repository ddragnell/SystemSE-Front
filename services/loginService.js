import axios from "axios";
import { Global } from './Global';
import { alertService } from "./alertService";

export const loginService = {
  inicioService: async () => {
    try {
      const { data } = await axios.post(
        `${Global.APIURL}`,
        { hola: "hola" }
      );
      return data;
    } catch (error) {
      alertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  }
}