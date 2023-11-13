import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

/////////////////////////////////////////////////////////////////////
// creates an instance of the FormValidator class for the profile form
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  settings,
  document.querySelector("#profile-form")
);

editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(
  settings,
  document.querySelector("#add-card-form")
);

cardFormValidator.enableValidation();

/////////////////////////////////////////////////////////////////////

// ELEMENTS

// const cardTemplate = document
//   .querySelector("#card-template")
//   .content.querySelector(".places__item");

// WRAPPERS
const placesWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const imageModal = document.querySelector("#image-modal");
const modalImage = imageModal.querySelector(".modal__image");
const imageCaption = document.querySelector(".modal__popup-caption");

// BUTTONS AND OTHER DOM ELEMENTS
const profileAddButton = document.querySelector("#profile-add-button");
const profileEditButton = document.querySelector("#profile-edit-button");

const closeButtons = document.querySelectorAll(".modal__close");

// FORM DATA
const cardTitle = document.querySelector(".modal__input_type_title");
const cardLink = document.querySelector(".modal__input_type_link");
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
const cardListEl = document.querySelector(".cards__list");

// FUNCTIONS

// universal open button function
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", keyHandler);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", keyHandler);
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}

// function expression to clone card: select elements, set attributes, add an event listener to like button
// const getCardElement = (cardData) => {
//   const cardElement = cardTemplate.cloneNode(true);
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;

// likeButton.addEventListener("click", () => {
//   likeButton.classList.toggle("card__like-button_active");
// });

// deleteButton.addEventListener("click", () => {
//   cardElement.remove();
// });

// cardImageEl.addEventListener("click", () => {
//   modalImage.src = cardData.link;
//   modalImage.alt = cardData.name;
//   imageCaption.textContent = cardData.name;
//   openPopup(imageModal);
// });

//   return cardElement;
// };

// declare a function to handle image click
function handleImageClick({ name, link }) {
  modalImage.src = link;
  modalImage.alt = name;
  imageCaption.textContent = name;
  openPopup(imageModal);
}

// Places new card at the beginning of the list
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  wrapper.prepend(card.getView());
}

// EVENT HANDLERS

// Handles edit form submit
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleNewCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, placesWrap);
  e.target.reset();
  closePopup(addCardModal);
}

// EVENT LISTENERS

// Listens for submit on profile edit form
profileForm.addEventListener("submit", handleProfileEditSubmit);
// Listens for submit on add new card form
cardForm.addEventListener("submit", handleNewCardSubmit);
// listens for edit button click, functions to open the form modal.
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
// Listens for add button click, functions to open new card from modal.
profileAddButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

// event listener to close modals by clicking on the overlay
const popups = document.querySelectorAll(".modal");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(popup);
    }
  });
});

// Places new card at the beginning of the list
initialCards.forEach((cardData) => renderCard(cardData, placesWrap));
