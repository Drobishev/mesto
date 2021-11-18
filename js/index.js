const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.pop-up');
const profileClosePopup = document.querySelector('.pop-up__close');
const profileSumbitPopup = document.querySelector('.pop-up__sambit-buttom');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const profileInputName = document.querySelector('#name');
const profileInputAbout = document.querySelector('#about');

function openProfilePopup(){
    profilePopup.classList.add('pop-up_opened');
    profileInputName.value = profileName.textContent; 
    profileInputAbout.value = profileAbout.textContent;
}

function closeProfilePopup(){
    profilePopup.classList.remove('pop-up_opened');
}

function saveProfilePopup(evt){
    evt.preventDefault();
    profileName.textContent = profileInputName.value;   
    profileAbout.textContent = profileInputAbout.value;
    closeProfilePopup();
}

profileEditButton.addEventListener('click', openProfilePopup);
profileClosePopup.addEventListener('click', closeProfilePopup);
profileSumbitPopup.addEventListener('click', saveProfilePopup);

