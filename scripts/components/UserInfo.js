export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  // Метод получения данных из профиля
  getUserInfo() {
    return { 
      name: this._userName.textContent, 
      info: this._userInfo.textContent
    }
  }

  // Метод добавления данных в профиль
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.info;
  }
}
