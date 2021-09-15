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
                <div class="col-xs-12 col-md-4">
                  <div class="field animated">
                    <input type="text" name="${prefix}-last_name-${counter}" id="${prefix}-last_name-${counter}" placeholder="Doe" required />
                    <label class="field__label" for="${prefix}-last_name-${counter}">Apellidos</label>
                  </div>
                </div>
                <div class="col-xs-12 col-md-3 text-center">
                  <button data-target="modal-upload-additional-${counter}" type="button" class=" show-modal btn btn--secondary btn--block mb-15-md"><span class="icon icon-file-add icon--md"></span> Escanear Pasaporte</button>
                  <button data-${
                    prefix + '-field-remove="' + counter + '"'
                  } type="button" class="removeField btn--circle btn--alert mb-15 mt-15 mb-15-md ml-10"></span> <span class="icon icon-trash icon--xs"></span></button>
                </div>
              </div>
              <hr class="separator mb-35 mt-35 hidden-md" />
            </div>
            <div class="modal micromodal-slide" id="modal-upload-additional-${counter}" aria-hidden="true">
            <div class="modal__overlay" tabindex="-1" data-micromodal-close>
              <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                <button type="button" class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                <header class="modal__header">
                  <h2 class="title text-center"><span class="icon icon-file-add icon--xs"></span> Pasaporte</h2>
                  <p class="paragraph--important text-center mb-15 mt-15">Agrega tu pasaporte escaneado</p>
                </header>
                <main class="modal__content text-cernter">
                  <div class="row center-xs">
                    <div class="col-xs-12 col-md-8">
                      <label for="uploadImage-${counter}" class="upload__image">
                        <p class="text-center">
                          <span class="icon icon-cloud-upload icon--lg"></span> <br />
                          Subir documento
                        </p>
                        <input accept="image/*" type="file" id="uploadImage-${counter}" class="upload__btn" data-btn="modal-upload-additional-${counter}" />
                      </label>
                      <button type="button" class="btn btn--secondary text-center btn--block mt-15">Subir</button>
                    </div>
                  </div>
                </main>
              </div>
            </div>
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
