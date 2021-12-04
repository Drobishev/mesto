 // Объект с классами для валидации форм на странице
 const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__sambit-buttom',
    inactiveButtonClass: 'pop-up__sambit-buttom_inactive',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input-error'
  }; 
  

// Проверка на валидность
const isValid = (formElement, inputElement, { errorClass, inputErrorClass}) => {
  if (!inputElement.validity.valid) {    
    showInputError(formElement, inputElement, inputElement.validationMessage, { errorClass, inputErrorClass});
  } else {    
    hideInputError(formElement, inputElement, { errorClass, inputErrorClass});
  }
}; 

// Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, { errorClass, inputErrorClass}) => {  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функия убирает текст ошибки
const hideInputError = (formElement, inputElement, { errorClass, inputErrorClass}) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Валидация всех полей формы(для кнопки)
const hasInvalidInput = (inputList) => {
return inputList.some((inputElement) => {  
  return !inputElement.validity.valid;
})
}; 

// Функция состояния кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
// Если есть хотя бы один невалидный инпут
if (hasInvalidInput(inputList)) {
  // кнопка не активна
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
} else {
  // кнопка активна
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}
}; 

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass }) => {
// Все поля формы в массив
const inputList = Array.from(formElement.querySelectorAll(inputSelector));
// Нахоим кнопку отправки
const buttonElement = formElement.querySelector(submitButtonSelector);
toggleButtonState(inputList, buttonElement, inactiveButtonClass);

inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    isValid(formElement, inputElement, { errorClass, inputErrorClass });

    // В toggleButtonState передаем массив полей и кнопку
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
});
};

const enableValidation = (config) => {
  const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass} = config;
  
  const formList = Array.from(document.querySelectorAll(formSelector));

  // Переберём полученный массив форм
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    
      evt.preventDefault();
    });

    // в функцию setEventListeners передаем элемент формы
    
    setEventListeners(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass });
  });
};

// Вызовем функцию
enableValidation(validationConfig);

function resetForm(popup, conf) {
    const {
        formSelector,
        // submitButtonSelector,
        inputSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
      } = conf
  const form = popup.querySelector(formSelector);
  // const submit= form.querySelector(submitButtonSelector); 
  // submit.classList.add(inactiveButtonClass);  
  const inputs = form.querySelectorAll(inputSelector);
  inputs.forEach((input) => hideInputError(form, input, conf));  
  };
 
