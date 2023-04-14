import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import { initialCards, config } from "../utils/constants.js";

import {
  popupEditOpen,
  popupAddOpen,
  formNewItemElement,
  cardContainer,
  profileForm,
  placeForm,
  nameInput,
  descriptionInput,
} from "../utils/constants.js";

import Section from "../components/Section.js";

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(config, placeForm);
placeFormValidator.enableValidation();

const userInfo = new UserInfo(".profile__name-text", ".profile__description");

const popupWithImage = new PopupWithImage('.popup_card');
popupWithImage.setEventListeners();

const popupAddNewCard = new PopupWithForm('.popup_new-item', (formData) => {
  handleFormAddCardSubmit(formData);
});
popupAddOpen.addEventListener("click", () => {
  formNewItemElement.reset();
  placeFormValidator.resetValidation();
  placeFormValidator.disableButton();
  popupAddNewCard.open();
});
popupAddNewCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_edit', (formData) => {
  handleFormEditSubmit(formData);
});

popupEditOpen.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  nameInput.value = user.name; //задаем value инпута значения со страницы, чтобы при открытии попапа отображались они
  descriptionInput.value = user.info;
  profileFormValidator.resetValidation();
  popupEditProfile.open();
});
popupEditProfile.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardContainer.prepend(createCard(item));
    },
  },
  ".cards"
);
cardList.renderItems();

function openImagePopup(name, link) {
  popupWithImage.open(name, link);
}

function createCard(item) {
  const cardObject = new Card(item, "#card-template", openImagePopup);
  const cardElement = cardObject.generate();
  return cardElement;
}

function handleFormEditSubmit(data) {
  userInfo.setUserInfo(data.name, data.description);
}

function handleFormAddCardSubmit(data) {
  const card = {
    name: data.placeName,
    link: data.placeLink,
  };
  cardList.addItem(card);
  placeFormValidator.disableButton();
}
