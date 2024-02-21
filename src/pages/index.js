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
import Api from "../components/Api.js";
/////////////////////////////////////////////////////////////////////
// CLASS INSTANCES

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

// section.renderItems();

// Instance of Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/users/me",
  headers: {
    authorization: "d918969b-47fa-4f72-8138-61be6ab55840",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    // process the result
    section.renderItems(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

// get user information and update header elements
api
  .getUserInfo()
  .then((result) => {
    // process the result
    userInfo.setUserInfo(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

// Call the function to fetch data for rendering
// api.fetchDataForRender().then((data) => {
//   const [cards, userData] = data;
//   section.renderItems(cards);
//   userInfo.setUserInfo(userData);
// });

/////////////////////////////////////////////////////////////////////

// FUNCTIONS

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

//render card
function renderCard(cardData) {
  const cardView = createCard(cardData);
  section.addItem(cardView);
}

// declare a function to handle image click
function handleImageClick({ name, link }) {
  popupWithImage.open({ link, name });
}

// EVENT HANDLERS

// Handles edit form submit
function handleProfileEditSubmit() {
  editFormValidator.disableSubmitButton();
  editProfilePopup.close();
}

function handleNewCardSubmit(name, link) {
  renderCard({ name, link }, placesWrap);
  cardFormValidator.disableSubmitButton();
  newCardPopup.close();
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

// Listens for add button click, functions to open new card from modal.
profileAddButton.addEventListener("click", () => {
  newCardPopup.open();
});
