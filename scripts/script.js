let popup = document.querySelector(".popup");
let popupOpen = document.querySelector(".profile__edit");
let popupClose = document.querySelector(".popup__close");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_text_name");
let jobInput = document.querySelector(".popup__input_text_description");

let profileName = document.querySelector(".profile__name-text"); // имя из профиля
let profileDescription = document.querySelector(".profile__description");

function openPopup() {
  nameInput.value = profileName.textContent; //задаем value инпута значения со страницы, чтобы при открытии попапа отображались они
  jobInput.value = profileDescription.textContent;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault(); // отменяет стандартную форму отправки
  profileName.textContent = nameInput.value; // изменяем значения на странице на значения, введенные в импуте
  profileDescription.textContent = jobInput.value;
  closePopup();
}

popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);
