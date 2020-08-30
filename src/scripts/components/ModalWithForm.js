import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
  constructor(handleFormSubmit, modalSelector) {
    super(modalSelector);
    this._formElement = this._modalElement.querySelector('.modal__container');
    
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._formElement.querySelectorAll('.modal__input');
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

  // Расширение метода закрытия модального окна
  close() {
    super.close();
    this._formElement.reset();
  }
}
