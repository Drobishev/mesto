const popups = document.querySelectorAll('.pop-up')
// вводим переменные для pop-up редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.pop-up_profile');
const profileformElement = profilePopup.querySelector(".pop-up__form");
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const profileInputName = document.querySelector('#name');
const profileInputAbout = document.querySelector('#about');

// переменные pop-up добавления мест
const addCardsButton = document.querySelector('.profile__add-button');
const addCardsPopup = document.querySelector('.pop-up_add-card');
const cardsPopupForm = addCardsPopup.querySelector(`.pop-up__form`);
const submitButtonCards = addCardsPopup.querySelector(`.pop-up__sambit-buttom`);
const inputTitleCard = addCardsPopup.querySelector(`#title-place`);
const inputScrCard = addCardsPopup.querySelector(`#scr-images`);

const template = document.querySelector(".template-card");
const card = document.querySelector(`.elements`);

// переменные zoom
const popupZoom = document.querySelector(`.pop-up_zoom`);
const popupZoomImage = popupZoom.querySelector(`.pop-up__image-zoom`);
const popupZoomTitle = popupZoom.querySelector(`.pop-up__title-zoom`);

const conf = {
  formSelector: '.pop-up__form',
//   submitButtonSelector: '.pop-up__sambit-buttom',
  inputSelector: '.pop-up__input',  
  inactiveButtonClass: 'pop-up__sambit-buttom_inactive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error'
}; 

// функция открытия pop-up
function openPopup(popup){  
  popup.classList.add('pop-up_opened');
  document.addEventListener('keydown', closePopupOfEsc); 
}

// функция закрытия pop-up
function closePopup(popup){
    popup.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', closePopupOfEsc);
}

// функция сохранения изменений профиля и закрытия
function saveProfilePopup(evt){
    evt.preventDefault();
    profileName.textContent = profileInputName.value;   
    profileAbout.textContent = profileInputAbout.value;
    closePopup(profilePopup);
}


// обработчики pop-up редактирования профиля
profileEditButton.addEventListener('click', () => {
    openPopup(profilePopup)
    profileInputName.value = profileName.textContent; 
    profileInputAbout.value = profileAbout.textContent;
    resetForm(profilePopup, conf);
    
});

// отправка профиля
profileformElement.addEventListener('submit', saveProfilePopup);

// функция заполнения zoom
function addPopupZoom(evt) {
    popupZoomImage.src = evt.target.src;
    popupZoomImage.alt = evt.target.alt;
    popupZoomTitle.textContent = evt.target.alt;
    openPopup(popupZoom);
}

// открытие pop-up добавления мест
addCardsButton.addEventListener('click',  () => {
    openPopup(addCardsPopup);
    inputTitleCard.value = "";
    inputScrCard.value = "";
    resetForm(addCardsPopup, conf);
    // деактивирую кнопку только для добавления мест, тк на видео в задании в попапе профиля она активна,
    // но у меня при первом открытие перед заполнением она все равно неактивна?!
    submitButtonCards.classList.add('pop-up__sambit-buttom_inactive');  
});

//функция закрытия pop-up попапа при нажатии кнопки ESC
function closePopupOfEsc(evt) { 
    if (evt.key === 'Escape') { 
        const openedPopup = document.querySelector('.pop-up_opened')
        closePopup(openedPopup); 
    }
}

// Закрытие pop-up при нажатие на крестик и Overlow
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('pop-up_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('pop-up__close')) {
          closePopup(popup)
        }
    })
});

// заполнение карточек мест
function createElementDomNode(item) {
    const elementTemplate = template.content.querySelector(".element").cloneNode(true);
    const elementDeleteButton = elementTemplate.querySelector(".element__delete-button");
    const elementImage = elementTemplate.querySelector(".element__image");
    const elementLike = elementTemplate.querySelector(".element__like");
    const elementTitle = elementTemplate.querySelector(".element__title");

    elementTitle.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;

    elementLike.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    });

    elementDeleteButton.addEventListener('click', (evt) => {
        evt.target.closest('.element').remove();
    });

    elementImage.addEventListener('click', addPopupZoom);

    return elementTemplate;
}

// функция сохранения pop-up добавления мест
function saveAddCardsPopup(evt){
    evt.preventDefault();
    const userCardElement = createElementDomNode({name: inputTitleCard.value, link: inputScrCard.value});
      card.prepend(userCardElement);
      inputTitleCard.value = "";
      inputScrCard.value = "";
      closePopup(addCardsPopup);
}

// отправка pop-up добавления мест
cardsPopupForm.addEventListener('submit', saveAddCardsPopup);
  
// добавления карточек мест из базы
const result = initialCards.map((item) => {
    return createElementDomNode(item);
  }); 
  card.append(...result);