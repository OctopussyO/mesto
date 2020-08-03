// Объект валидации
objectOfValidation = {
  formSelector: 'form.modal__container',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  activeButtonClass: 'modal__save-button_unblocked',
  inactiveButtonClass: 'modal__save-button_blocked',
  inputValidClass: 'modal__input_valid',
  inputErrorClass: 'modal__input_invalid',
  errorClass: 'modal__error'
};

// Функция проверки валидности поля ввода
const isValidField = inputElement => inputElement.validity.valid;

// Функция проверки валидности формы
const isValidForm = inputs => inputs.some((inputElement) => !inputElement.validity.valid);

// Функция, добавляющая состояние валидного поля ввода
const addValidInputState = (inputElement, errorElement, inputValidClass, inputErrorClass) => {
  errorElement.textContent = '';
  inputElement.classList.add(inputValidClass);
  inputElement.classList.remove(inputErrorClass);
}

// Функция, добавляющая состояние невалидного поля ввода
const addInvalidInputState = (inputElement, errorElement, inputValidClass, inputErrorClass) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove(inputValidClass);
  inputElement.classList.add(inputErrorClass);
}

// Функция, разблокирующая кнопку отправки формы
const addValidSubmitState = (buttonElement, activeButtonClass, inactiveButtonClass) => {
  buttonElement.disabled = false;
  buttonElement.classList.add(activeButtonClass);
  buttonElement.classList.remove(inactiveButtonClass);
}

// Функция, блокирующая кнопку отправки формы
const addInvalidSubmitState = (buttonElement, activeButtonClass, inactiveButtonClass) => {
  buttonElement.disabled = true;
  buttonElement.classList.remove(activeButtonClass);
  buttonElement.classList.add(inactiveButtonClass);
}

// Функция-обработчик валидности поля ввода
const handleInput = (formElement, errorClass, inputElement, inputValidClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${errorClass}_in_${inputElement.name}`);
  if (isValidField(inputElement)) {
    addValidInputState(inputElement, errorElement, inputValidClass, inputErrorClass);
  } else {
    addInvalidInputState(inputElement, errorElement, inputValidClass, inputErrorClass);
  }
}

// Функция-обработчик кнопки
const handleButton = (inputs, buttonElement, activeButtonClass, inactiveButtonClass) =>{
  if (!isValidForm(inputs)) {
    addValidSubmitState(buttonElement, activeButtonClass, inactiveButtonClass);
  } else {
    addInvalidSubmitState(buttonElement, activeButtonClass, inactiveButtonClass);
  }
}

// Функция-обработчик валиности формы
const handleForm = (formElement, inputSelector, submitButtonSelector, errorClass, inputValidClass, 
  inputErrorClass, activeButtonClass, inactiveButtonClass) => {
  // Отменяем стандартное поведение формы
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSubmit = formElement.querySelector(submitButtonSelector);
  
  inputs.forEach((inputElement) => {

    inputElement.addEventListener('input', (evt) => {
      handleInput(formElement, errorClass, inputElement, inputValidClass, inputErrorClass);
      handleButton(inputs, buttonSubmit, activeButtonClass, inactiveButtonClass);
    });
  });
}

// Функция валидации форм
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, activeButtonClass, 
  inactiveButtonClass, inputValidClass, inputErrorClass, errorClass}) => {
  
  // Все формы
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((formElement) => {
    handleForm(formElement, inputSelector, submitButtonSelector, errorClass, inputValidClass, 
      inputErrorClass, activeButtonClass, inactiveButtonClass);
  });
}

// Функция "сброса" результатов предыдущей валидации (необходима для "обновления" результатов 
// после закрытия формы без сохранения)
const resetValidation = (modalElement, {inputSelector, errorClass, inputValidClass, 
  inputErrorClass, submitButtonSelector, activeButtonClass, inactiveButtonClass}) => {
  const inputs = Array.from(modalElement.querySelectorAll(inputSelector));

  inputs.forEach((inputElement) => {
    const errorElement = modalElement.querySelector(`.${errorClass}_in_${inputElement.name}`);
    addValidInputState(inputElement, errorElement, inputValidClass, inputErrorClass);
  });

  const buttonSubmit = modalElement.querySelector(submitButtonSelector);
  if (modalElement.classList.contains('modal_act_edit-profile')) {
    addValidSubmitState(buttonSubmit, activeButtonClass, inactiveButtonClass);
  } else if (modalElement.classList.contains('modal_act_add-card')) {
    addInvalidSubmitState(buttonSubmit, activeButtonClass, inactiveButtonClass);
  }
}


// Сбрасываем результаты предыдущей валидации при открытии формы редактирования профиля
editButton.addEventListener('click', () => {
  resetValidation(modalEdit, objectOfValidation);
});

// Сбрасываем результаты предыдущей валидации при открытии формы добавления карточки
addButton.addEventListener('click', () => {
  resetValidation(modalAdd, objectOfValidation);
});

// Запускаем валидацию форм
enableValidation (objectOfValidation);