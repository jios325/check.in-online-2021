$(document).ready(function () {
  var inputCounter = 0;

  //   To add listener to button
  $("#add-field").on("click", function (event) {
    console.log("CLICK");
    let $this = $(this),
      max_fields = 5,
      counter = 0,
      prefix = "pax",
      $wrapper;
    event.preventDefault();
    // added__fields
    $wrapper = $(".field__added--container");
    inputCounter = inputCounter + 1;
    counter = inputCounter;
    console.log(counter);
    if (inputCounter > 0) {
      $wrapper.find(".title").removeClass("hidden");
    }
    if (counter <= max_fields) {
      // cons
      const template = `
        <div class="field__added-item">
            <div class="field__added-item__counter">${counter}</div>
            <div class="field__added-item__body">
              <div class="row bottom-xs">
                <div class="col-xs-12 col-md-4">
                  <div class="field animated">
                    <input type="text" name="${prefix}-name-${counter}" id="${prefix}-name-${counter}" placeholder="Jhon" required />
                    <label class="field__label" for="${prefix}-name-${counter}">Nombre</label>
                  </div>
                </div>
                <div class="col-xs-12 col-md-4 text-center" style="position:relative;">
                  <div class="field animated">
                    <input type="text" name="${prefix}-last_name-${counter}" id="${prefix}-last_name-${counter}" placeholder="Doe" required />
                    <label class="field__label" for="${prefix}-last_name-${counter}">Apellidos</label>
                  </div>
                  <button data-${
                    prefix + '-field-remove="' + counter + '"'
                  } type="button" class="removeField btn--circle btn--alert mt-15-md mb-15-md ml-10"></span> <span class="icon icon-trash icon--xs"></span></button>
                </div>
              </div>
              <hr class="separator mb-35 mt-35 hidden-md" />
            </div>
        </div>
        `;
      $wrapper.append(template);

      $wrapper.find("[data-" + prefix + '-field-remove="' + (counter - 1) + '"]').addClass("hidden");
      //   Deshabilitamos el boton
      if (counter == max_fields) {
        $this.prop("disabled", true);
      }
    }
    // Eliminar el Input field
    $wrapper.find(".removeField[data-" + prefix + '-field-remove="' + counter + '"]').on("click", function (e) {
      //   console.log("SI LLEGA :)");
      const $this = $(this);
      e.preventDefault();
      e.stopPropagation();
      $this.closest(".field__added-item").remove();
      inputCounter = inputCounter - 1;
      counter = inputCounter;
      $wrapper.find("[data-" + prefix + '-field-remove="' + counter + '"]').removeClass("hidden");
      if (counter < max_fields) {
        $("#add-field").prop("disabled", false);
      }
      if (inputCounter == 0) {
        $wrapper.find(".title").addClass("hidden");
      }
      //   $wrapper.siblings(".addFieldContainer").removeClass("is-hidden");
    });
  });
});
