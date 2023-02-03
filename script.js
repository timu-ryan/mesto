let popup = document.querySelector(".popup");
let openPopupButton = document.querySelector(".profile__edit");
let closePopupButton = document.querySelector(".popup__close");

// let saveButton = document.querySelector(".popup__button");
let formElement = document.querySelector(".popup__button");

function openPopup() {
  let pupupTextName = document.querySelector(".popup__name");
  let pupupTextDescription = document.querySelector(".popup__description");
  let name = document.querySelector(".profile__name-text").textContent;
  let description = document.querySelector(".profile__description").textContent;
  pupupTextName.setAttribute("value", name);
  pupupTextDescription.setAttribute("value", description);
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

openPopupButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  let newName = document.querySelector(".popup__name");
  let newDescription = document.querySelector(".popup__description");

  let name = document.querySelector(".profile__name-text");
  let description = document.querySelector(".profile__description");
  name.textContent = newName.value;
  description.textContent = newDescription.value;
  closePopup();
}

formElement.addEventListener("click", handleFormSubmit);
formElement.addEventListener("submit", handleFormSubmit);
