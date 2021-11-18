const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.pop-up');
const profileClosePopup = document.querySelector('.pop-up__close');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const profileInputName = document.querySelector('.pop-up__input[id="name"]');
const profileInputAbout = document.querySelector('.pop-up__input[id="about"]');

function openProfilePopup(){
    profilePopup.classList.add('pop-up_opened');
    profileInputName.value = profileName.textContent;
    profileInputAbout.value = profileAbout.textContent;
}

function closeProfilePopup(){
    profilePopup.classList.remove('pop-up_opened');
}

function saveProfilePopup(){
    profileName.textContent = profileInputName.value;
    profileAbout.textContent = profileInputAbout.value;
    function closeProfilePopup();
}

profileEditButton.addEventListener('click', openProfilePopup);
profileClosePopup.addEventListener('click', closeProfilePopup);
profilePopup.addEventListener('submit', saveProfilePopup);


