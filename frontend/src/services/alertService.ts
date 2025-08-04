import Swal from 'sweetalert2';

// Configuración global
Swal.mixin({
  customClass: {
    container: 'swal2-container',
    popup: 'swal2-popup-custom',
    confirmButton: 'swal2-confirm',
    htmlContainer: 'swal2-html-container'
  },
  backdrop: 'rgba(0,0,0,0.7)',
  allowOutsideClick: false,
  allowEscapeKey: false,
  allowEnterKey: false
});

export const showErrorAlert = (error: unknown) => {
  // Manejo de diferentes formatos de error
  let title = 'Error';
  let message = 'Ocurrió un error inesperado';
  let errors: Array<{field: string, message: string}> = [];
  let status = '';

  if (typeof error === 'string') {
    message = error;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'object' && error !== null) {
    const errorObj = error as {
      message?: string;
      status?: number | string;
      data?: {
        errors?: Array<{field: string, message: string}>;
      };
    };
    
    title = errorObj.message || title;
    message = errorObj.message || message;
    status = errorObj.status?.toString() || '';
    errors = errorObj.data?.errors || [];
  }

  // Si hay errores de validación por campo
  if (errors.length > 0) {
    const errorList = errors.map(err => 
      `<li><strong>${err.field}:</strong> ${err.message}</li>`
    ).join('');

    Swal.fire({
      title: `${title} ${status ? `(${status})` : ''}`,
      html: `
        <div class="text-left">
          <p>${message}</p>
          <ul class="error-list" style="text-align: left; padding-left: 20px; margin-top: 10px;">
            ${errorList}
          </ul>
        </div>
      `,
      icon: 'error',
      confirmButtonText: 'Entendido',
      focusConfirm: false
    });
  } else {
    // Error genérico
    Swal.fire({
      title: `${title} ${status ? `(${status})` : ''}`,
      text: message,
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
  }
};

export const showSuccessAlert = (message: string) => {
  Swal.fire({
    title: 'Éxito',
    text: message,
    icon: 'success',
    confirmButtonText: 'Entendido',
    timer: 3000,
    timerProgressBar: true
  });
};