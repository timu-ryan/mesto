export default class Card {
  constructor(data, selector, imageClick, trashClick, likeClick, likeStatus, userId) {
    
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isUser = data.isUser;
    this._selector = selector;
    this.likes = data.likes;
    this.isOwner = data.isOwner;
    this._imageClick = imageClick;
    this._trashClick = trashClick;
    this._cardTemplate = document.querySelector(this._selector).content.querySelector(".card");
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardText = this._cardElement.querySelector(".card__text");
    this._cardLikeButton = this._cardElement.querySelector(".card__like");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete");
    this._likeNumber = this._cardElement.querySelector(".card__like-number");
    this._likeClick = likeClick;
    this._likeStatus = likeStatus;
    this._isLiked = this._likeStatus(this);
    this._number = this.likes.length;
    // this._isUserCard = isUserCard;
    this._userId = userId;
  }

  getId() {
    return this._id;
  }

  getLikeId(index) {
    return this.likes[index]._id;
  }

  getLikeStatus() {
    return this._isLiked;
  }

  setLikeStatus(isLiked) {
    this._isLiked = isLiked;
  }

  getLikeNumber() {
    return this._likeNumber.textContent;
  }

  setLikeNumber(likeNumber) {
    this._likeNumber.textContent = likeNumber;
  }

  getNumber() {
    return this._number;
  }

  setNumber(number) {
    this._number = number
  }


  _getElement() {
    return this._cardElement;
  }

  _deleteTrashButton() {
    if(!this._isUser) {
      this._cardDeleteButton.classList.add("card__delete_hidden")
    }
    // console.log(this._isUser);
  }

  generate() {
    this._element = this._getElement();
    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    this._likeNumber.textContent = this.likes.length;
    //////////////////////////////////////////////////////////////////////////
    this._deleteTrashButton();
    if (this._isLiked) {
      this.removeLikeCard();
    } else {
      this.addLikeCard();
    }
    return this._element;
  }

  // _likeCard() {
  //   this._likeClick();
  // }

  addLikeCard() {
    this._cardLikeButton.classList.add("card__like_active");
  }
  removeLikeCard() {
    this._cardLikeButton.classList.remove("card__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  deleteCard() {
    this._deleteCard();
  }

  _openImage() {
    this._imageClick(this._name, this._link);
  }

  _openDeletePopup() {
    this._trashClick(this);
  }

  _toggleLike() {
    if (this._isLiked) {
      // this.removeLikeCard();
      this._likeClick(this, this._isLiked);
      // console.log(123)

    } else {
      // this.addLikeCard();
      this._likeClick(this, this._isLiked);        
      
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._toggleLike()
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._openDeletePopup();
    });
    this._cardImage.addEventListener("click", () => {
      this._openImage();
    });
  }
}
