// script.js

const memeGrid = document.getElementById("meme-grid");
const memeUpload = document.getElementById("meme-upload");
const addMemeBtn = document.getElementById("add-meme-btn");

// Хранение мемов (в памяти)
let memes = [];

// Функция для обновления отображения мемов
function renderMemes() {
memeGrid.innerHTML = "";
memes.sort((a, b) => b.votes - a.votes); // Сортируем по голосам

memes.forEach((meme, index) => {
const memeDiv = document.createElement("div");
memeDiv.classList.add("meme");

const img = document.createElement("img");
img.src = meme.url;

const voteCount = document.createElement("p");
voteCount.innerText = `Голоса: ${meme.votes}`;

const buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("meme-buttons");

const upvoteBtn = document.createElement("button");
upvoteBtn.innerText = "👍";
upvoteBtn.onclick = () => voteMeme(index, 1);

const downvoteBtn = document.createElement("button");
downvoteBtn.innerText = "👎";
downvoteBtn.onclick = () => voteMeme(index, -1);

buttonsDiv.appendChild(upvoteBtn);
buttonsDiv.appendChild(downvoteBtn);
memeDiv.appendChild(img);
memeDiv.appendChild(voteCount);
memeDiv.appendChild(buttonsDiv);

memeGrid.appendChild(memeDiv);
});
}

// Функция для добавления мема
function addMeme() {
const file = memeUpload.files[0];
if (!file) return alert("Выберите файл для загрузки!");

const reader = new FileReader();
reader.onload = function (e) {
memes.push({ url: e.target.result, votes: 0 });
renderMemes();
};
reader.readAsDataURL(file);

memeUpload.value = ""; // Сбросить выбор файла
}

// Функция для голосования за мем
function voteMeme(index, change) {
memes[index].votes += change;
renderMemes();
}

// Обработчик нажатия кнопки "Добавить мем"
addMemeBtn.addEventListener("click", addMeme);

// Первичная отрисовка (если мемов нет, страница будет пустой)
renderMemes();
