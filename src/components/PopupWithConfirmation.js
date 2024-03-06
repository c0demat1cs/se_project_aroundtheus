import Popup from "./Popup";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  // set event listeners
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  // set submit callback
  setSubmitCallback(action) {
    // set submit handler
    this._handleSubmit = action;
  }
}

export default PopupWithConfirmation;
