const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let d;
let gameState = "start"; 

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
  else if (event.keyCode == 38 && d != "DOWN") d = "UP";
  else if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
  else if (event.keyCode == 40 && d != "UP") d = "DOWN";

  if (event.key === "Enter" && gameState === "start") {
    gameState = "playing";
  } else if (event.key === "Enter" && gameState === "gameover") {
    document.location.reload();
  }
}

function drawBackground() {
  let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#ffb3d9"); 
  gradient.addColorStop(1, "#cc99ff"); 
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawStartScreen() {
  drawBackground();
  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("🐍 Snake Cute Edition 🐍", canvas.width / 2, canvas.height / 2 - 40);
  
  ctx.font = "20px Arial";
  ctx.fillText("Pressione ENTER para começar", canvas.width / 2, canvas.height / 2);
}

function drawGameOver() {
  drawBackground();
  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("💔 Game Over 💔", canvas.width / 2, canvas.height / 2 - 40);
  
  ctx.font = "20px Arial";
  ctx.fillText("Score final: " + score, canvas.width / 2, canvas.height / 2);
  ctx.fillText("Pressione ENTER para jogar novamente", canvas.width / 2, canvas.height / 2 + 40);
}

function drawGame() {
  drawBackground();

  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "#ff4da6"; 
    } else {
      ctx.fillStyle = "#b366ff"; 
    }
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.font = "20px Arial";
  ctx.fillText("🍓", food.x, food.y + box);

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, 10, 20);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= canvas.width || snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    gameState = "gameover";
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    drawGame();
  } else if (gameState === "gameover") {
    drawGameOver();
  }
}

setInterval(gameLoop, 100);
