export default class UserInfo {
  constructor(name, info) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    }
  }
  setUserInfo(newName, newInfo) {
    this._name.textContent = newName;
    this._info.textContent = newInfo;
  }
}