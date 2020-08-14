// Объект валидации
const objectOfValidation = {
  formSelector: 'form.modal__container',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  activeButtonClass: 'modal__save-button_unblocked',
  inactiveButtonClass: 'modal__save-button_blocked',
  inputValidClass: 'modal__input_valid',
  inputErrorClass: 'modal__input_invalid',
  errorClass: 'modal__error'
};


class FormValidator {
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

  // Функция проверки валидности поля ввода
  _isValidField(inputElement) {
    return inputElement.validity.valid;
  };

  // Функция проверки валидности формы
  _isValidForm() {
    return this._inputs.some((inputElement) => !inputElement.validity.valid);
  };

  // Функция, добавляющая состояние валидного поля ввода
  _addValidInputState(inputElement, errorElement) {
    errorElement.textContent = '';
    console.log()
    inputElement.classList.add(this._inputValidClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  // Функция, добавляющая состояние невалидного поля ввода
  _addInvalidInputState(inputElement, errorElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(this._inputValidClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  // Функция, разблокирующая кнопку отправки формы
  _addValidSubmitState () {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.add(this._activeButtonClass);
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  // Функция, блокирующая кнопку отправки формы
  _addInvalidSubmitState () {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.remove(this._activeButtonClass);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  // Функция-обработчик валидности поля ввода
  _handleInput (inputElement) {
    const errorElement = this._formElement.querySelector(`.${this._errorClass}_in_${inputElement.name}`);
    if (this._isValidField(inputElement)) {

      this._addValidInputState(inputElement, errorElement);
    } else {

      this._addInvalidInputState(inputElement, errorElement);
    }
  }

  // Функция-обработчик кнопки
  _handleButton() {
    if (!this._isValidForm()) {
      this._addValidSubmitState();
    } else {
      this._addInvalidSubmitState();
    }
  }

  // Публичный метод проверки валидности формы
  enableValidation() {
    // Отменяем стандартное поведение формы
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._inputs.forEach((inputElement) => {
      
      inputElement.addEventListener('input', () => {
        console.log(this)
        this._handleInput(inputElement);
        this._handleButton();
      });
    });
  }  
}

export {FormValidator, objectOfValidation};

// // Функция проверки валидности поля ввода
// const isValidField = inputElement => inputElement.validity.valid;

// // Функция проверки валидности формы
// const isValidForm = inputs => inputs.some((inputElement) => !inputElement.validity.valid);

// // Функция, добавляющая состояние валидного поля ввода
// const addValidInputState = (inputElement, errorElement, {inputValidClass, inputErrorClass}) => {
//   errorElement.textContent = '';
//   inputElement.classList.add(inputValidClass);
//   inputElement.classList.remove(inputErrorClass);
// }

// // Функция, добавляющая состояние невалидного поля ввода
// const addInvalidInputState = (inputElement, errorElement, {inputValidClass, inputErrorClass}) => {
//   errorElement.textContent = inputElement.validationMessage;
//   inputElement.classList.remove(inputValidClass);
//   inputElement.classList.add(inputErrorClass);
// }

// // Функция, разблокирующая кнопку отправки формы
// const addValidSubmitState = (buttonElement, {activeButtonClass, inactiveButtonClass}) => {
//   buttonElement.disabled = false;
//   buttonElement.classList.add(activeButtonClass);
//   buttonElement.classList.remove(inactiveButtonClass);
// }

// // Функция, блокирующая кнопку отправки формы
// const addInvalidSubmitState = (buttonElement, {activeButtonClass, inactiveButtonClass}) => {
//   buttonElement.disabled = true;
//   buttonElement.classList.remove(activeButtonClass);
//   buttonElement.classList.add(inactiveButtonClass);
// }

// // Функция-обработчик валидности поля ввода
// const handleInput = (formElement, inputElement, {errorClass, ...settings}) => {
//   const errorElement = formElement.querySelector(`.${errorClass}_in_${inputElement.name}`);
//   if (isValidField(inputElement)) {
//     addValidInputState(inputElement, errorElement, settings);
//   } else {
//     addInvalidInputState(inputElement, errorElement, settings);
//   }
// }

// // Функция-обработчик кнопки
// const handleButton = (inputs, buttonElement, {...settings}) =>{
//   if (!isValidForm(inputs)) {
//     addValidSubmitState(buttonElement, settings);
//   } else {
//     addInvalidSubmitState(buttonElement, settings);
//   }
// }

// // Функция-обработчик валиности формы
// const handleForm = (formElement, {inputSelector, submitButtonSelector, ...settings}) => {
//   // Отменяем стандартное поведение формы
//   formElement.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//   });

//   const inputs = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonSubmit = formElement.querySelector(submitButtonSelector);

//   inputs.forEach((inputElement) => {

//     inputElement.addEventListener('input', (evt) => {
//       handleInput(formElement, inputElement, settings);
//       handleButton(inputs, buttonSubmit, settings);
//     });
//   });
// }

// // Функция валидации форм
// const enableValidation = ({formSelector, ...settings}) => {

//   // Все формы
//   const forms = Array.from(document.querySelectorAll(formSelector));

//   forms.forEach((formElement) => {
//     handleForm(formElement, settings);
//   });
// }

// // Функция "сброса" результатов предыдущей валидации (необходима для "обновления" результатов
// // после закрытия формы без сохранения)
// const resetValidation = (modalElement, {inputSelector, errorClass, submitButtonSelector, ...settings}) => {
//   const inputs = Array.from(modalElement.querySelectorAll(inputSelector));

//   inputs.forEach((inputElement) => {
//     const errorElement = modalElement.querySelector(`.${errorClass}_in_${inputElement.name}`);
//     addValidInputState(inputElement, errorElement, settings);
//   });

//   const buttonSubmit = modalElement.querySelector(submitButtonSelector);

//   if (modalElement.classList.contains('modal_act_edit-profile')) {
//     addValidSubmitState(buttonSubmit, settings);
//   } else if (modalElement.classList.contains('modal_act_add-card')) {
//     addInvalidSubmitState(buttonSubmit, settings);
//   }
// }



// // Запускаем валидацию форм
// enableValidation (objectOfValidation);

