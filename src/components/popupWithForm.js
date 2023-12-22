// this class is a child class of the Popup class
// it deals exclusively with forms
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector }); // call the constructor of the parent class Popup
    this._popupForm = this._popupElement.querySelector(".modal__form"); // access the form element inside the popup
    this._handleFormSubmit = handleFormSubmit; // save the handleFormSubmit function for later use
  }

  // collects data from all the input fields and returns it as an object
  _getInputValues() {
    const inputValues = {};
    const inputFields = this._popupForm.querySelectorAll(".modal__input");

    inputFields.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  // override the parent method
  setEventListeners() {
    super.setEventListeners(); // Call the setEventListeners method of the parent class (Popup)
    // form submit event handler
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // input values passed to the submission handler
      this._handleFormSubmit(this._getInputValues);
    });
  }

  // closes and resets the form
  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
