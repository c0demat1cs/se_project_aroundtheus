export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// WRAPPERS
export const placesWrap = document.querySelector(".cards__list");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addCardModal = document.querySelector("#add-card-modal");
export const modalImage = document.querySelector(".modal__image");
export const imageCaption = document.querySelector(".modal__popup-caption");

// BUTTONS AND OTHER DOM ELEMENTS
export const profileAddButton = document.querySelector("#profile-add-button");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileAvatarButton = document.querySelector(
  ".profile__edit-icon"
);

// FORM DATA
export const cardTitleInput = document.querySelector("#card-title-input");
export const cardLinkInput = document.querySelector("#card-link-input");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileForm = document.forms["profile-form"];
export const cardForm = document.forms["card-form"];
