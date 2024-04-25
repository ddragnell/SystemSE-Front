import axios from "axios";
import { Global } from "./Global";
import { alertService } from "./alertService";

export const emailService = {
  createEmail: async ({nombre, email}) => {
    try {
      const { data } = await axios.post(`${Global.APIURL}/email/email`, {
        nombre, email
      });
      console.log(data);
      return data;
    } catch (error) {
      alertService.error(
        "Error",
        "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde."
      );
      return null;
    }
  },
};
