import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleCardDelete) {
    super({ popupSelector });
    this._handleCardDelete = handleCardDelete;
  }

  _handleCardDelete() {
    this._handleCardDelete();
  }
}

export default PopupWithConfirmation;
