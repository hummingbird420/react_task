import Swal from "sweetalert2";

const swalWithCustomButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn add-button border-0 me-2",
    cancelButton: "btn btn-secondary",
  },
  buttonsStyling: false,
});

export default swalWithCustomButtons;
