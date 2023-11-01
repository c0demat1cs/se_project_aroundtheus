// enabling validation by calling enableValidation()
// pass all the settings

function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.add(errorClass);
}

// Checks input validity
function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  hideInputError(formElement, inputElement, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

// Disables the button by adding specified class and disabling it
function disableButton(submitButton, inactiveButtonClass) {
  console.log(submitButton);
  if (submitButton) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }
}

// Enables the button by removing the specified class and enabling it
function enableButton(submitButton, inactiveButtonClass) {
  if (submitButton) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

// Call the above functions within the toggleButtonState function
function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, inactiveButtonClass);
    return;
  }
  enableButton(submitButton, inactiveButtonClass);
}

function setEventListeners(formElement, options) {
  // create a variable inputSelector and set it to the property of inputSelector object
  const { inputSelector, submitButtonSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

// define enable validation function
function enableValidation(options) {
  // selects all forms from html and makes them into an array via the spread operator ...
  const formElements = [...document.querySelectorAll(options.formSelector)];
  // loop through each of the form elements via .forEach method
  formElements.forEach((formElement) => {
    // adds event listener - when form gets submitted, things happen as defined in the body
    formElement.addEventListener("submit", (evt) => {
      // prevents reloading the page
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

// define the variable config
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// calls the evanbleValidation function with config object as parameter
enableValidation(config);
