import Swal from "sweetalert2";
export const sweet_mixin = async (
  position?:
    | "top-start"
    | "top-end"
    | "center"
    | "center-start"
    | "center-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end",
  icons?: "success" | "error" | "warning" | "info" | "question",
  title?: string,
  text?: string,
  timer?: number
) => {
  const Toast = Swal.mixin({
    position: position,
    timer: timer,
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: icons,
    title: title,
    text: text,
  });
};