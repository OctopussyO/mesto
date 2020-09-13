import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    
    this._formElement = this._popupElement.querySelector('.popup__container');
    this._submitButtonElement = this._formElement.querySelector('.popup__save-button');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  // Метод получения значений полей ввода формы
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }


  // Расширение метода добавления слушателей событий (+ слушатель на отправку формы)
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  
  // Метод, заполняющий поля формы при открытии (для формы редактирования профиля)
  setInitialState(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  
  // Метод, изменяющий текст кнопки Submit
  setSubmitText(text) {
    this._submitButtonElement.textContent = text;
  }

  // Расширение метода закрытия модального окна
  close() {
    super.close();
    this._formElement.reset();
  }
}
