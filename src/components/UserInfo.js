export default class UserInfo {
  constructor(name, info, avatar) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
    this._avatar = document.querySelector(avatar);
  }
  getUserInfo() {
    // console.log(this._avatar.src)
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    }
  }
  setAvatar(src) {
    this._avatar.src = src;
  }
  setUserInfo(newName, newInfo) {
    this._name.textContent = newName;
    this._info.textContent = newInfo;
  }
}