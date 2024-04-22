const scl = 50;
const metas = [1, 3, 5, 7, 9, 11];
let meta = [false, false, false, false, false, false];
let pause = false
let font;

// Declaración de arreglos para cada fila de carros y troncos
let carros1 = [];
let carros2 = [];
let carros3 = [];
let troncos1 = [];
let troncos2 = [];
let troncos3 = [];

// Vidas
let vidas = 3;
let hearts = [];

// Tiempo
let startTime = 0;
let totalTime = 50000;

let level = 1;
let score = 0;

function setup() {
  createCanvas(650, 600);
  
  // Inicialización tiempo
  startTime = millis();
  
  cols = width / scl;
  
  rows = height / scl;
  jump = loadSound("media/jump.mp3")
  splash = loadSound("media/splash.mp3")
  font = loadFont("fonts/MP16REG.ttf")
  white_heart = loadImage("media/white_heart.png")
  red_heart = loadImage("media/red_heart.png")
  imgcarretera = loadImage("media/carretera.jpg");
  imgcarro1 = loadImage("media/carro5.png");
  imgcarro2 = loadImage("media/carro1.png");
  imgcarro3 = loadImage("media/carro2.png");
  imgrio = loadImage("media/rio magdalena.jpeg");
  imgsapoganado = loadImage("media/sapo ganado.jpg");
  imgsapo = loadImage("media/sapopixel.png");
  imgtronco = loadImage("media/tronco.png");
  
  textFont(font);

  // Inicialización corazones
  for (let i = 0; i < vidas; i++) {
    hearts.push(red_heart);
  }

  sapo = new Sapo();

  // Instanciación carros
  for (let i = 0; i < 4; i++) {
    carros1.push(new Carro(2, createVector(4*i, rows - 2), 0.02));
    if (i < 3) {
      carros2.push(new Carro(4, createVector(9*i, rows - 4), 0.1));
    } 
    carros3.push(new Carro(6, createVector(3*i, rows - 6), 0.04));
  }

  // Instanciación troncos
  for (let i = 0; i < 3; i++) {
    if (i < 2) {
      troncos2.push(new Tronco(9, createVector(9 * i, rows - 9)));
    }
    troncos1.push(new Tronco(8, createVector(5*i, rows - 8), 0.05));
    troncos3.push(new Tronco(10, createVector(5*i, rows - 10)));
  }
}

function draw() {
  background(200);

  imageMode(CORNER);
  fill(0,0,255);
  rect(0, 0, cols * scl, ((rows * scl) / 2) - scl)
  //image(imgrio, 0, 0, cols * scl, ((rows * scl) / 2) - scl);
  //image(imgcarretera, 0, (rows * scl) / 2, cols * scl, (rows * scl) / 2 - 1 * scl);

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
  
  // Renderización carros
  let allCars = [...carros1, ...carros2, ...carros3];
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
    updateVidas();
  }

  // Valdación de vidas
  updateHearts();
  if (vidas == 0) {
    textSize(50);
    textAlign(CENTER);
    fill(0);
    text("GAME OVER", width / 2, height / 2 -10);

    console.log("sapomuerto")
    reinicio();
    noLoop();
  }
  
  if (metasAlcanzadas()) {
    levelUp();
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
    if (sapo.position.y > 0) {
      sapo.position.add(0, -1);
      imgsapo = loadImage("media/sapopixel.png");
      jump.play();
      
    }
  } else if (keyCode === DOWN_ARROW) {
    if (sapo.position.y < rows - 1) {
      sapo.position.add(0, 1);
      imgsapo = loadImage("media/sapopixelA.png");
      jump.play();
    }
  } else if (keyCode === LEFT_ARROW) {
    if (sapo.position.x > 0) {
      sapo.position.add(-1, 0);
      imgsapo = loadImage("media/sapopixelI.png");
      jump.play();
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (sapo.position.x < cols - 1) {
      sapo.position.add(1, 0);
      imgsapo = loadImage("media/sapopixelD.png");
      jump.play();
    }
  }
  else if (keyCode === ENTER) {
    reinicio();
    loop();
  }

  else if (keyCode === 32) {
    if (pause) {
      pause = false;
      loop();
    }
    else{
      pause = true;
      noLoop();
    }
  }
}
