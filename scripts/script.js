const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('.modal__close-button');
const formElement = modal.querySelector('.modal__container');

let nameInput = formElement.querySelector('.modal__input[name="modal-name"]');
let jobInput = formElement.querySelector('.modal__input[name="modal-job"]');
let name = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__profession');


// Функция изменения видимости modal
function modalToggle() {
  if (modal.classList.contains('modal_hidden')) {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
  }
  modal.classList.toggle('modal_hidden');
}

// Функция-обработчик отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  modalToggle();
}

editButton.addEventListener('click', modalToggle);
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', modalToggle);
