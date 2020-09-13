import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._formElement = this._popupElement.querySelector('.popup__container');
  }

  // Публичный метод, позволяющий изменять функцию-обработчик отправки формы
  setSubmitMethod(submitMethod) {
    this._handleFormSubmit = submitMethod;
  }

  // Расширение метода установки слушателей
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}