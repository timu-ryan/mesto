export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  invalidInputClass: 'popup__input_invalid',
  submitButtonSelector: '.popup__button',
  disabledSubmitButtonClass: 'popup__button_disabled'
}

export const popupEdit = document.querySelector(".popup_edit");
export const popupNewItem = document.querySelector(".popup_new-item");

export const popupEditOpen = document.querySelector(".profile__edit");
export const popupAddOpen = document.querySelector(".profile__button");

export const popupEditClose = document.querySelector(".popup__close_button_edit");
export const popupNewItemClose = document.querySelector(".popup__close_button_new-item");
export const popupCardClose = document.querySelector(".popup__close_button_card");

export const popupOverlays = document.querySelectorAll(".popup");

export const formNewItemElement = document.querySelector(".popup__form_object_new-item");
export const formEditElement = document.querySelector(".popup__form_object_edit");

export const profileName = document.querySelector(".profile__name-text"); // имя из профиля
export const profileDescription = document.querySelector(".profile__description");

export const cardContainer = document.querySelector(".cards");

export const profileForm = document.forms.edit;
export const placeForm = document.forms.placeAdd;
export const nameInput = profileForm.elements.name;
export const descriptionInput = profileForm.elements.description;
export const placeNameInput = placeForm.elements.placeName;
export const placeLinkInput = placeForm.elements.placeLink;
export const popupCard = document.querySelector(".popup_card");
export const popupImage = document.querySelector(".popup__image");
export const popupImageDescription = document.querySelector(".popup__image-description");