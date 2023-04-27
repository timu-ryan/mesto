import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._button = this._form.querySelector('.popup__button');
    this._standartText = this._button.textContent;
  }
  
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      //this.close();
    });
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._button.textContent = 'сохранение...';
    } else {
      this._button.textContent = this._standartText;
    }
  }
}