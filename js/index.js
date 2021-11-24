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
const AddCardsButton = document.querySelector('.profile__add-button');
const AddCardsPopup = document.querySelector('.pop-up_add-card');
const CloseCardsPopup = AddCardsPopup.querySelector('.pop-up__close');
let CardsPopupForm = AddCardsPopup.querySelector(".pop-up__form");

// функция открытия pop-up добавления мест
function openAddCardsPopup(){
    AddCardsPopup.classList.add('pop-up_opened');
}
// функия закрытия pop-up добавления мест
function closeAddCardsPopup(){
    AddCardsPopup.classList.remove('pop-up_opened');
}
// функция сохранения pop-up добавления мест
function saveAddCardsPopup(evt){
    evt.preventDefault();    
    closeProfilePopup();
}

// обработчики pop-up добавления мест
AddCardsButton.addEventListener('click', openAddCardsPopup); // открытие
CloseCardsPopup.addEventListener('click', closeAddCardsPopup); // закрытие
CardsPopupForm.addEventListener('submit', saveAddCardsPopup); // отправка