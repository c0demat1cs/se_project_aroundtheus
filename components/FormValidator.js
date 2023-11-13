export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _hasInvalidInput() {
    const inputElements = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    return inputElements.some((inputElement) => !inputElement.validity.valid);
  }

  _disableButton(submitButton) {
    if (submitButton) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    }
  }

  _enableButton(submitButton) {
    if (submitButton) {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _toggleButtonState(inputElements, submitButton) {
    if (this._hasInvalidInput(inputElements)) {
      this._disableButton(submitButton, this._inactiveButtonClass);
    } else {
      this._enableButton(submitButton);
    }
  }

  _clearFormInput(inputElements) {
    inputElements.forEach((inputElement) => {
      inputElement.value = "";
    });
  }

  _setEventListeners() {
    const inputElements = this._formElement.querySelectorAll(
      this._inputSelector
    );
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElements, submitButton);
      });
    });

    this._formElement.addEventListener("submit", () => {
      this._clearFormInput(inputElements);
      this._disableButton(submitButton);
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
