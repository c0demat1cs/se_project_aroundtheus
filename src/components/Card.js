export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    _handleDeleteCard,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = _handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }

  getId() {
    return this._id;
  }

  // get the like status
  getIsLiked() {
    return this._isLiked;
  }

  //  METHODS
  //abstraction to get the card element
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

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  // LISTENERS
  // fetch each element , add listener
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    // Handle image click
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  // HANDLERS;

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };
}
