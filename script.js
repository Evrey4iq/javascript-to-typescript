"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Отримуємо елементи DOM
const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const closeBtn = document.getElementsByClassName('close')[0];
// Відкриття модального вікна при кліку на кнопку
btn.addEventListener('click', () => {
    modal.style.display = 'block';
});
// Закриття модального вікна при кліку на "X"
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
// Закриття модального вікна при кліку за його межами
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    console.log('Поточна позиція скролу:', scrollPosition);
    // Наприклад, змінюємо фоновий колір хедера після певного скролу
    const header = document.querySelector('header');
    if (scrollPosition > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
    else {
        header.style.backgroundColor = 'transparent';
    }
});
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
            const posts = yield response.json();
            // Відображення даних на сторінці
            const postsContainer = document.getElementById('posts');
            posts.forEach((post) => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
                postsContainer.appendChild(postElement);
            });
        }
        catch (error) {
            console.error('Помилка при отриманні постів:', error);
        }
    });
}
fetchPosts();
