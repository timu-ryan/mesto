import "../pages/index.css";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import PopupWithImage from "./scripts/PopupWithImage";
import PopupWithForm from "./scripts/PopupWithForm";
import UserInfo from "./scripts/UserInfo";
import { initialCards, config } from "../utils/constants.js";

import {
  popupEdit,
  popupNewItem,
  popupEditOpen,
  popupAddOpen,
  formNewItemElement,
  profileName,
  profileDescription,
  cardContainer,
  profileForm,
  placeForm,
  nameInput,
  descriptionInput,
} from "../utils/constants.js";
import { popupCard } from "../utils/constants.js";

import Section from "../scripts/Section.js";

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(config, placeForm);
placeFormValidator.enableValidation();

const userInfo = new UserInfo(".profile__name-text", ".profile__description");

const popupWithImage = new PopupWithImage(popupCard);
popupWithImage.setEventListeners();

const popupAddNewCard = new PopupWithForm(popupNewItem, (evt) => {
  handleFormAddCardSubmit(evt);
});
popupAddOpen.addEventListener("click", () => {
  formNewItemElement.reset();
  placeFormValidator.resetValidation();
  placeFormValidator.disableButton();
  popupAddNewCard.open();
});
popupAddNewCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEdit, (evt) => {
  handleFormEditSubmit(evt);
});
popupEditOpen.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().name; //задаем value инпута значения со страницы, чтобы при открытии попапа отображались они
  descriptionInput.value = userInfo.getUserInfo().info;
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

function handleFormEditSubmit() {
  userInfo.setUserInfo(nameInput.value, descriptionInput.value);
  profileName.textContent = userInfo.getUserInfo().name;
  profileDescription.textContent = userInfo.getUserInfo().link;
}

function handleFormAddCardSubmit(data) {
  const card = {
    name: data.placeName,
    link: data.placeLink,
  };
  cardList.addItem(card);
  //cardContainer.prepend(createCard(card));
  placeFormValidator.disableButton();
}
