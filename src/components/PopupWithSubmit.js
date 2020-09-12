import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._formElement = this._popupElement.querySelector('.popup__container');
  }

  setSubmitMethod(submitMethod) {
    this._handleFormSubmit = submitMethod;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}