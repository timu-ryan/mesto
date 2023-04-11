// import Card from "./Card.js";
// import FormValidator from "./FormValidator.js";
// import {initialCards} from "./cards.js"

// const popupEdit = document.querySelector(".popup_edit");
// const popupNewItem = document.querySelector(".popup_new-item");

// const popupEditOpen = document.querySelector(".profile__edit");
// const popupAddOpen = document.querySelector(".profile__button");

// const popupEditClose = document.querySelector(".popup__close_button_edit");
// const popupNewItemClose = document.querySelector(".popup__close_button_new-item");
// const popupCardClose = document.querySelector(".popup__close_button_card");

// const popupOverlays = document.querySelectorAll(".popup");

// const formNewItemElement = document.querySelector(".popup__form_object_new-item");
// const formEditElement = document.querySelector(".popup__form_object_edit");

// const profileName = document.querySelector(".profile__name-text"); // имя из профиля
// const profileDescription = document.querySelector(".profile__description");

// const cardContainer = document.querySelector(".cards");

// const config = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   invalidInputClass: 'popup__input_invalid',
//   submitButtonSelector: '.popup__button',
//   disabledSubmitButtonClass: 'popup__button_disabled'
// }

// const profileForm = document.forms.edit;
// const profileFormValidator = new FormValidator(config, profileForm);
// profileFormValidator.enableValidation();

// const placeForm = document.forms.placeAdd;
// const placeFormValidator = new FormValidator(config, placeForm);
// placeFormValidator.enableValidation();

// const nameInput = profileForm.elements.name;
// const descriptionInput = profileForm.elements.description;
// const placeNameInput = placeForm.elements.placeName;
// const placeLinkInput = placeForm.elements.placeLink;
// const popupCard = document.querySelector(".popup_card");
// const popupImage = document.querySelector(".popup__image");
// const popupImageDescription = document.querySelector(".popup__image-description");

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", escapeClose);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", escapeClose);
// }

// function openPopupEdit() {
//   profileFormValidator.resetValidation();
//   nameInput.value = profileName.textContent; //задаем value инпута значения со страницы, чтобы при открытии попапа отображались они
//   descriptionInput.value = profileDescription.textContent;
//   openPopup(popupEdit);
// }

// function openAddPopup() {
//   openPopup(popupNewItem);
// }

// function closePopupEdit() {
//   closePopup(popupEdit);
// }

// function closeAddPopup() {
//   closePopup(popupNewItem);
//   formNewItemElement.reset();   // очищаем input после закрытия попапа
// }

// function closeCardPopup() {
//   closePopup(popupCard);
// }

// function closePopupOverlay(evt) {
//   if (Array.from(evt.target.classList).includes("popup")) {
//     closePopup(evt.target);
//   }
// }

// popupOverlays.forEach((overlay) => {
//   overlay.addEventListener("click", closePopupOverlay);
// });

// function escapeClose(evt) {
//   if (evt.key === "Escape") {
//     closePopup(document.querySelector(".popup_opened"));
//   }
// }

// function handleFormEditSubmit(evt) {
//   evt.preventDefault(); // отменяет стандартную форму отправки
//   profileName.textContent = nameInput.value; // изменяем значения на странице на значения, введенные в импуте
//   profileDescription.textContent = descriptionInput.value;
//   closePopupEdit();
// }

// function openImage(name, link) {
//   popupImage.src = link;
//   popupImage.alt = name;
//   popupImageDescription.textContent = name;
//   openPopup(popupCard);
// }

// function createCard(item) {
//   const cardObject = new Card(item, "#card-template", openImage);
//   const cardElement = cardObject.generate();
//   return cardElement;
// }

// initialCards.forEach((card) => {
//   cardContainer.prepend(createCard(card));
// });

// function handleFormAddCardSubmit(evt) {
//   const card = {
//     name: placeNameInput.value,
//     link: placeLinkInput.value,
//   };
//   evt.preventDefault(); // отменяет стандартную форму отправки
//   cardContainer.prepend(createCard(card));
//   closeAddPopup();
//   placeFormValidator.disableButton();
// }

// popupEditOpen.addEventListener("click", openPopupEdit);
// popupAddOpen.addEventListener("click", openAddPopup);
// popupEditClose.addEventListener("click", closePopupEdit);
// popupNewItemClose.addEventListener("click", closeAddPopup);
// popupCardClose.addEventListener("click", closeCardPopup);
// formEditElement.addEventListener("submit", handleFormEditSubmit);
// formNewItemElement.addEventListener("submit", handleFormAddCardSubmit);
