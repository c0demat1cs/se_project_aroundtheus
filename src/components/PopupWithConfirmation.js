import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleCardDelete, cardId) {
    super({ popupSelector });
    this._handleCardDelete = handleCardDelete;
    this._cardId = cardId;
  }
  // set event listeners
  // find form element
  // add e.l for submit event
  // prevent default
  // call the handleCardDelete
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmation(this._cardId);
    });
  }

  // handle card delete
  _handleConfirmation() {
    this._handleCardDelete();
  }

  // open method
  // grabs id of card passined in to argement
  // calls super open
  open(cardId) {
    this._cardId = cardId;
    super.open();
  }
}

export default PopupWithConfirmation;
