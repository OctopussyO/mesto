// Массив с данными исходных карточек
export const initialCards = [
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

// Объект валидации
export const objectOfValidation = {
  formSelector: 'form.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  activeButtonClass: 'popup__save-button_unblocked',
  inactiveButtonClass: 'popup__save-button_blocked',
  inputValidClass: 'popup__input_valid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error'
};

// Кнопки
export const editProfileButton = document.querySelector('.profile__edit-button');
export const editAvatarButton = document.querySelector('.profile__avatar-button');
export const addCardButton = document.querySelector('.profile__add-button');

// Селекторы
export const imagePopupSelector = '.popup_act_enlarge-image';
export const editPopupSelector = '.popup_act_edit-profile';
export const addPopupSelector = '.popup_act_add-card';
export const avatarPopupSelector = '.popup_act_edit-avatar';
export const confirmPopupSelector = '.popup_act_confirm';
export const sectionSelector = '.gallery';
export const cardSelector = '.card-template';
