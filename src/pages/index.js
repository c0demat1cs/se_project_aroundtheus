import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  initialCards,
  settings,
  placesWrap,
  profileEditModal,
  addCardModal,
  modalImage,
  imageCaption,
  profileAddButton,
  profileEditButton,
  cardTitleInput,
  cardLinkInput,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileForm,
  cardForm,
} from "../utils/constants.js";

/////////////////////////////////////////////////////////////////////

// New Edit Form Validator instance
const editFormValidator = new FormValidator(
  settings,
  document.querySelector("#profile-form")
);
editFormValidator.enableValidation(); // call enable validation

// New Card form validator instance
const cardFormValidator = new FormValidator(
  settings,
  document.querySelector("#add-card-form")
);
cardFormValidator.enableValidation(); // call enable validation

// New Popup Form for adding a card
const newCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const name = formData.title;
  const link = formData.link;
  handleNewCardSubmit(name, link);
});
newCardPopup.setEventListeners();

// New Popup Form to edit profile
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    const title = formData.title;
    const description = formData.description;
    userInfo.setUserInfo(title, description);
    handleProfileEditSubmit(formData);
  }
);
editProfilePopup.setEventListeners();

// New Popup with Image
const popupWithImage = new PopupWithImage("#image-modal");
popupWithImage.setEventListeners();

// Instance of User Info
const userInfo = new UserInfo(".profile__title", ".profile__description");

// Instance of Section
const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  "#cards__list"
);

section.renderItems();
/////////////////////////////////////////////////////////////////////

// FUNCTIONS

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

// universal open button function
// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleKeyDown);
// }

// function openPopup(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleKeyDown);
// }

// function handleKeyDown(evt) {
//   if (evt.key === "Escape") {
//     const modal = document.querySelector(".modal_opened");
//     closePopup(modal);
//   }
// }

// declare a function to handle image click
function handleImageClick({ name, link }) {
  popupWithImage.open({ link, name });
}

// Places new card at the beginning of the list
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  section.addItem(card.getView());
}

// EVENT HANDLERS

// Handles edit form submit
function handleProfileEditSubmit() {
  // e.preventDefault();
  // profileTitle.textContent = profileTitleInput.value;
  // profileDescription.textContent = profileDescriptionInput.value;
  editFormValidator.disableSubmitButton();
  editProfilePopup.close();
}

function handleNewCardSubmit(name, link) {
  renderCard({ name, link }, placesWrap);
  cardFormValidator.disableSubmitButton();
  // e.target.reset();
  newCardPopup.close();
}

// EVENT LISTENERS

// Listens for submit on profile edit form
// profileForm.addEventListener("submit", handleProfileEditSubmit);
// Listens for submit on add new card form
// cardForm.addEventListener("submit", handleNewCardSubmit);
// listens for edit button click, functions to open the form modal.
profileEditButton.addEventListener("click", () => {
  // profileTitleInput.value = profileTitle.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});
// Listens for add button click, functions to open new card from modal.
profileAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

// event listener to close modals by clicking on the overlay
// const popups = document.querySelectorAll(".modal");

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("modal_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("modal__close")) {
//       closePopup(popup);
//     }
//   });
// });

// Places new card at the beginning of the list
// initialCards.forEach((cardData) => renderCard(cardData, placesWrap));
