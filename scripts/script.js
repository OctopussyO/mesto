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
const addButton = profile.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.modal__close-button');
const modalEdit = document.querySelector('.modal_act_edit-profile');
const modalAdd = document.querySelector('.modal_act_add-card');
const formEdit = modalEdit.querySelector('.modal__container');

let nameInput = formEdit.querySelector('.modal__input[name="modal-name"]');
let jobInput = formEdit.querySelector('.modal__input[name="modal-job"]');
let name = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__profession');


// Функция изменения видимости modal
function modalToggle(modal) {  
  modal.classList.toggle('modal_hidden');
}

// Функция-обработчик отправки формы редактирования профиля
function formEditSubmitHandler(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы.

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  modalToggle(modalEdit);
}

// Функция-обработчик отправки формы добавления карточек
function formAddSubmitHandler(evt) {
  evt.preventDefault();

  let placeInput = modalAdd.querySelector('.modal__input[name="modal-place"]');
  let linkInput = modalAdd.querySelector('.modal__input[name="modal-link"]');

  addCard(placeInput.value, linkInput.value);

  modalToggle(modalAdd);
  
  // Очищаем поля input
  placeInput.value = '';
  linkInput.value = '';
}

// Функция увеличения карточек
function imageEnlarge(card) {
  const modalEnlarge = document.querySelector('.modal_act_enlarge-image');
  let modalImage = modalEnlarge.querySelector('.modal__image');
  let modalCaption = modalEnlarge.querySelector('.modal__image-caption');
  let cardCaption = card.querySelector('.card__heading');
  let cardImage = card.querySelector('.card__image');

  modalImage.src = cardImage.src;
  modalImage.alt = cardImage.alt;
  modalCaption.textContent = cardCaption.textContent;

  modalToggle(modalEnlarge);
}

// Функция добавления карточек
function addCard(place, link) {
  const cardContainer = document.querySelector('.gallery');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  let cardImage = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__heading').textContent = place;
  cardImage.src = link;
  cardImage.alt = `${place}, фотография`;

  // Добавляем возможность ставить лайки
  cardElement.querySelector('.card__button_act_like').addEventListener('click', evt => {
    evt.currentTarget.classList.toggle('card__button_active')
  });

  // Добавляем возможность увеличения картинки
  cardElement.querySelector('.card__button_act_enlarge-image').addEventListener('click', evt =>{
    imageEnlarge(evt.currentTarget.closest('.card'));
  });

  //Добавляем возможность удаления карточки
  cardElement.querySelector('.card__button_act_delete').addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  cardContainer.prepend(cardElement);
}


// Добавляем исходные карточки
initialCards.forEach(card => addCard(card.name, card.link));

// Открываем модальное окно редактирования профиля по клику на кнопку редактирования
editButton.addEventListener('click', () => {
  // При открытии модального окна добавляем слушатели на кнопки форм
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  modalToggle(modalEdit);
});

formEdit.addEventListener('submit', formEditSubmitHandler);


// Открываем модальное окно добавления изображений по клику на кнопку "+"
addButton.addEventListener('click', () => modalToggle(modalAdd));

modalAdd.querySelector('.modal__container').addEventListener('submit', formAddSubmitHandler);


// Закрытие модальных окон по клику на "Х"
closeButtons.forEach(function(button) {
  button.addEventListener('click', evt => modalToggle(evt.target.closest('.modal')));
});
