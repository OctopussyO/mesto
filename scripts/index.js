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


// Обёртки
const profile = document.querySelector('.profile');
const cardsContainer = document.querySelector('.gallery');
const cardTemplate = document.querySelector('#card-template').content;
const modalEdit = document.querySelector('.modal_act_edit-profile');
const formEdit = modalEdit.querySelector('.modal__container');
const modalAdd = document.querySelector('.modal_act_add-card');
const formAdd = modalAdd.querySelector('.modal__container');
const modalEnlarge = document.querySelector('.modal_act_enlarge-image');
const modalOverlays = Array.from(document.querySelectorAll('.modal'));

// Данные полей форм
const nameInput = formEdit.querySelector('.modal__input[name="modal-name"]');
const jobInput = formEdit.querySelector('.modal__input[name="modal-job"]');
const placeInput = formAdd.querySelector('.modal__input[name="modal-place"]');
const linkInput = formAdd.querySelector('.modal__input[name="modal-link"]');

// Кнопки
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const closeButtons = Array.from(document.querySelectorAll('.modal__close-button'));

// Прочие элементы DOM
const name = profile.querySelector('.profile__name');
const job = profile.querySelector('.profile__profession');
const modalImage = modalEnlarge.querySelector('.modal__image');
const modalCaption = modalEnlarge.querySelector('.modal__image-caption');



// Функция открытия модального окна, добавляющая возможность закрытия модального 
// окна по нажатию клавиши "Escape"
function openModal(modal) {
  modal.classList.add('modal_active');
  document.body.addEventListener('keydown', handleEscape);
}

// Функция закрытия модального окна, убирающая возможность закрытия модального 
// окна по нажатию клавиши "Escape"
function closeModal(modal) {
  modal.classList.remove('modal_active');
  document.body.removeEventListener('keydown', handleEscape);
}


// Функция, вызывающая закрытие модального окна по нажатию клавиши "Escape"
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.modal_active'));
  }
}

// Функция-обработчик отправки формы редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы.

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closeModal(modalEdit);
}

// Функция добавления карточек
function addCard(place, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__heading').textContent = place;
  cardImage.src = link;
  cardImage.alt = `${place}, фотография`;

  return cardElement;
}

// Функция рендеринга карточки
function renderCard(card) {
  cardsContainer.prepend(card);
}

// Функция-обработчик отправки формы добавления карточек
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  renderCard(addCard(placeInput.value, linkInput.value));

  closeModal(modalAdd);
  
  // Очищаем поля input
  formAdd.reset();
}

// Функция увеличения карточек
function enlargeImage(card) {
  const cardCaption = card.querySelector('.card__heading');
  const cardImage = card.querySelector('.card__image');

  modalImage.src = cardImage.src;
  modalImage.alt = cardImage.alt;
  modalCaption.textContent = cardCaption.textContent;

  openModal(modalEnlarge);
}



// Добавляем слушатели событий на кнопки карточек галереи
cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.card__button_act_like')) {
    // Добавляем возможность ставить лайки
    evt.target.closest('.card__button_act_like').classList.toggle('card__button_active');
  } else if (evt.target.classList.contains('card__button_act_enlarge-image')) {
    // Добавляем возможность увеличения картинки
    enlargeImage(evt.target.closest('.card'));
  } else if (evt.target.closest('.card__button_act_delete')) {
    //Добавляем возможность удаления карточки
    evt.target.closest('.card').remove();
  }
})

// Добавляем исходные карточки
initialCards.forEach(card => renderCard(addCard(card.name, card.link)));

// Открываем модальное окно редактирования профиля по клику на кнопку редактирования
editButton.addEventListener('click', () => {
  // При открытии модального окна добавляем слушатели на кнопки форм
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  resetValidation(modalEdit);

  openModal(modalEdit);
});

formEdit.addEventListener('submit', handleEditFormSubmit);


// Открываем модальное окно добавления изображений по клику на кнопку "+"
addButton.addEventListener('click', () => {
  // При открытии модального окна очищаем поля формы
  formAdd.reset();

  resetValidation(modalAdd);
  
  openModal(modalAdd);
});

formAdd.addEventListener('submit', handleAddFormSubmit);


// Закрытие модальных окон по клику на "Х"
closeButtons.forEach(function (button) {
  button.addEventListener('click', evt => {
    closeModal(evt.target.closest('.modal'));
    // evt.stopPropagation();
  });
});


// Закрытие модальных окон по клику вне контейнера
modalOverlays.forEach(function (modal) {
  modal.addEventListener('mousedown', evt => {
    if (!evt.target.closest('.modal__container')) {
      closeModal(evt.currentTarget);
    }
  });
});
