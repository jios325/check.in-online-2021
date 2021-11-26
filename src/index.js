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
if ($(".date-picker").length > 0) {
  $(".date-picker").each(function () {
    new Litepicker({
      element: this,
      minDate: new Date(),
    });
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

$(".collapse").on("click", ".collapse__header", function (e) {
  const $this = $(this);
  const $content = $this.siblings(".collapse__content");
  if ($(window).width() < 768) {
    if ($content.css("display") == "block") {
      $content.hide();
    } else {
      $content.show();
    }
  }
});

if (module.hot) {
  module.hot.accept();
}
