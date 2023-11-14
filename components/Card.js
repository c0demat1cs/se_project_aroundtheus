export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // getView defines the card element
  getView() {
    this._cardElement = this._getElement();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._setEventListeners();
    // return the card
    return this._cardElement;
  }

  // METHODS
  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDeleteCard = () => {
    this._cardElement.remove();
  };

  _handleImageClick = () => {
    this._handleImageClick({ name: this._name, link: this._link });
  };

  // LISTENERS
  // fetch each element , add listener
  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // Enabling this handler produces: Uncaught TypeError = handler is undefined.
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  // HANDLERS
  _handleLikeIcon() {
    this._likeButton
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
