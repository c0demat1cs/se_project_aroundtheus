// this class is a child class of the Popup class
// it deals exclusively with forms
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector }); // call the constructor of the parent class Popup
    this._popupForm = this._popupElement.querySelector(".modal__form"); // access the form element inside the popup
    this._handleFormSubmit = handleFormSubmit; // save the handleFormSubmit function for later use
    this._inputFields = this._popupForm.querySelectorAll(".modal__input");
    this._formSubmitHandler = this._formSubmitHandler.bind(this); // binds evt lstnr to this
    this._submitBtn = this._popupForm.querySelector(".modal__button"); // access the submit button
    this._submitBtnText = this._submitBtn.textContent;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      // return back the initial text of the button
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  // collects data from all the input fields and returns it as an object
  _getInputValues() {
    const inputValues = {};
    this._inputFields.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // override the parent method
  setEventListeners() {
    super.setEventListeners();
    // listens for form submission
    this._popupForm.addEventListener("submit", this._formSubmitHandler);
  }
  // handle form submit
  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues(), this.renderLoading(this));
  }

  // closes and resets the form
  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
