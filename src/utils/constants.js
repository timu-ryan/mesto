export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  invalidInputClass: 'popup__input_invalid',
  submitButtonSelector: '.popup__button',
  disabledSubmitButtonClass: 'popup__button_disabled'
}
export const popupEditOpen = document.querySelector(".profile__edit");
export const popupAddOpen = document.querySelector(".profile__button");
export const popupAvatarOpen = document.querySelector(".profile__pen");

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
export const avatarForm = document.forms.avatar;
export const nameInput = profileForm.elements.name;
export const descriptionInput = profileForm.elements.description;
export const avatarImage = document.querySelector(".profile__avatar");

export const popupCard = document.querySelector(".popup_card");
export const popupImage = document.querySelector(".popup__image");
export const popupImageDescription = document.querySelector(".popup__image-description");

export const buttonPopupAvatar = document.querySelector(".popup__button_avatar");
export const buttonPopupAddCard = document.querySelector(".popup__button_add");
export const buttonPopupProfile = document.querySelector(".popup__button_edit");
export const buttonPopupDeleteCard = document.querySelector(".popup__button_delete-card");