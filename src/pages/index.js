import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import { 
  initialCards, 
  sectionSelector, 
  cardSelector, 
  objectOfValidation,
  editProfileButton,
  editAvatarButton,
  addCardButton,
  imagePopupSelector,
  editPopupSelector,
  addPopupSelector,
  confirmPopupSelector,
  avatarPopupSelector,
  renderLoading
} from '../utils/constants.js';
import PopupWithSubmit from '../components/PopupWithSubmit';


// Обёртки форм
const editProfileForm = document.querySelector(editPopupSelector).querySelector('.popup__container');
const editAvatarForm = document.querySelector(avatarPopupSelector).querySelector('.popup__container');
const addCardForm = document.querySelector(addPopupSelector).querySelector('.popup__container');



// Функция-обработчик ошибки ответа сервера
const handleResponseError = (err) => {
  console.log(err);
}



// Инициализируем блок с данными пользователя
const profile = new UserInfo({ 
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__profession',
  userAvatarSelector: '.profile__image'
});

// Инициализируем модальное окно увеличения изображения
const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

// Запускаем валидацию форм
const editProfileFormValidator = new FormValidator(objectOfValidation, editProfileForm);
editProfileFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(objectOfValidation, editAvatarForm);
editAvatarFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(objectOfValidation, addCardForm);
addCardFormValidator.enableValidation();

// Инициализируем API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '584f4afd-78a5-47f8-908c-ac61484f6bb9',
    'Content-Type': 'application/json'
  }
})


renderLoading(true);
// Далее проверяем, есть ли корректный ответ от сервера и выбираем сценарий наполнения страницы
Promise.all([api.getData(), api.getUserData()])
  .then(([initialCards, userData]) => {
    // Заполнение профиля на основе полученных от сервера данных
    profile.setUserInfo({name: userData.name, info: userData.about});
    profile.setUserAvatar(userData.avatar);

    // Функция добавления карточки в контейнер
    const addCard = (data, cardSelector) => {
      const card = new Card({
        data: data,
        handleCardClick: (data) => {
          popupImage.open(data)
        },
        handleLikeClick: () => {
          const handleLikeClick = !card.likes.some(item => item._id === userData._id)
            ? api.likeItem(data._id)
            : api.unlikeItem(data._id);

          handleLikeClick
            .then((data) => {
              card.likes = data.likes;
              card.setLikesQuantity();
              Promise.resolve();
            })
            .catch(handleResponseError);
        },
        handleDeleteClick: () => {
          return new Promise((resolve) => {
            popupDelete.open();
            popupDelete.setSubmitMethod (() => {
              api.deleteItem(data._id)
                .then(() => {
                  resolve();
                  popupDelete.close();
                })
                .catch(handleResponseError);
            });
          });
        }
      }, cardSelector);
    
      const cardElement = card.generateCard();

      if (card.likes.some(item => item._id === userData._id)) {
        cardElement.querySelector('.card__button_act_like').classList.add('card__button_active');
      }

      if (data.owner._id !== userData._id) {
        cardElement.querySelector('.card__button_act_delete').style.display = "none";
      }

      cardList.addItem(cardElement);
    }

    // Инициализируем контейнер с карточками
    const cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          addCard(item, cardSelector);
        }
      }, sectionSelector
    ); 
    cardList.renderItems();

    // Инициализируем модальное окно добавления карточки
    const popupAdd = new PopupWithForm(
      (data) => {
        popupAdd.setSubmitText('Сохранение...');
        api.saveNewItem({ name: data.place, link: data.link })
          .then(data => {
            addCard(data, cardSelector)
            popupAdd.close();
            popupAdd.setSubmitText('Создать');
          })
          .catch(handleResponseError);
      }, addPopupSelector
    );
    popupAdd.setEventListeners();

    // Инициализируем модальное окно редактирования профиля
    const popupEdit = new PopupWithForm(
      async (data) => {
        popupEdit.setSubmitText('Сохранение...');
        await api.saveUserData({ name: data.name, about: data.info })
        profile.setUserInfo(data);
        popupEdit.close();
        popupEdit.setSubmitText('Сохранить')
      }, editPopupSelector
    );
    popupEdit.setEventListeners();

    const popupAvatar = new PopupWithForm(
      async (data) => {
        popupAvatar.setSubmitText('Сохранение...')
        await api.saveUserAvatar(data);
        profile.setUserAvatar(data.avatar);
        popupAvatar.close();
        popupAvatar.setSubmitText('Сохранить')
      }, avatarPopupSelector
    );
    popupAvatar.setEventListeners();

    // Инициализируем модальное окно подтверждения удаления
    const popupDelete = new PopupWithSubmit(confirmPopupSelector);
    popupDelete.setEventListeners();

    // Открываем модальное окно редактирования профиля по клику на кнопку редактирования
    editProfileButton.addEventListener('click', () => {
      // Заполняем поля формы информацией из профиля
      popupEdit.setInitialState(profile.getUserInfo());
      
      editProfileFormValidator.resetValidation(true);
      popupEdit.open();
    });

    // Открываем модальное окно добавления изображений по клику на кнопку "+"
    addCardButton.addEventListener('click', () => {  
      addCardFormValidator.resetValidation(false);
      popupAdd.open();
    });

    // Открываем модальное окно редактирования профиля по клику на кнопку редактирования
    editAvatarButton.addEventListener('click', () => {
      editAvatarFormValidator.resetValidation(false);
      popupAvatar.open();
    });
  })
  .catch(err => {
    // const errorMessageElement = document.createElement('div');
    // errorMessageElement.innerHTML = 
    //   `<p>${err}</p>
    //   <p>Приложение работает в демонстрационном режиме!</p>`;
    // errorMessageElement.style = 'margin: 0 12px; font: 1.6em/1 Arial; color: crimson; text-align: center;';
    // document.querySelector('.header').before(errorMessageElement);
    
    const errorMessage = `${err}\nПриложение работает в демонстрационном режиме!`
    alert(errorMessage);

    const userId = '01';

    const delay = (sec) => {
      return new Promise((resolve) => {
        setTimeout(resolve, sec);
      })
    }

    // Функция добавления карточки в контейнер
    const addCard = (data, cardSelector) => {
      const card = new Card({
        data: data,
        handleCardClick: (data) => {
          popupImage.open(data)
        },
        handleLikeClick: () => {
          if (card.likes.length === 0) {
            card.likes.push(userId);
          } else {
            card.likes.pop();
          }
          card.setLikesQuantity();
        },
        handleDeleteClick: () => {
          return new Promise((resolve) => {
            popupDelete.open();
            popupDelete.setSubmitMethod (async () => {
              await delay(500);
              resolve();
              popupDelete.close();
            });
          });
        }
      }, cardSelector);

      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }

    // Заполняем профиль данными
    profile.setUserInfo({name: 'Фёдор Конюхов', info: 'Российский путешественник'});
    profile.setUserAvatar('https://uznayvse.ru/images/celebs/konuhov_medium.jpg');

    // Инициализируем контейнер с карточками
    const cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          addCard({ name: item.name, link: item.link, likes: [] }, cardSelector);
        }
      }, sectionSelector
    ); 
    // Наполняем контейнер исходными карточками
    cardList.renderItems();

    // Инициализируем модальное окно подтверждения удаления
    const popupDelete = new PopupWithSubmit(confirmPopupSelector);
    popupDelete.setEventListeners();

    // Инициализируем модальное окно редактирования профиля
    const popupEdit = new PopupWithForm(
      async (data) => {
        popupEdit.setSubmitText('Сохранение...');
        await delay(500);
        profile.setUserInfo(data);
        popupEdit.close();
        popupEdit.setSubmitText('Сохранить');
      }, editPopupSelector
    );
    popupEdit.setEventListeners();

    // Инициализируем модальное окно добавления карточки
    const popupAdd = new PopupWithForm(
      async (data) => {
        popupAdd.setSubmitText('Сохранение...');
        await delay(500);
        addCard({ name: data.place, link: data.link, likes: [] }, cardSelector);
        popupAdd.close();
        popupAdd.setSubmitText('Создать');
      }, addPopupSelector
    );
    popupAdd.setEventListeners();

    // Инициализируем модальное окно редактирования аватара
    const popupAvatar = new PopupWithForm(
      async (data) => {
        popupAvatar.setSubmitText('Сохранение...');
        await delay(500);
        profile.setUserAvatar(data.avatar);
        popupAvatar.close();
        popupAvatar.setSubmitText('Сохранить');
      }, avatarPopupSelector
    );
    popupAvatar.setEventListeners();

    // Открываем модальное окно редактирования профиля по клику на кнопку редактирования
    editProfileButton.addEventListener('click', () => {
      // Заполняем поля формы информацией из профиля
      popupEdit.setInitialState(profile.getUserInfo());
      
      editProfileFormValidator.resetValidation(true);
      popupEdit.open();
    });

    // Открываем модальное окно добавления изображений по клику на кнопку "+"
    addCardButton.addEventListener('click', () => {  
      addCardFormValidator.resetValidation(false);
      popupAdd.open();
    });

    // Открываем модальное окно редактирования профиля по клику на кнопку редактирования
    editAvatarButton.addEventListener('click', () => {
      editAvatarFormValidator.resetValidation(false);
      popupAvatar.open();
    });
  })
  .finally(() => {
    renderLoading(false);
  })


