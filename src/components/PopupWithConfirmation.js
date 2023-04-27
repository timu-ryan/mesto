import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._button = this._form.querySelector('.popup__button');
    this._standartText = this._button.textContent;
    this._deleteCard = deleteCard;
  }

  close() {
    super.close();
  }

  open(card) {
    super.open();
    this._card = card;
  }

  _getCard() {
    console.log(this._card);
  }

  getForm() {
    return this._form;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteCard(this._card);
    });
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._button.textContent = 'сохранение...';
      // console.log(this._button.textContent);
    } else {
      this._button.textContent = this._standartText;
      // console.log(this._button.textContent);
    }
  }
}