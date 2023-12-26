export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  // opens popup
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleKeyDown);
  }

  // closes popup
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.addEventListener("keydown", this._handleKeyDown);
  }

  // listens for esc button
  _handleKeyDown(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // sets event listeners
  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".modal__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }
  }
}
