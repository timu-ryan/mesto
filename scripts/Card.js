export default class Card {
  constructor(data, selector, imageClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._imageClick = imageClick;
    this._cardTemplate = document.querySelector(this._selector).content.querySelector(".card");
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardText = this._cardElement.querySelector(".card__text");
    this._cardLikeButton = this._cardElement.querySelector(".card__like");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete");
  }

  _getElement() {
    return this._cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();

    return this._element;
  }

  _likeCard() {
    this._cardLikeButton.classList.toggle("card__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _openImage() {
    this._imageClick(this._name, this._link);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._likeCard();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._openImage();
    });
  }
}
