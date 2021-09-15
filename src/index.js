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
// Code upload Image
$("body").on("change", ".upload__btn", function (event) {
  console.log("works");
  event.stopPropagation();
  event.stopImmediatePropagation();
  loadFileAndPreview(event);
});

// Incializamos Los modals
MicroModal.init();
// Mostramos los modals agregados dinamicamente
$(".added__fields").on("click", ".show-modal", function () {
  const $this = $(this);
  MicroModal.show($this.data("target"));
});

// Only for validation front, this doesnt should affect another listeners
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
