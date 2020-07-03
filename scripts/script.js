const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__input_el_name');
let jobInput = formElement.querySelector('.popup__input_el_profession');
let name = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__profession');


// Функция изменения видимости popup
function popupToggle() {
  if (popup.classList.contains('popup_hidden')) {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
  }
  popup.classList.toggle('popup_hidden');
}

// Функция-обработчик отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  popupToggle();
}

editButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', popupToggle);
