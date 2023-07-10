import Swal from 'sweetalert2';

const Success = (message: string) =>
  Swal.fire({
    icon: 'success',
    title: 'النجاح',
    text: `${message ? message : 'Completed'}`,
    showConfirmButton: false,
    timer: 3000,
  });

export default Success;
