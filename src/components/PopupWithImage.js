import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    // class fields defined
    this._popupCaption = this._popupElement.querySelector(
      ".modal__popup-caption"
    );
    this._imageElement = this._popupElement.querySelector(".modal__image");
  }

  open({ link, name }) {
    this._popupCaption.textContent = name;
    this._imageElement.src = link;
    this._imageElement.alt = `Image of ${name}`;

    super.open();
  }
}

export default PopupWithImage;
