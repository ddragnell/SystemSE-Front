import axios from "axios";
import { Global } from './Global';
import { alertService } from "./alertService";

export const proporcionService = {
  poblacionNormal: async (p, alpha, n) => {
    try {
      const { data } = await axios.post(
        `${Global.APIURL}/proporcion/poblacion-normal`,
        { p, alpha, n }
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