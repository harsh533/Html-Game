const basket = document.getElementById('basket');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');

let score = 0;
let basketX = 150; // Initial basket position (center of the game area)
let basketSpeed = 5; // Speed at which the basket moves

// Function to move the basket
function moveBasket(event) {
  if (event.key === 'ArrowLeft' && basketX > 0) {
    basketX -= basketSpeed;
  } else if (event.key === 'ArrowRight' && basketX < gameArea.offsetWidth - basket.offsetWidth) {
    basketX += basketSpeed;
  }
  basket.style.left = basketX + 'px';
}

// Function to create falling objects
function createFallingObject() {
  const fallingObject = document.createElement('div');
  fallingObject.classList.add('falling-object');
  
  // Randomly position the falling object at the top of the game area
  const xPos = Math.random() * (gameArea.offsetWidth - 30);
  fallingObject.style.left = `${xPos}px`;
  
  gameArea.appendChild(fallingObject);

  let fallSpeed = Math.random() * 3 + 2; // Random speed for each object

  // Move the object down
  function moveObject() {
    const objectTop = parseFloat(fallingObject.style.top || 0);
    
    if (objectTop < gameArea.offsetHeight - 30) {
      fallingObject.style.top = objectTop + fallSpeed + 'px';
      requestAnimationFrame(moveObject);
    } else {
      checkCatch(fallingObject, xPos);
      gameArea.removeChild(fallingObject);
    }
  }
  
  moveObject();
}

// Check if the falling object has been caught by the basket
function checkCatch(fallingObject, xPos) {
  const objectBottom = parseFloat(fallingObject.style.top || 0) + 30;
  const basketTop = gameArea.offsetHeight - 20;

  if (objectBottom >= basketTop && xPos >= basketX && xPos <= basketX + basket.offsetWidth) {
    score++;
    scoreDisplay.textContent = score;
  }
}

// Game loop to generate falling objects
setInterval(createFallingObject, 1500); // Create a new object every 1.5 seconds

// Add event listener for arrow key movement
window.addEventListener('keydown', moveBasket);
