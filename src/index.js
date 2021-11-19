import "./styles/main.sass";
import "litepicker-polyfills-ie11";
import Litepicker from "litepicker";
import MicroModal from "micromodal";
import loadFileAndPreview from "./js/upload-image";
// custom add fields
import "./vendors/addField";
// Agregamos date Picker
if ($("#arrival-date").length > 0) {
  const picker = new Litepicker({
    element: document.getElementById("arrival-date"),
    minDate: new Date(),
    // startDate: new Date(),
  });
}
$("body").on("change", ".upload__btn", function (event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  loadFileAndPreview(event);
});

// Incializamos Los modals
MicroModal.init();
console.log("MicroModal iniciado");

// Only for validation front, this doesnt should affect another listeners
// there is only one input field now, remove not used code
$(".check-form").on("submit", function (event) {
  const $inputsFiles = $('input[type="file"]');
  const isEmpty = $inputsFiles.filter(function () {
    return !this.value;
  });
  if (isEmpty.length > 0) {
    event.stopImmediatePropagation();
    $(".alert--image").removeClass("hidden");
    isEmpty.each(function (item, obj) {
      const target = $(obj).data("btn");
      $('[data-target="' + target + '"]').addClass("alert--danger alert--danger__border");
    });
    setTimeout(function () {
      $(".alert--image").addClass("hidden");
      $("button[data-target]").removeClass("alert--danger alert--danger__border");
    }, 5000);
    return false;
  }
});
if (module.hot) {
  module.hot.accept();
}
