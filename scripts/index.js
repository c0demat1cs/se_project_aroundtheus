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

// ELEMENTS

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

// WRAPPERS
const placesWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
// const profileForm = profileEditModal.querySelector("#profile-form");  This doesn't seem to do anything / already defined / Remove later
const cardForm = addCardModal.querySelector("#add-card-form");
const imageModal = document.querySelector("#image-modal");
const modalImage = imageModal.querySelector(".modal__image");
const imageCaption = document.querySelector(".modal__popup-caption");

// BUTTONS AND OTHER DOM ELEMENTS
const profileAddButton = document.querySelector("#profile-add-button");
const profileEditButton = document.querySelector("#profile-edit-button");

const closeButtons = document.querySelectorAll(".modal__close");
// const openButtons = document.querySelectorAll(".modal");   // Does nothing  -  Remove later

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
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");

// FUNCTIONS

// universal close button function
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

// universal open button function
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

// universal open button function / DOESN'T WORK / breaks closeButtons function
// openButtons.forEach((button) => {
//   const popup = button.closest(".modal");
//   button.addEventListener("click", () => openPopup(popup));
// });

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

// function expression to clone card: select elements, set attributes, add an event listener to like button
const getCardElement = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    imageCaption.textContent = cardData.name;
    imageModal.classList.add("modal_opened");
  });

  return cardElement;
};

// Places new card at the beginning of the list ???
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// EVENT HANDLERS

// Handles edit form submit / ERRORS ON SUBMIT == POPUP DOESN'T CLOSE
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal); // ERROR HERE
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
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
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

// Places new card at the beginning of the list ???
initialCards.forEach((cardData) => renderCard(cardData, placesWrap));
