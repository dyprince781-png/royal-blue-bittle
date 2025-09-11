// Load images
const beetleImg = new Image();
beetleImg.src = "assets/beetle.png";

const rockImg = new Image();
rockImg.src = "assets/rock.png";

const bgImg = new Image();
bgImg.src = "assets/background.png";

let player = { x: 50, y: 150, size: 40, dy: 0, gravity: 0.8, jumpPower: -12, grounded: true };
let obstacles = [];
let score = 0;
let gameOver = false;

// Jump function
function jump() {
  if (player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});
document.addEventListener("touchstart", jump);

// Game loop
function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background (optional)
  if (bgImg.complete) {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  }

  // Player
  player.y += player.dy;
  player.dy += player.gravity;
  if (player.y + player.size >= canvas.height) {
    player.y = canvas.height - player.size;
    player.dy = 0;
    player.grounded = true;
  }

  ctx.drawImage(beetleImg, player.x, player.y, player.size, player.size);

  // Obstacles
  if (Math.random() < 0.02) {
    obstacles.push({ x: canvas.width, y: 160, size: 40 });
  }

  obstacles.forEach((obs, i) => {
    obs.x -= 5;
    ctx.drawImage(rockImg, obs.x, obs.y, obs.size, obs.size);

    // Collision
    if (
      player.x < obs.x + obs.size &&
      player.x + player.size > obs.x &&
      player.y < obs.y + obs.size &&
      player.y + player.size > obs.y
    ) {
      gameOver = true;
      alert("Game Over! Final Score: " + score);
      document.location.reload();
    }

    if (obs.x + obs.size < 0) obstacles.splice(i, 1);
  });

  // Score
  score++;
  document.getElementById("score").innerText = "Score: " + score;

  requestAnimationFrame(update);
}

update();
