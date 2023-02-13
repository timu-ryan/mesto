const popup = document.querySelector(".popup");
const popupNewItem = document.querySelector(".popup_new-item");
const popupCard = document.querySelector(".popup_card");
const popupImage = document.querySelector(".popup__image");
const popupImageDescription = document.querySelector(".popup__image-description");

const popupOpen = document.querySelector(".profile__edit");
const popupAddOpen = document.querySelector(".profile__button");
// const popupCardOpen = document.querySelector(".card__image");
const popupClose = document.querySelectorAll(".popup__close");

const formElement = document.querySelectorAll(".popup__form");
const nameInput = document.querySelector(".popup__input_text_name");
const jobInput = document.querySelector(".popup__input_text_description");

const profileName = document.querySelector(".profile__name-text"); // имя из профиля
const profileDescription = document.querySelector(".profile__description");

const placeNameInput = document.querySelector(".popup__input_place_name");
const placeLinkInput = document.querySelector(".popup__input_place_link");

const cardContainer = document.querySelector(".cards");

const initialCards = [
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

function openPopup() {
  nameInput.value = profileName.textContent; //задаем value инпута значения со страницы, чтобы при открытии попапа отображались они
  jobInput.value = profileDescription.textContent;
  popup.classList.add("popup_opened");
}

function openAddPopup() {
  popupNewItem.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function closeAddPopup() {
  popupNewItem.classList.remove("popup_opened");
  placeNameInput.value = "";
  placeLinkInput.value = ""; // очищаем input после закрытия попапа
}

function closeCardPopup() {
  popupCard.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault(); // отменяет стандартную форму отправки
  profileName.textContent = nameInput.value; // изменяем значения на странице на значения, введенные в импуте
  profileDescription.textContent = jobInput.value;
  closePopup();
}
for (let i = 0; i < initialCards.length; i++) {  //загружает начальные 6 фотографий
  addCard(initialCards[i].name, initialCards[i].link);
}
function addCard(placeNameValue, placeLinkValue) {
  const cardTemplate = document.querySelector("#card-template").content; //содержимое card template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__like").addEventListener("click", function (evt) { // возможность ставить лайки
    evt.target.classList.toggle("card__like_active");
  });
  cardElement.querySelector(".card__image").addEventListener("click", function () { // возможность открыть изображение
    popupCard.classList.add("popup_opened");
    popupImage.setAttribute("src", cardElement.querySelector(".card__image").getAttribute("src"));
    popupImage.setAttribute("alt", cardElement.querySelector(".card__image").getAttribute("alt"));
    popupCard.setAttribute("style", "background-color: rgba(0, 0, 0, 0.9)");   // изменяем opacity background'а
    popupImageDescription.textContent = cardElement.querySelector(".card__text").textContent;
  });
  cardElement.querySelector(".card__text").textContent = placeNameValue;
  cardElement.querySelector(".card__image").setAttribute("alt", placeNameValue);
  cardElement.querySelector(".card__image").setAttribute("src", placeLinkValue);
  cardContainer.prepend(cardElement);
  const deleteButtons = document.querySelectorAll(".card__delete");
  deleteButtons.forEach((item) => {
  item.addEventListener("click", function () {
    item.parentElement.remove();
  });
});
}


function cardFormSubmit(evt) {
  evt.preventDefault(); // отменяет стандартную форму отправки
  addCard(placeNameInput.value, placeLinkInput.value);
  closeAddPopup();
}

popupOpen.addEventListener("click", openPopup);
popupAddOpen.addEventListener("click", openAddPopup);
popupClose[0].addEventListener("click", closePopup);
popupClose[1].addEventListener("click", closeAddPopup);
popupClose[2].addEventListener("click", closeCardPopup);
formElement[0].addEventListener("submit", handleFormSubmit);
formElement[1].addEventListener("submit", cardFormSubmit);
