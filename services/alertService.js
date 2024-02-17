import Swal from "sweetalert2";

export const alertService = {
  success: (title, text) => {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text
    })
  },

  warning: (title, text) => {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text
    })
  },

  error: (title, text) => {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text
    })
  },

  message: (text) => {
    Swal.fire(text);
  },

  informative: (title, html) => {
    Swal.fire(title, html, "info");
  },

  question: (title, text) => {
    Swal.fire(title, text, 'question');
  },

  withConfirmation: async (title, text) => {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    })
    return result.isConfirmed;
  }

}
