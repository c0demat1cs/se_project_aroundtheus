import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ link, name }) {
    this.popupElement.querySelector(".modal__popup-caption").textContent = name;
    const image = this.popupElement.querySelector(".modal__image");
    image.src = link;
    image.name = name;
    super.open();
  }
}

export default PopupWithImage;
