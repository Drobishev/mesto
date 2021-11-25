// вводим переменные для pop-up редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.pop-up_profile');
const profileClosePopup = profilePopup.querySelector('.pop-up__close');
let profileformElement = profilePopup.querySelector(".pop-up__form");

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const profileInputName = document.querySelector('#name');
const profileInputAbout = document.querySelector('#about');

// функция открытия редактирования профиля
function openProfilePopup(){
    profilePopup.classList.add('pop-up_opened');
    profileInputName.value = profileName.textContent; 
    profileInputAbout.value = profileAbout.textContent;
}
//  функция закрытия редактирования профиля
function closeProfilePopup(){
    profilePopup.classList.remove('pop-up_opened');
}
// функция сохранения изменений профиля и закрытия
function saveProfilePopup(evt){
    evt.preventDefault();
    profileName.textContent = profileInputName.value;   
    profileAbout.textContent = profileInputAbout.value;
    closeProfilePopup();
}
// обработчики pop-up редактирования профиля
profileEditButton.addEventListener('click', openProfilePopup); // кнопка открытия профиля
profileClosePopup.addEventListener('click', closeProfilePopup); // кнопка закрытия профиля
profileformElement.addEventListener('submit', saveProfilePopup); // отправка

// переменные pop-up добавления мест
const addCardsButton = document.querySelector('.profile__add-button');
const addCardsPopup = document.querySelector('.pop-up_add-card');
const closeCardsPopup = addCardsPopup.querySelector('.pop-up__close');
const cardsPopupForm = addCardsPopup.querySelector(`.pop-up__form`);

const inputTitleCard = addCardsPopup.querySelector(`#title-place`);
const inputScrCard = addCardsPopup.querySelector(`#scr-images`);

const template = document.querySelector(".template-card");
const card = document.querySelector(`.elements`);

// переменные zoom
const popupZoom = document.querySelector(`.pop-up_zoom`);
const closeZoomButton = popupZoom.querySelector(`.pop-up__close`);
const popupZoomImage = popupZoom.querySelector(`.pop-up__image-zoom`);
const popupZoomTitle = popupZoom.querySelector(`.pop-up__title-zoom`);


// функция открытия pop-up zoom
function openPopupZoom(){
    popupZoom.classList.add('pop-up_opened');
}

// функция закрытия pop-up zoom
function closePopupZoom(){
    popupZoom.classList.remove('pop-up_opened');
}
// функция заполнения zoom
function addPopupZoom(evt) {
    popupZoomImage.src = evt.target.src;
    popupZoomImage.alt = evt.target.alt;
    popupZoomTitle.textContent = evt.target.alt;
    openPopupZoom();
  }

// функция открытия pop-up добавления мест
function openAddCardsPopup(){
    addCardsPopup.classList.add('pop-up_opened');
}
// функия закрытия pop-up добавления мест
function closeAddCardsPopup(){
    addCardsPopup.classList.remove('pop-up_opened');
}

closeCardsPopup.addEventListener('click', closeAddCardsPopup); // закрытие pop-up добавления мест
addCardsButton.addEventListener('click', openAddCardsPopup); // открытие pop-up добавления мест
closeZoomButton.addEventListener('click', closePopupZoom); // закрытие pop-up zoom

// заполнение карточек мест
const createElementDomNode = (item) => {
    const elementTemplate = template.content.querySelector(".element").cloneNode(true);
    
    const elementDeleteButton = elementTemplate.querySelector(".element__delete-button");
    const elementImage = elementTemplate.querySelector(".element__image");
    const elementLike = elementTemplate.querySelector(".element__like");
    const elementTitle = elementTemplate.querySelector(".element__title");
    
    elementTitle.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;
    
    elementLike.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active')
    });

    elementDeleteButton.addEventListener('click', (evt) => {
        evt.target.closest('.element').remove()
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
    closeAddCardsPopup();
}

cardsPopupForm.addEventListener('submit', saveAddCardsPopup);// отправка pop-up добавления мест
  
// добавления карточек мест из базы
const result = initialCards.map((item) => {
    return createElementDomNode(item);
  }); 
  card.append(...result);