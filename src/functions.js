function levelUp() {
  newLevel.play();
  level++;
  score += 1000;
  startTime = millis();
  vidas = 3;
  hearts = [red_heart, red_heart, red_heart];
  meta = [false, false, false, false, false, false];
  setMusic();
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
  startTime = millis();
  sapo.position.x = floor(cols / 2);
  sapo.position.y = rows - 1;
  level = 1;
  score = 0;
  stopMusic();
  setMusic();
}

function setMusic() {
  music_level1.stop();
  music_level2.stop();
  music_level3.stop();
  switch (level) {
    case 1:
      music_level1.play();
      music_level1.setVolume(0.3);
      break;
    case 2:
      music_level2.play();
      music_level2.setVolume(0.3);
      break;
    case 3:
      music_level3.play();
      music_level3.setVolume(0.3);
      break;
    case 4:
      music_level4.loop();
      music_level4.setVolume(0.3);
      break;
    default:
      break;
  }
}
function stopMusic() { 
  music_level1.stop();
  music_level2.stop();
  music_level3.stop();
  music_level4.stop();
  music_game_over.stop();
  music_win.stop();
}

function gameOverFunc() {
  stopMusic();
  music_game_over.play();
  music_game_over.setVolume(0.3);
  textSize(50);
  textAlign(CENTER);
  fill(255);
  text("GAME OVER", width / 2, height / 2 - 10);
  textSize(30);
  text(`SCORE: ${score}`, width / 2, height / 2 + 30);
  noLoop();
}

function youWinFunc() {
  stopMusic();
  music_win.play();
  music_win.setVolume(0.3);
  textSize(50);
  textAlign(CENTER);
  fill(255);
  text("YOU WIN", width / 2, height / 2 - 10);
  textSize(30);
  text(`SCORE: ${score}`, width / 2, height / 2 + 30);
  noLoop();
}