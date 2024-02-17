import axios from "axios";
import { Global } from './Global';
import { alertService } from "./alertService";

export const varianzaService = {
  poblacionNormal: async (s, alpha, n) => {
    try {
      const { data } = await axios.post(
        `${Global.APIURL}/varianza/poblacion-normal`,
        { s, alpha, n }
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