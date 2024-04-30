function levelUp() {
  newLevel.play();
  level++;
  score += 1000;
  startTime = millis();
  vidas = 3;
  hearts = [red_heart, red_heart, red_heart];
  meta = [false, false, false, false, false, false];
}

function metasAlcanzadas() { 
  for (i in meta) {
    if (!meta[i]) {
      return false;
    }
  }
  return true;
}

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

function reinicio() {
  for (i in meta) {
    meta[i] = false;
  }
  vidas = 3;
  sapo.position.x = floor(cols / 2);
  sapo.position.y = rows - 1;
  score = 0;
  level = 1;
}