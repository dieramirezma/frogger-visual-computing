const scl = 50;
const metas = [1, 3, 5, 7, 9, 11];
// let meta = [false, false, false, false, false, false];
let meta = [true, true, true, false, true, true];
var pause = true;
let font;

// Declaración de arreglos para cada fila de carros y troncos
let carros1 = [];
let carros2 = [];
let carros3 = [];
let troncos1 = [];
let troncos2 = [];
let troncos3 = [];

let carros4 = [];
let carros5 = [];

// Vidas
let vidas = 3;
let hearts = [];

// Tiempo
let startTime = 0;
let totalTime = 15000;
let time_paused = 0;

let level = 1;
let score = 0;

let maxLevel = 4;

let inicio = false;

// Level Speeds 
let logsSpeeds = {
  1: [0.05, 0.07, 0.02],
  2: [0.08, 0.1, 0.05],
  3: [0.11, 0.13, 0.08],
  4: [0.14, 0.16, 0.11]
}

let carsSpeeds = {
  1: [0.02, 0.1, 0.04],
  2: [0.04, 0.12, 0.06],
  3: [0.06, 0.14, 0.08],
  4: [0.08, 0.16, 0.1]
}

function preload() {
  music_level1 = loadSound("media/sounds/music_level1.mp3");
  music_level2 = loadSound("media/sounds/music_level2.mp3");
  music_level3 = loadSound("media/sounds/music_level3.mp3");
  music_level4 = loadSound("media/sounds/music_level4.mp3");
  music_game_over = loadSound("media/sounds/music_game_over.mp3");
  music_win = loadSound("media/sounds/music_win.mp3");

    // Resources
  die_time = loadSound("media/sounds/die_time.mp3");
  landing_safe = loadSound("media/sounds/landing_safe.mp3");
  jump = loadSound("media/sounds/jump.mp3");
  splash = loadSound("media/sounds/splash.mp3");
  carHit = loadSound("media/sounds/carHit.mp3");
  frogWin = loadSound("media/sounds/frogWin.mp3");
  newLevel = loadSound("media/sounds/levelUp.mp3");
  gameOver = loadSound("media/sounds/gameOver.mp3");

  font = loadFont("fonts/MP16REG.ttf");
  
  white_heart = loadImage("media/images/white_heart.png");
  red_heart = loadImage("media/images/red_heart.png");
  midleRoad = loadImage("media/images/road.png");
  bottomRoad = loadImage("media/images/bottomRoad.png");
  topRoad = loadImage("media/images/topRoad.png");
  grass = loadImage("media/images/grass.png");
  sideWalk = loadImage("media/images/sideWalk.png");
  imgcarro1 = loadImage("media/images/carro5.png");
  imgcarro2 = loadImage("media/images/carro1.png");
  imgcarro3 = loadImage("media/images/carro2.png");
  imgcarro4 = loadImage("media/images/carro4.png");
  imgcarro5 = loadImage("media/images/carro5.png");
  river = loadImage("media/images/river.png");
  imgsapoganado = loadImage("media/images/sapoGanado.png");
  imgsapo = loadImage("media/images/sapopixel.png");
  imgsapoI = loadImage("media/images/sapopixelI.png");
  imgsapoD = loadImage("media/images/sapopixelD.png");
  imgsapoA = loadImage("media/images/sapopixelA.png");
  imgtronco = loadImage("media/images/log.png");
}

function setup() {
  let canvas = createCanvas(650, 600);
  canvas.parent('canvas-container')  

  // Inicialización tiempo
  startTime = millis();
  
  cols = width / scl;
  rows = height / scl;

  
  textFont(font);

  // Inicialización corazones
  for (let i = 0; i < vidas; i++) {
    hearts.push(red_heart);
  }

  sapo = new Sapo();

  // Instanciación carros
  for (let i = 0; i < 4; i++) {
    if (i < 3) {
      carros2.push(new Carro(4, createVector(9 * i, rows - 4), carsSpeeds[level][1]));
    } 
    
    if (i < 2) {
      carros4.push(new Carro(3, createVector(7 * i, rows - 3), 0.02));
      carros5.push(new Carro(5, createVector(7 * i, rows - 5), 0.03));
    }
    
    carros1.push(new Carro(2, createVector(4*i, rows - 2), carsSpeeds[level][0]));
    carros3.push(new Carro(6, createVector(5*i, rows - 6), carsSpeeds[level][2]));
  }

  // Instanciación troncos
  for (let i = 0; i < 3; i++) {
    troncos1.push(new Tronco(8, createVector(5*i, rows - 8), logsSpeeds[level][0]));
    if (i < 3) {
      troncos2.push(new Tronco(9, createVector(5 * i, rows - 9), logsSpeeds[level][1]));
    }
    troncos3.push(new Tronco(10, createVector(5*i, rows - 10), logsSpeeds[level][2]));
  }

  if (pause) {
    noLoop();
  }

  setMusic();

}

function draw() {
  if (!pause) {
    loop();
  }

  background(200);

  imageMode(CORNER);
  fill(0,0,255);
  rect(0, 0, cols * scl, ((rows * scl) / 2) - scl)
  image(grass, 0, 0,cols*scl, scl);
  image(river, 0, 1*scl,cols*scl, scl);
  image(river, 0, 2*scl,cols*scl, scl);
  image(river, 0, 3*scl,cols*scl, scl);
  image(river, 0, 4*scl,cols*scl, scl);
  image(grass, 0, 5*scl,cols*scl, scl);
  image(topRoad, 0, 6*scl, cols*scl, scl);
  image(midleRoad, 0, 7*scl, cols*scl, scl);
  image(midleRoad, 0, 8*scl, cols*scl, scl);
  image(midleRoad, 0, 9*scl, cols*scl, scl);
  image(bottomRoad, 0, 10*scl, cols*scl, scl);
  image(sideWalk, 0, 11*scl, cols*scl, scl);

  // Renderización barra de tiempo
  let elapsedTime = millis() - startTime;
  let timeFraction = elapsedTime / totalTime;
  timeFraction = min(timeFraction, 1);

  let barWidth = 100 * (1 - timeFraction);

  noFill();
  stroke(0);
  rect(540, 555, 100, 15);
  
  fill(255, 0, 0);
  noStroke();
  rect(540, 555, barWidth, 15);

  // Acualización de velocidad
  // Carros
  for (let i = 0; i < carros1.length; i++) {
    carros1[i].updateSpeed(carsSpeeds[level][0]);
    carros3[i].updateSpeed(carsSpeeds[level][2]);
  }
  
  for (let i = 0; i < carros2.length; i++) {
    carros2[i].updateSpeed(carsSpeeds[level][1]);
  }

  // Troncos
  for (let i = 0; i < troncos1.length; i++) {
    troncos1[i].updateSpeed(logsSpeeds[level][0]);
    troncos3[i].updateSpeed(logsSpeeds[level][2]);
  }

  for (let i = 0; i < troncos2.length; i++) {
    troncos2[i].updateSpeed(logsSpeeds[level][1]);
  }

  
  // Renderización carros
  let allCars = [...carros1, ...carros2, ...carros3];

  if (level == 3) {
    allCars = [...allCars, ...carros4];
  }
  if (level == 4) {
    allCars = [...allCars, ...carros4, ...carros5];
  }

  for (let i = 0; i < allCars.length; i++) {
    allCars[i].render();
  }

  // Renderización troncos
  let allLogs = [...troncos1, ...troncos2, ...troncos3];
  for (let i = 0; i < allLogs.length; i++) {
    allLogs[i].render();
  }
  
  // Renderización sapo
  sapo.render();
  sapo.update();

  // Validación de tiempo
  if (barWidth == 0) {
    if (vidas > 1) {
      die_time.play();
    }
    sapo.sapoMuere();
  }

  if (metasAlcanzadas()) {
    levelUp();
  }

  // Valdación de vidas
  updateHearts();
  if (vidas == 0) {
    gameOverFunc();
  } else if (level > maxLevel) {
    youWinFunc();
  }
  
  // Score
  textAlign(LEFT);
  textSize(16);
  fill(0);
  text(`Level: ${level}`, 20, 590);
  text(`Score: ${score}`, 20 + textWidth(`Level: ${level}`) + 20, 590);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (sapo.position.y > 0 && !pause && vidas > 0 && sapo.move) {
      sapo.position.add(0, -1);
      imgsapo = loadImage("media/images/sapopixel.png");
      jump.play();
      
    }
  } else if (keyCode === DOWN_ARROW) {
    if (sapo.position.y < rows - 1 && !pause && vidas > 0 && sapo.move) {
      sapo.position.add(0, 1);
      imgsapo = imgsapoA
      jump.play();
    }
  } else if (keyCode === LEFT_ARROW) {
    if (sapo.position.x > 0 && !pause && vidas > 0 && sapo.move) {
      sapo.position.add(-1, 0);
      imgsapo = imgsapoI
      jump.play();
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (sapo.position.x < cols - 1 && !pause && vidas > 0 && sapo.move) {
      sapo.position.add(1, 0);
      imgsapo = imgsapoD
      jump.play();
    }
  }
  else if (keyCode === ENTER) {
    if (inicio) {
      reinicio();
      loop();
    }
  }

  else if (keyCode === 32) {
    if (inicio) {
      togglePause();
    }
  }
}
