import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
import { config } from "../utils/constants.js";

import {
  popupEditOpen,
  popupAddOpen,
  formNewItemElement,
  cardContainer,
  profileForm,
  placeForm,
  nameInput,
  descriptionInput,
  popupAvatarOpen,
  avatarForm,
  avatarImage,
  buttonPopupAvatar,
  buttonPopupAddCard,
  buttonPopupProfile,
  buttonPopupDeleteCard,
} from "../utils/constants.js";

import Section from "../components/Section.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "becc8ca5-d976-4b95-9454-f44bbb906e9a",
    "Content-Type": "application/json",
  },
});

function renderLoading(button, buttonStandartText, isLoading) {
  if(isLoading) {
    button.textContent = 'Сохранение...';
    return;
  }
  button.textContent = buttonStandartText;
}

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(config, placeForm);
placeFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();

const userInfo = new UserInfo(
  ".profile__name-text",
  ".profile__description",
  ".profile__avatar"
);
// console.log(userInfo.getUserInfo())
const popupWithImage = new PopupWithImage(".popup_card");
popupWithImage.setEventListeners();

const popupAddNewCard = new PopupWithForm(".popup_new-item", (formData) => {
  handleFormAddCardSubmit(formData);
});
popupAddOpen.addEventListener("click", () => {
  formNewItemElement.reset();
  placeFormValidator.resetValidation();
  placeFormValidator.disableButton();
  popupAddNewCard.open();
});
popupAddNewCard.setEventListeners();

const popupEditProfile = new PopupWithForm(".popup_edit", (formData) => {
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

const popupEditAvatar = new PopupWithForm(".popup_avatar", (formData) => {
  handleFormEditAvatarSubmit(formData);
});
popupAvatarOpen.addEventListener("click", () => {
  avatarForm.reset();
  avatarFormValidator.resetValidation();
  avatarFormValidator.disableButton();
  popupEditAvatar.open();
});
popupEditAvatar.setEventListeners();

function handleFormEditAvatarSubmit(data) {
  avatarImage.src = data.avatarLink;
  api.setNewAvatar(data.avatarLink)
    .then(() => {renderLoading(buttonPopupAvatar, 'Сохранить', true)})
    .catch(err => console.log(`error: ${err}`))
    .finally(() => {renderLoading(buttonPopupAvatar, 'Сохранить', false)});
}

const popupDeleteCard = new PopupWithConfirmation(".popup_delete-card");
popupDeleteCard.setEventListeners();

const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      //console.log(item)
      cardContainer.prepend(createCard(item));
    },
  },
  ".cards"
);
cardList.renderItems();

function openImagePopup(name, link) {
  popupWithImage.open(name, link);
}

function likeStatus() {
  let isSetLike = true;
  for (let i = 0; i < this.likes.length; i++) {
    isSetLike = this.likes[i]._id !== userInfo._id;
  }
  return isSetLike;
}

function handleLikeClick(likeStatus) {
  if (likeStatus) {
    api.setLikeCard(this._id)
      .catch(err => console.log(err));
    this.addLikeCard();
  } else {
    api.removeLikeCard(this._id)
      .catch(err => console.log(err));
    this.removeLikeCard();
  }
}

function openCardDeletePopup() {
  popupDeleteCard.open();
  popupDeleteCard.getForm().addEventListener("submit", () => {
    api.deleteCard(this._id)
      .then(() => {renderLoading(buttonPopupDeleteCard, 'Да', true)})
      .catch(err => console.log(`error: ${err}`))
      .finally(() => {renderLoading(buttonPopupDeleteCard, 'Да', false)})
    this.deleteCard();
  });
}

function createCard(item) {
  const cardObject = new Card(
    item,
    "#card-template",
    openImagePopup,
    openCardDeletePopup,
    handleLikeClick,
    likeStatus,
  );
  // console.log(item)
  const cardElement = cardObject.generate();
  return cardElement;
}

function handleFormEditSubmit(data) {
  userInfo.setUserInfo(data.name, data.description);
  api.editMyProfile(data.name, data.description)
    .then(() => {renderLoading(buttonPopupProfile, 'Сохранить', true)})
    .catch(err => console.log(`error: ${err}`))
    .finally(() => {renderLoading(buttonPopupProfile, 'Сохранить', false)});}

function handleFormAddCardSubmit(data) {
  const card = {
    name: data.placeName,
    link: data.placeLink,
    likes: (data.likes = []),
    id: data.id,
    isUser: true,
  };
  cardList.addItem(card);
  api.setNewCard(card.name, card.link)
    .then(() => {renderLoading(buttonPopupAddCard, 'Добавить', true)})
    .catch(err => console.log(`error: ${err}`))
    .finally(() => {renderLoading(buttonPopupAddCard, 'Добавить', false)});
  //.then(res => res.json())
  //.then(res => console.log(res.owner._id));
  placeFormValidator.disableButton();
}

const myProfile = api.getMyProfile();
myProfile
  .then((res) => {
    userInfo.setAvatar(res.avatar);
    return res;
  })
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    return res;
  })
  .then((res) => {
    userInfo._id = res._id;
  })
  .catch((err) => console.log(`Error: ${err}`));

//начальная отрисовка страницы
const cards = api.getInitialCards();
cards
  .then((res) => {
    let i = 0;
    res.reverse().forEach((item) => {
      item.isUser = (userInfo._id === res[i].owner._id);
      cardList.addItem(item);
      i++;
    });
    return res;
  })
  .catch((err) => console.log(`Error: ${err}`));