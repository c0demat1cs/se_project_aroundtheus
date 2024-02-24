import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super({ popupSelector });
    this._handleDeleteCard = handleDeleteCard;
  }

  _handleDeleteCard() {
    this._handleDeleteCard();
  }
}

export default PopupWithConfirmation;
