const loadFileAndPreview = function (event) {
  const $target = $(event.target);
  const $container = $target.closest(".upload__image");
  const file = event.target.files[0];
  if (!/\.(jpe?g|png)$/i.test(file.name)) {
    return alert(file.name + "this format is not supported only .jpg or .png");
  } // else...
  $container.find("*").not('input[type="file"]').remove();
  $container.append($("<img/>", { src: URL.createObjectURL(event.target.files[0]), height: 100 }));
};

export default loadFileAndPreview;
