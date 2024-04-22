function updateHearts() { 
  // Renderización corazones
  for (let i = 0; i < 3; i++) {
    if (i < vidas) {
      hearts[i] = red_heart;
    } else {
      hearts[i] = white_heart;
    }
    image(hearts[i], i * 20 + 560, 575, 20, 20);
  }
}

function updateVidas() { 
  if (vidas > 0) {
    vidas--;
    startTime = millis();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (sapo.position.y > 0) {
      sapo.position.add(0, -1);
    }
  } else if (keyCode === DOWN_ARROW) {
    if (sapo.position.y < rows - 1) {
      sapo.position.add(0, 1);
    }
  } else if (keyCode === LEFT_ARROW) {
    if (sapo.position.x > 0) {
      sapo.position.add(-1, 0);
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (sapo.position.x < cols - 1) {
      sapo.position.add(1, 0);
    }
  }
}