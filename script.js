const boardElement = document.querySelector("#board");
const movesElement = document.querySelector("#moves");
const timerElement = document.querySelector("#timer");
const bestElement = document.querySelector("#best");
const messageElement = document.querySelector("#message");
const newGameButton = document.querySelector("#new-game");

const solvedBoard = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let tiles = [...solvedBoard];
let moves = 0;
let startedAt = null;
let timerInterval = null;
let gameWon = false;

function getBestScore() {
  try {
    return Number(localStorage.getItem("puzzle-best")) || null;
  } catch {
    return null;
  }
}

function showBestScore() {
  const best = getBestScore();
  bestElement.textContent = best === null ? "—" : best;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimer() {
  if (startedAt === null) return;
  const seconds = Math.floor((Date.now() - startedAt) / 1000);
  timerElement.textContent = formatTime(seconds);
}

function getNeighbors(index) {
  const neighbors = [];
  const row = Math.floor(index / 3);
  const column = index % 3;

  if (row > 0) neighbors.push(index - 3);
  if (row < 2) neighbors.push(index + 3);
  if (column > 0) neighbors.push(index - 1);
  if (column < 2) neighbors.push(index + 1);

  return neighbors;
}

function renderBoard() {
  boardElement.replaceChildren();

  tiles.forEach((value, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = value === 0 ? "tile empty" : "tile";
    button.textContent = value === 0 ? "" : value;
    button.disabled = value === 0 || gameWon;
    button.setAttribute(
      "aria-label",
      value === 0 ? "খালি ঘর" : `টাইল ${value}`
    );

    if (value !== 0) {
      button.addEventListener("click", () => moveTile(index));
    }

    boardElement.append(button);
  });
}

function moveTile(index) {
  if (gameWon) return;

  const emptyIndex = tiles.indexOf(0);
  if (!getNeighbors(emptyIndex).includes(index)) return;

  if (startedAt === null) {
    startedAt = Date.now();
    timerInterval = setInterval(updateTimer, 250);
  }

  [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
  moves += 1;
  movesElement.textContent = moves;
  renderBoard();

  if (tiles.every((value, position) => value === solvedBoard[position])) {
    finishGame();
  }
}

function finishGame() {
  gameWon = true;
  clearInterval(timerInterval);
  updateTimer();

  messageElement.textContent = `দারুণ! তুমি ${moves} চালে পাজলটি সমাধান করেছ!`;

  const best = getBestScore();
  if (best === null || moves < best) {
    try {
      localStorage.setItem("puzzle-best", String(moves));
    } catch {
      // Browser storage বন্ধ থাকলেও গেম চলবে।
    }
    showBestScore();
    messageElement.textContent += " নতুন সেরা স্কোর!";
  }

  renderBoard();
}

function shuffleBoard() {
  tiles = [...solvedBoard];
  let previousEmptyIndex = -1;

  // সমাধান করা বোর্ড থেকে বৈধ চাল দিয়ে মেশানো হয়,
  // তাই পাজলটি সবসময় সমাধানযোগ্য থাকে।
  for (let step = 0; step < 120; step += 1) {
    const emptyIndex = tiles.indexOf(0);
    let options = getNeighbors(emptyIndex).filter(
      (index) => index !== previousEmptyIndex
    );

    if (options.length === 0) options = getNeighbors(emptyIndex);

    const nextIndex = options[Math.floor(Math.random() * options.length)];
    [tiles[emptyIndex], tiles[nextIndex]] = [tiles[nextIndex], tiles[emptyIndex]];
    previousEmptyIndex = emptyIndex;
  }

  // খুব কম সম্ভাবনায় বোর্ড সমাধান হয়ে গেলে আরেকটি বৈধ চাল দাও।
  if (tiles.every((value, index) => value === solvedBoard[index])) {
    const emptyIndex = tiles.indexOf(0);
    const nextIndex = getNeighbors(emptyIndex)[0];
    [tiles[emptyIndex], tiles[nextIndex]] = [tiles[nextIndex], tiles[emptyIndex]];
  }
}

function startNewGame() {
  clearInterval(timerInterval);
  timerInterval = null;
  startedAt = null;
  moves = 0;
  gameWon = false;

  movesElement.textContent = "0";
  timerElement.textContent = "00:00";
  messageElement.textContent = "টাইলগুলো সাজিয়ে পাজল সমাধান করো!";

  shuffleBoard();
  renderBoard();
  showBestScore();
}

document.addEventListener("keydown", (event) => {
  const emptyIndex = tiles.indexOf(0);
  let tileIndex;

  // Arrow key চাপলে খালি ঘর ওই দিকে সরে।
  if (event.key === "ArrowUp") tileIndex = emptyIndex + 3;
  else if (event.key === "ArrowDown") tileIndex = emptyIndex - 3;
  else if (event.key === "ArrowLeft") tileIndex = emptyIndex + 1;
  else if (event.key === "ArrowRight") tileIndex = emptyIndex - 1;
  else return;

  event.preventDefault();
  if (tileIndex >= 0 && tileIndex < 9) moveTile(tileIndex);
});

newGameButton.addEventListener("click", startNewGame);

startNewGame();
