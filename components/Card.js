export default class Card {
  constructor({ name, link }, cardSelector) {
    this.name = name;
    this.link = link;
    this.cardSelector = cardSelector;
  }
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
  }

  // HANDLERS
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // getView defines the card element
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNone(true);

    // get card view
    // NOTE SURE WHAT TO DO HERE

    // set event listeners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
