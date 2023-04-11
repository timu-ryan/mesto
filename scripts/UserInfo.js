export default class UserInfo {
  constructor(name, info) {
    this._name = document.querySelector(name).textContent;
    this._info = document.querySelector(info).textContent;
  }
  getUserInfo() {
    return {
      name: this._name,
      info: this._info,
    }
  }
  setUserInfo(newName, newInfo) {
    this._name = newName;
    this._info = newInfo;
  }
}