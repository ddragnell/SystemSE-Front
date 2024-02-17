import axios from "axios";
import { Global } from './Global';
import { alertService } from "./alertService";

export const mediaService = {
  poblacionNormalVarianzaConocida: async (X, alpha, sigma, n) => {
    try {
      const { data } = await axios.post(
        `${Global.APIURL}/media/poblacion-normal-varianza-conocida`,
        { X, alpha, sigma, n }
      );
      return data;
    } catch (error) {
      alertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },

  poblacionNormalVarianzaDesconocida: async (X, alpha, s, n) => {
    try {
      const { data } = await axios.post(
        `${Global.APIURL}/media/poblacion-normal-varianza-desconocida`,
        { X, alpha, s, n }
      );
      return data;
    } catch (error) {
      alertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },

  poblacionCualquieraVarianzaDesconocida: async (X, alpha, s, n) => {
    try {
      const { data } = await axios.post(
        `${Global.APIURL}/media/poblacion-cualquiera-varianza-desconocida`,
        { X, alpha, s, n }
      );
      return data;
    } catch (error) {
      alertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },

  poblacionCualquieraVarianzaConocida: async (X, alpha, sigma, n) => {
    try {
      const { data } = await axios.post(
        `${Global.APIURL}/media/poblacion-cualquiera-varianza-conocida`,
        { X, alpha, sigma, n }
      );
      return data;
    } catch (error) {
      alertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },
}