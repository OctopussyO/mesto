export default class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._activeButtonClass = data.activeButtonClass;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputValidClass = data.inputValidClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
  }

  // Метод проверки валидности поля ввода
  _isValidField(inputElement) {
    return inputElement.validity.valid;
  };

  // Метод проверки валидности формы
  _isValidForm() {
    return this._inputs.some((inputElement) => !inputElement.validity.valid);
  };

  // Метод, добавляющий состояние валидного поля ввода
  _addValidInputState(inputElement, errorElement) {
    errorElement.textContent = '';
    inputElement.classList.add(this._inputValidClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  // Метод, добавляющий состояние невалидного поля ввода
  _addInvalidInputState(inputElement, errorElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(this._inputValidClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  // Метод, разблокирующий кнопку отправки формы
  _addValidSubmitState () {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.add(this._activeButtonClass);
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  // Метод, блокирующий кнопку отправки формы
  _addInvalidSubmitState () {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.remove(this._activeButtonClass);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  // Метод - обработчик валидности поля ввода
  _handleInput (inputElement) {
    const errorElement = this._formElement.querySelector(`.${this._errorClass}_in_${inputElement.name}`);
    if (this._isValidField(inputElement)) {
      this._addValidInputState(inputElement, errorElement);
    } else {
      this._addInvalidInputState(inputElement, errorElement);
    }
  }

  // Метод-обработчик состояния кнопки
  _handleButton() {
    if (!this._isValidForm()) {
      this._addValidSubmitState();
    } else {
      this._addInvalidSubmitState();
    }
  }

  
  // Публичный метод проверки валидности формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._inputs.forEach((inputElement) => {
      
      inputElement.addEventListener('input', () => {
        this._handleInput(inputElement);
        this._handleButton();
      });
    });
  }

  // Публичный метод "сброса" результатов предыдущей валидации (необходима для "обновления" результатов
  // после закрытия формы без сохранения)
  resetValidation () {
    this._inputs.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`.${this._errorClass}_in_${inputElement.name}`);
      this._addValidInputState(inputElement, errorElement);
    });

    if (this._formElement.name === 'edit-form') {
      this._addValidSubmitState(this._buttonElement);
    } else if (this._formElement.name === 'add-form') {
      this._addInvalidSubmitState(this._buttonElement);
    }
  }
}
