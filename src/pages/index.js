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
const popupWithImage = new PopupWithImage(".popup_card");
popupWithImage.setEventListeners();

const popupAddNewCard = new PopupWithForm(".popup_new-item", (formData) => {
  handleFormAddCardSubmit(formData);
});
popupAddOpen.addEventListener("click", () => {
  //formNewItemElement.reset();
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
  //avatarForm.reset();
  avatarFormValidator.resetValidation();
  avatarFormValidator.disableButton();
  popupEditAvatar.open();
});
popupEditAvatar.setEventListeners();

function handleFormEditAvatarSubmit(data) {
  // avatarImage.src = data.avatarLink;
  popupEditAvatar.renderLoading(true);
  api
    .setNewAvatar(data.avatarLink)
    .then((res) => userInfo.setAvatar(data.avatarLink))
    .then((res) => popupEditAvatar.close())
    .catch((err) => console.log(`error: ${err}`))
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}

function deleteCard(card) {
  popupDeleteCard.renderLoading(true);
  api
    .deleteCard(card._id)
    .then((res) => {
      card.deleteCard();
    })
    .then((res) => popupDeleteCard.close())
    .catch((err) => console.log(`error: ${err}`))
    .finally(() => {
      popupDeleteCard.renderLoading(false);
    });
}

const popupDeleteCard = new PopupWithConfirmation(
  ".popup_delete-card",
  (card) => {
    deleteCard(card);
  }
);
popupDeleteCard.setEventListeners();

function openCardDeletePopup(card) {
  popupDeleteCard.open(card);
}

const cardList = new Section( ///////////---------------------------------------------------------------------
  {
    //items: [],
    renderer: (item) => {
      cardContainer.prepend(createCard(item));
    },
  },
  ".cards"
);
//cardList.renderItems();////////////////======================================

function openImagePopup(name, link) {
  popupWithImage.open(name, link);
}

function likeStatus(card) {
  let isSetLike = true;
  for (let i = 0; i < card.likes.length; i++) {
    //isSetLike = card.likes[i]._id !== userInfo.getId();
    isSetLike = card.getLikeId(i) !== userInfo.getId();
    if (!isSetLike) return isSetLike;
  }

  return isSetLike;
}

function handleLikeClick(card, likeStatus) {
  if (likeStatus) {
    api
      .setLikeCard(card.getId())
      .then((res) => {
        card.addLikeCard();
        //card._isLiked = !card._isLiked;
        card.setLikeStatus(!card.getLikeStatus());
        //card._likeNumber.textContent = card._number + 1;
        card.setLikeNumber(card.getNumber() + 1);
        //card._number = card._number + 1;
        card.setNumber(card.getNumber() + 1);
        //console.log(1)
        //console.log(!card.getLikeStatus())
      })
      .catch((err) => console.log(err));
  } else {
    api
      .removeLikeCard(card.getId())
      .then((res) => {
        card.removeLikeCard();
        //card._isLiked = !card._isLiked;
        card.setLikeStatus(!card.getLikeStatus());
        //card._likeNumber.textContent = card._number - 1;
        card.setLikeNumber(card.getNumber() - 1);
        //card._number = card._number - 1;
        card.setNumber(card.getNumber() - 1);
        //console.log(2)
        //console.log(!card.getLikeStatus())
      })
      .catch((err) => console.log(`error: ${err}`));
  }
}

function createCard(item) {
  const cardObject = new Card(
    item,
    "#card-template",
    openImagePopup,
    openCardDeletePopup,
    handleLikeClick,
    likeStatus,
    userInfo.getId()
  );
  const cardElement = cardObject.generate();
  return cardElement;
}

function handleFormEditSubmit(data) {
  userInfo.setUserInfo(data.name, data.description);
  popupEditProfile.renderLoading(true);
  api
    .editMyProfile(data.name, data.description)
    .catch((err) => console.log(`error: ${err}`))
    .finally(() => {
      popupEditProfile.renderLoading(false);
      popupEditProfile.close();
    });
}

function handleFormAddCardSubmit(data) {
  const card = {
    name: data.placeName,
    link: data.placeLink,
  };
  popupAddNewCard.renderLoading(true);
  api
    .setNewCard(card.name, card.link)
    .then((res) => {
      res.isUser = true;
      cardList.addItem(res);
    })
    .catch((err) => console.log(`error: ${err}`))
    .finally(() => {
      popupAddNewCard.renderLoading(false);
      popupAddNewCard.close();
    });
  placeFormValidator.disableButton();
}

// const myProfile = api.getMyProfile();
// myProfile
//   .then((res) => {
//     userInfo.setAvatar(res.avatar);
//     userInfo.setUserInfo(res.name, res.about);
//     userInfo._id = res._id;
//     return res;
//   })
//   .catch((err) => console.log(`Error: ${err}`));

// //начальная отрисовка страницы
// const cards = api.getInitialCards();
// cards
//   .then((res) => {
//     res.reverse().forEach((item) => {
//       item.isUser = (userInfo.getId() === item.owner._id);
//       cardList.addItem(item);
//     });
//     return res;
//   })
//   .catch((err) => console.log(`Error: ${err}`));

Promise.all([api.getMyProfile(), api.getInitialCards()])
  .then(([info, initialCards]) => {
    userInfo.setAvatar(info.avatar);
    userInfo.setUserInfo(info.name, info.about);
    userInfo._id = info._id;
    initialCards.forEach((item) => {
      item.isUser = userInfo.getId() === item.owner._id;
    });
    cardList.renderItems(initialCards);
  })
  .catch((err) => console.log(`Error: ${err}`));
