const initialCards = [
  {
    name: 'Алтайский край',
    link: 'https://images.unsplash.com/photo-1494791286225-ea86fc957ba7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80'
  },
  {
    name: 'Ладожское озеро',
    link: 'https://images.unsplash.com/photo-1547846218-c982107d30f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1972&q=80'
  },
  {
    name: 'Гора Нургуш',
    link: 'https://images.unsplash.com/photo-1506516493400-bb5e8347bf0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80'
  },
  {
    name: 'Судак, Крым',
    link: 'https://images.unsplash.com/photo-1565342403875-07a8dc5ed13c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1551844931-cfcfecb3636f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2034&q=80'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1563943078-d83d3fb86468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'
  }
]

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

// Дункция добавления карточек "из коробки"
function addCard(name, link) {
  const cardContainer = document.querySelector('.gallery');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  
  cardElement.querySelector('.card__heading').textContent = name;
  cardElement.querySelector('.card__image').setAttribute('style', `background-image: url(${link})`);

  cardContainer.prepend(cardElement);
}


initialCards.forEach(card => addCard(card.name, card.link));

editButton.addEventListener('click', modalToggle);
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', modalToggle);

