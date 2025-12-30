let currentPlayer = "X";
let box = document.querySelectorAll(".box");
let boxes = ["", "", "", "", "", "", "", "", ""];
let pop = document.querySelector(".sound");
let cancel_pop = document.querySelector(".cancel_pop");
let win_pop = document.querySelector(".win_pop");
let scoreX = document.querySelector("#scoreX");
let scoreY = document.querySelector("#scoreO");
let draw = document.querySelector("#draw");
let res_btn = document.querySelector(".reset_button");
let res_game = document.querySelector(".reset_game");

box.forEach(function (boxElement, index) {
  boxElement.addEventListener("click", function () {
    if (boxes[index] === "") {
      popSound();
      boxElement.textContent = currentPlayer;
      boxes[index] = currentPlayer;

      const winner = checkWinner();
      if (winner) {
        winMessage(`Player ${winner} has won!`);
        winSound();
        updateScore(winner);
        setTimeout(resetGame, 2000);
        return;
      }

      const isDraw = checkDraw();
      if (isDraw) {
        winMessage("Game drawn !!!");
        draw.textContent = Number(draw.textContent) + 1;
        setTimeout(resetGame, 2000);
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    } else {
      boxTakenMessage();
      cancelSound();
    }
  });
});

if (res_btn) {
  res_btn.addEventListener("click", () => {
    resetGame();
  });
}

if (res_game) {
  res_game.addEventListener("click", () => {
    resetScore();
    resetGame();
  });
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of winPatterns) {
    if (boxes[a] !== "" && boxes[a] === boxes[b] && boxes[b] === boxes[c]) {
      return boxes[a];
    }
  }
  return null;
}

function resetGame() {
  boxes.fill("");
  box.forEach((b) => (b.textContent = ""));
  currentPlayer = "X";
}

function winMessage(text) {
  const message = document.createElement("div");
  message.className = "win-message";
  message.textContent = text || "Player won!";
  document.body.appendChild(message);
  setTimeout(function () {
    message.remove();
  }, 2000);
}

function checkDraw() {
  if (!checkWinner() && boxes.every((val) => val !== "")) {
    return true;
  }
  return null;
}

function popSound() {
  pop.currentTime = 0;
  pop.play();
}

function cancelSound() {
  cancel_pop.currentTime = 0;
  cancel_pop.play();
}

function winSound() {
  win_pop.currentTime = 0;
  win_pop.play();
}

function updateScore(winner) {
  if (winner === "X") {
    scoreX.textContent = Number(scoreX.textContent) + 1;
  } else if (winner === "O") {
    scoreY.textContent = Number(scoreY.textContent) + 1;
  }
}

function boxTakenMessage() {
  const msg = document.createElement("div");
  msg.className = "taken-msg";
  msg.textContent = "Box already taken!";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1000);
}

function resetScore() {
  scoreX.textContent = 0;
  scoreY.textContent = 0;
  draw.textContent = 0;
}
