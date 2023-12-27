import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open({ link, name }) {
    this._popupElement.querySelector(".modal__popup-caption").textContent =
      name;
    const image = this._popupElement.querySelector(".modal__image");
    image.src = link;
    image.alt = `Image of ${name}`;
    super.open();
  }
}

export default PopupWithImage;
