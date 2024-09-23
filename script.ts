// Отримуємо елементи DOM
const modal = document.getElementById('myModal') as HTMLElement;
const btn = document.getElementById('myBtn') as HTMLElement;
const closeBtn = document.getElementsByClassName('close')[0] as HTMLElement;

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
    const header = document.querySelector('header') as HTMLElement;
    if (scrollPosition > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});


async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

        // Відображення даних на сторінці
        const postsContainer = document.getElementById('posts') as HTMLElement;
        posts.forEach((post: { title: string; body: string }) => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Помилка при отриманні постів:', error);
    }
}

fetchPosts();