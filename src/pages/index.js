import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  settings,
  profileAddButton,
  profileEditButton,
  profileTitleInput,
  profileAvatar,
  profileDescriptionInput,
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

// new avatar form validator instance
const avatarFormValidator = new FormValidator(
  settings,
  document.querySelector("#avatar-form")
);
avatarFormValidator.enableValidation(); // call enable validation

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
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

// New Popup with Image
const popupWithImage = new PopupWithImage("#image-modal");
popupWithImage.setEventListeners();

// new popup for deleting a card
const deleteCardPopup = new PopupWithConfirmation(
  "#delete-card-modal",
  handleDeleteCard
);
// set event listeners for delete card popup
deleteCardPopup.setEventListeners();

// new popup for changing avatar
const changeAvatarPopup = new PopupWithForm(
  "#avatar-modal",
  handleAvatarSubmit
);
changeAvatarPopup.setEventListeners();

// Instance of User Info
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

//manual rendering of initial cards
// section.renderItems();

// Instance of Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d918969b-47fa-4f72-8138-61be6ab55840",
    "Content-Type": "application/json",
  },
});

let section; // declare section variable

// fetch and render initial cards
api
  .getInitialCards()
  .then((result) => {
    // Instance of Section
    let section = new Section(
      {
        items: result,
        renderer: createCard,
      },
      "#cards__list"
    );
    section.renderItems(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

// fetch and render user info
api
  .getUserInfo()
  .then((result) => {
    // update UI to reflect the user info from the db
    // console.log(result);
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setAvatar(result.avatar);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

//////////////////////////////////////////////////////////

// FUNCTIONS

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    () => {
      deleteCardPopup.open(card);
    },
    handleLikeClick
  );
  return card.getView();
}

//render card
function renderCard(cardData) {
  const cardView = createCard(cardData);
  section.addItem(cardView);
}

// declare a function to handle image click
function handleImageClick({ name, link }) {
  // open the popup with the image
  popupWithImage.open({ link, name });
}

// EVENT HANDLERS

// Handles edit form submit
function handleProfileEditSubmit({ title, description }) {
  api
    .editProfileInfo({
      name: title,
      about: description,
    })
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      editFormValidator.disableSubmitButton();
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleNewCardSubmit(name, link) {
  api
    .addNewCard({
      name: name,
      link: link,
    })
    .then((data) => {
      renderCard(data);
      cardFormValidator.disableSubmitButton();
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteCard(card) {
  api
    .deleteCard(card.getId())
    .then(() => {
      card.removeCard();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

// function to handle like button click
function handleLikeClick(card) {
  const cardId = card.getId();
  api
    .likeCard(cardId)
    .then((data) => {
      console.log("Card liked:", data);
    })
    .catch((err) => {
      console.error(err);
    });
}

// handles avatar form submit with api
function handleAvatarSubmit() {
  const avatar = document.querySelector("#avatar-link-input").value;
  api
    .updateAvatar({
      avatar: avatar,
    })
    .then((data) => {
      profileAvatar.src = data.avatar;
      avatarFormValidator.disableSubmitButton();
      changeAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
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

// Listens for avatar click, functions to open change avatar modal.
profileAvatar.addEventListener("click", () => {
  changeAvatarPopup.open();
});
