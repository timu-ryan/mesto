let popup = document.querySelector(".popup");
let popupOpen = document.querySelector(".profile__edit");
let popupClose = document.querySelector(".popup__close");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_name");
let jobInput = document.querySelector(".popup__input_description");

function openPopup() {
  let name = document.querySelector(".profile__name-text").textContent; // имя из профиля
  let description = document.querySelector(".profile__description").textContent;
  nameInput.value = name; //задаем value инпута значения со страницы, чтобы при открытии попапа отображались они
  jobInput.value = description;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault(); // отменяет стандартную форму отправки
  let name = document.querySelector(".profile__name-text");
  let description = document.querySelector(".profile__description");
  name.textContent = nameInput.value; // изменяем значения на странице на значения, введенные в импуте
  description.textContent = jobInput.value;
  closePopup();
}

popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);
formElement.addEventListener("submit", handleFormSubmit);
