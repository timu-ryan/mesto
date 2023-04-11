export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._invalidInputClass = config.invalidInputClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._disabledSubmitButtonClass = config.disabledSubmitButtonClass;
    this._formElement = formElement;
    this._button = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError (inputElement, errorElement) {
    inputElement.classList.add(this._invalidInputClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _hideInputError (inputElement, errorElement) {
    inputElement.classList.remove(this._invalidInputClass);
    errorElement.textContent = '';
  }
  
  _disableButton () {
    this._button.classList.add(this._disabledSubmitButtonClass);
    this._button.disabled = true;
  }

  disableButton () {
    this._disableButton();
  }

  _enableButton () {
    this._button.classList.remove(this._disabledSubmitButtonClass);
    this._button.disabled = false;
  }

  _hideError (inputElement) {
    this._hideInputError(inputElement, this._formElement.querySelector(`.${inputElement.id}-error`))
  }

  resetValidation() {
    this._enableButton();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement) //<==очищаем ошибки ==
    });
  }
  
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
  
  _checkInputValidity (inputElement, errorElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement);
    }
  }
  
  _hasInvalidInput () {
    return this._inputList.some((input) => !input.validity.valid)
  }
  
  _handleFormInput (evt) {
    const inputElement = evt.target;
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);  //элемент с текстом ошибки
    this._checkInputValidity(inputElement, errorElement);
    this._toggleButtonState();
  }
  
  _handleFormSubmit(evt) {
    evt.preventDefault();
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => this._handleFormInput(evt))
    })
  }
  
  enableValidation () {
    this._setEventListeners();
  }
}