const popupEdit = document.querySelector(".popup_edit");
const popupNewItem = document.querySelector(".popup_new-item");
const popupCard = document.querySelector(".popup_card");
const popupImage = document.querySelector(".popup__image");
const popupImageDescription = document.querySelector(".popup__image-description");

const popupEditOpen = document.querySelector(".profile__edit");
const popupAddOpen = document.querySelector(".profile__button");
// const popupCardOpen = document.querySelector(".card__image");
// const popupCloseList = document.querySelectorAll(".popup__close");
const popupEditClose = document.querySelector(".popup__close_button_edit");
const popupNewItemClose = document.querySelector(".popup__close_button_new-item");
const popupCardClose = document.querySelector(".popup__close_button_card");


// const formElements = document.querySelectorAll(".popup__form");
const formNewItemElement = document.querySelector(".popup__form_object_new-item");
const formEditElement = document.querySelector(".popup__form_object_edit");

const nameInput = document.querySelector(".popup__input_text_name");
const jobInput = document.querySelector(".popup__input_text_description");

const profileName = document.querySelector(".profile__name-text"); // имя из профиля
const profileDescription = document.querySelector(".profile__description");

const placeNameInput = document.querySelector(".popup__input_place_name");
const placeLinkInput = document.querySelector(".popup__input_place_link");

const cardContainer = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card"); //содержимое card template -> карта

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopupEdit() {
  nameInput.value = profileName.textContent; //задаем value инпута значения со страницы, чтобы при открытии попапа отображались они
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
}

function openAddPopup() {
  openPopup(popupNewItem);
}

function closePopupEdit() {
  closePopup(popupEdit);
}

function closeAddPopup() {
  closePopup(popupNewItem);
  formNewItemElement.reset();   // очищаем input после закрытия попапа
}

function closeCardPopup() {
  closePopup(popupCard);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault(); // отменяет стандартную форму отправки
  profileName.textContent = nameInput.value; // изменяем значения на странице на значения, введенные в импуте
  profileDescription.textContent = jobInput.value;
  closePopupEdit();
}

initialCards.forEach((card) => {  //загружает начальные 6 фотографий
  renderCard(addCard(card));
});

function addCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete");
  function openImage () {
    openPopup(popupCard);
    popupImage.setAttribute("src", card.link);
    popupImage.setAttribute("alt", card.name);
    popupImageDescription.textContent = cardElement.querySelector(".card__text").textContent;
  }
  function likeCard (evt) {
    evt.target.classList.toggle("card__like_active");
  } 
  cardElement.querySelector(".card__like").addEventListener("click", likeCard);
  cardImage.addEventListener("click", openImage);
  cardElement.querySelector(".card__text").textContent = card.name;
  cardImage.setAttribute("alt", card.name);
  cardImage.setAttribute("src", card.link);
  deleteButton.addEventListener('click', function () {
    deleteButton.closest(".card").remove();
  })
  return cardElement;
}

function renderCard (cardElement) {
  cardContainer.prepend(cardElement);
}

function handleFormAddCardSubmit(evt) {
  const card = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  evt.preventDefault(); // отменяет стандартную форму отправки
  renderCard(addCard(card));
  closeAddPopup();
}

popupEditOpen.addEventListener("click", openPopupEdit);
popupAddOpen.addEventListener("click", openAddPopup);
popupEditClose.addEventListener("click", closePopupEdit);
popupNewItemClose.addEventListener("click", closeAddPopup);
popupCardClose.addEventListener("click", closeCardPopup);
formEditElement.addEventListener("submit", handleFormEditSubmit);
formNewItemElement.addEventListener("submit", handleFormAddCardSubmit);
