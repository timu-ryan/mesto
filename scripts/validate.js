const showInputError = (inputElement, errorElement, invalidInputClass) => {
  inputElement.classList.add(invalidInputClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (inputElement, errorElement, invalidInputClass) => {
  inputElement.classList.remove(invalidInputClass);
  errorElement.textContent = '';
}

const disableButton = (buttonElement, disableButtonClass) => {
  buttonElement.classList.add(disableButtonClass);
  buttonElement.disabled = true;
}

const enableButton = (buttonElement, disableButtonClass) => {
  buttonElement.classList.remove(disableButtonClass);
  buttonElement.disabled = false;
}

const toggleButtonState = (formSubmitButtonElement, disabledSubmitButtonClass, buttonState) => {
  if (buttonState) {
    disableButton(formSubmitButtonElement, disabledSubmitButtonClass);
  } else {
    enableButton(formSubmitButtonElement, disabledSubmitButtonClass);
  }
}

const checkInputValidity = (inputElement, errorElement, invalidInputClass) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, invalidInputClass);
  } else {
    showInputError(inputElement, errorElement, invalidInputClass);
  }
}

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid)
}

const handleFormInput = (evt, form, invalidInputClass, formSubmitButtonElement, disabledSubmitButtonClass, inputs) => {
  const inputElement = evt.target;
  const errorElement = form.querySelector(`.${inputElement.id}-error`);  //элемент с текстом ошибки
  // console.log(inputElement.validity.valid);
  checkInputValidity(inputElement, errorElement, invalidInputClass);
  const buttonState = hasInvalidInput(inputs);

  toggleButtonState(formSubmitButtonElement, disabledSubmitButtonClass, buttonState);
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();
}

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  // querySelectorAll
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const formSubmitButtonElement = form.querySelector(config.submitButtonSelector);

    form.addEventListener('submit', handleFormSubmit);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => handleFormInput(evt, form, config.invalidInputClass, formSubmitButtonElement, config.disabledSubmitButtonClass, inputs))
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  invalidInputClass: 'popup__input_invalid',
  submitButtonSelector: '.popup__button',
  disabledSubmitButtonClass: 'popup__button_disabled'
});