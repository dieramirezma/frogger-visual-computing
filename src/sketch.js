const scl = 50;
const metas = [1, 3, 5, 7, 9, 11];
let meta = [true, true, true, true, true, true];
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
let totalTime = 10000;

let level = 1;
let score = 0;


function setup() {
  
  createCanvas(650, 600);
  textFont(font);
  // frameRate(5);
  
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
  musica.play();
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
    console.log("sapomuerto")
    reinicio();
    noLoop();
  }
  
  // Textos de nivel y score
  let messageLost = vidas !== 0 ? `` : "GAME OVER";
  const x = width / 2 - textWidth(messageLost);
  const y = height / 2;

  textSize(32);
  fill(255);
  text(messageLost, x, y);

  textSize(16);
  fill(0);
  text(`Level: ${level}`, 20, 590);
  text(`Score: ${score}`, 20 + textWidth(`Level: ${level}`) + 20, 590);
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

class Sapo {
  constructor() {
    this.position = createVector(floor(cols / 2), rows - 1);
  }

  render() {
    imageMode(CORNER);
    image(imgsapo, this.position.x * scl, this.position.y * scl, scl, scl);
  }

  sapoganado() {
    for (let i = 0; i < metas.length; i++) { // metas es el arreglo con las posiciones en x donde debe llegar el sapo
      rect(scl * metas[i], scl, scl, scl)
      // si el sapo llega a esas posiciones (se aproxima redondeando para que no sea necesaria demasiada precisión)
      if ((ceil(this.position.x) == metas[i] && this.position.y == 1) || (floor(this.position.x) == metas[i] && this.position.y == 1)) {
        if(meta[i] == false){//rectifica que la meta donde se este entrando no este usada
          meta[i] = true; // Se cambia en la posición del arreglo meta por true para saber que por ahí ya pasó y se devuelve al sapo al inicio
          this.position.x = floor(cols / 2);
          this.position.y = rows - 1;
        }
        else{
          sapo.position.add(0, 1);
        }
      }
      if (meta[i] === true) { // Se pone la imagen estática de que llegó a las metas que haya conseguido
        imageMode(CORNER);
        image(imgsapoganado, scl * (metas[i]), scl, scl, scl);
      }
    }
  }
}

function TroncosyCarros(inicio, velocidad, position, imagen, cols, scl) { // Renderiza los troncos y carros
  imageMode(CORNER);

  let x = position.x * scl;
  let width = (imagen == "imgtronco") ? 3 * scl : scl;
  let right = x + width;

  if (imagen == "imgtronco") { // Poner la imagen correspondiente donde diga la posición del tronco o carro
    eval("image(" + imagen + ", position.x*scl, position.y*scl, 3*scl, scl);");
  } else {
    eval("image(" + imagen + ", position.x*scl, position.y*scl, scl, scl);");
  }

  if (inicio == 4 || inicio == 9) { // Si el tronco o el carro es el de la hilera del medio, que vaya hacia el lado contrario a los otros 2 (restando la velocidad)
    if (right > -1) {
      position.x -= velocidad;
    } else { // Si ya se pasan del canvas (posición -1) que se devuelvan a donde empezaron dependiendo de si va de izq a der o der a izq
      position.x = cols;
    }
  } else {
    if (position.x < cols) {
      position.x += velocidad;
    } else {
      position.x = -3;
    }
  }
}

class Sapo {
  constructor() {
    this.position = createVector(floor(cols / 2), rows - 1);
  }

  update() {
    this.sapoganado();
    if (this.position.y < rows / 2 - 1) {
      if (!this.colisionTronco()) {
        this.sapoMuere();
        splash.play();
      }
    } else if (this.colisionCarro()) {
      this.sapoMuere();
    }
  }
  
  colisionCarro() {
    let allCars = [...carros1, ...carros2, ...carros3];
    for (let i = 0; i < allCars.length; i++) {
      if ((this.position.x <= ceil(allCars[i].position.x) + 0.5) && (this.position.x >= floor(allCars[i].position.x) - 0.5) && (this.position.y == allCars[i].position.y)) {
        return true;
      }
    }
    return false;
  }
  
  colisionTronco() { 
    let onLog = false;
    let allLogs = [...troncos1, ...troncos2, ...troncos3];
    for (let i = 0; i <  allLogs.length; i++) {
      if ((this.position.x <= ceil(allLogs[i].position.x) + 2.5) && (this.position.x >= floor(allLogs[i].position.x) - 0.5) && (this.position.y == allLogs[i].position.y)) {
        if ((0 < this.sapo.position.x) && (this.sapo.position.x < cols - 1)) {
          onLog = true;
          if (i > 2 && i < 5) {
            this.position.x -= allLogs[i].velocidad;
          } else {
            this.position.x += allLogs[i].velocidad;
          }
        }  
      } 
    }
    return onLog;
  }
  
  sapoMuere() {
    updateVidas();
    this.position.x = floor(cols / 2);
    this.position.y = rows - 1;
  }
  
  sapoganado() {
    for (let i = 0; i < metas.length; i++) { // metas es el arreglo con las posiciones en x donde debe llegar el sapo
      fill(255);
      rect(scl * metas[i], scl, scl, scl)
      // si el sapo llega a esas posiciones (se aproxima redondeando para que no sea necesaria demasiada precisión)
      if ((ceil(this.position.x) == metas[i] && this.position.y == 1) || (floor(this.position.x) == metas[i] && this.position.y == 1)) {
        meta[i] = true; // Se cambia en la posición del arreglo meta por true para saber que por ahí ya pasó y se devuelve al sapo al inicio
        this.position.x = floor(cols / 2);
        this.position.y = rows - 1;
        score += 100;
        startTime = millis();
      }
      if (meta[i] === true) { // Se pone la imagen estática de que llegó a las metas que haya conseguido
        imageMode(CORNER);
        image(imgsapoganado, scl * (metas[i]), scl, scl, scl);
      }
    }
  }

  render() {
    imageMode(CORNER);
    image(imgsapo, this.position.x * scl, this.position.y * scl, scl, scl);
  }

}

class Carro {
  constructor(inicio, position = createVector(-2, rows - inicio), velocidad) {
    this.inicio = inicio;
    this.position = position;
    this.velocidad = velocidad;
    this.imagen = "imgcarro" + str(this.inicio / 2);
  }

  render() {
    TroncosyCarros(this.inicio, this.velocidad, this.position, this.imagen, cols, scl);
  }
}

class Tronco {
  constructor(inicio, position = createVector(-2, rows - inicio), velocidad = 0.02) {
    this.inicio = inicio;
    this.position = position;
    this.velocidad = velocidad;
    this.imagen = "imgtronco";
  }

  render() {
    TroncosyCarros(this.inicio, this.velocidad, this.position, this.imagen, cols, scl);
  }
}

function reinicio() {
  for (i in meta) {
    meta[i] = false;
  }
  vidas = 3;
  console.log(vidas);
  sapo.position.x = floor(cols / 2);
  sapo.position.y = rows - 1;
}