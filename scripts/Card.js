export default class Card {
  constructor(data, selector, imageClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._imageClick = imageClick;
  }

  _getElement() {
    const cardTemplate = document.querySelector(this._selector).content.querySelector(".card"); //содержимое card template -> карта
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._element.querySelector(".card__text").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._setEventListeners();

    return this._element;
  }

  _likeCard() {
    this._element.querySelector(".card__like").classList.toggle("card__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _openImage() {
    this._imageClick(this._name, this._link);
  }

  _setEventListeners() {
    this._element.querySelector(".card__like").addEventListener("click", () => {
      this._likeCard();
    });
    this._element.querySelector(".card__delete").addEventListener("click", () => {
      this._deleteCard();
    });
    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._openImage();
    });
  }
}
