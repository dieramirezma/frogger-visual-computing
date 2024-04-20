const scl = 50;
let sapoparchao = false;
let ultimotronco = false;
const metas = [1, 3, 5, 7, 9, 11];
let meta = [false, false, false, false, false, false];
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

// Time
let startTime = 0;
let totalTime = 50000;

let level = 1;
let score = 0;

function preload() {
  musica = loadSound("media/musica ambiente lofi.mp3")
  font = loadFont("fonts/MP16REG.ttf")
  white_heart = loadImage("media/white_heart.png")
  red_heart = loadImage("media/red_heart.png")
}

function setup() {
  createCanvas(650, 600);
  textFont(font);
  // frameRate(5);
  
  // Se inicializa el tiempo
  startTime = millis();

  cols = width / scl;
  rows = height / scl;
  
  imgcarretera = loadImage("media/carretera.jpg");
  imgcarro1 = loadImage("media/carro1.jpeg");
  imgcarro2 = loadImage("media/carro2.jpeg");
  imgcarro3 = loadImage("media/carro3.jpg");
  imgrio = loadImage("media/rio magdalena.jpeg");
  imgsapoganado = loadImage("media/sapo ganado.jpg");
  imgsapo = loadImage("media/sapo.png");
  imgtronco = loadImage("media/tronco.png");


  for (let i = 0; i < vidas; i++) {
    hearts.push(red_heart);
  }

  sapo = new Sapo();

  // Se crean los carros y troncos con sus respectivas velocidades y posiciones iniciales
  for (let i = 0; i < 4; i++) {
    if (i < 3) {
      carros2.push(new Carro(0.1, sapo, 4, createVector(9*i, rows - 4)));
    } 
    carros1.push(new Carro(0.02, sapo, 2, createVector(4*i, rows - 2)));
    carros3.push(new Carro(0.04, sapo, 6, createVector(3*i, rows - 6)));
  }

  // Se crean los troncos con sus respectivas velocidades y posiciones iniciales
  for (let i = 0; i < 3; i++) {
    if (i < 2) {
      troncos2.push(new Tronco(sapo, 9, createVector(9 * i, rows - 9)));
    }
    troncos1.push(new Tronco(sapo, 8, createVector(5*i, rows - 8), 0.05));
    troncos3.push(new Tronco(sapo, 10, createVector(5*i, rows - 10)));
  }
  musica.play();
}

function draw() {
  background(0, 255, 0);

  imageMode(CORNER);
  image(imgrio, 0, 0, cols * scl, ((rows * scl) / 2) - scl);
  image(imgcarretera, 0, (rows * scl) / 2, cols * scl, (rows * scl) / 2 - 1 * scl);

  // Se renderiza la barra de tiempo
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
  
  // Se renderizan los carros
  for (let i = 0; i < 4; i++) {
    if (i < 3) {
      carros2[i].render();
    }
    carros1[i].render();
    carros3[i].render();
  }
 
  sapo.render();


  // Se renderizan los troncos
  for (let i = 0; i < troncos1.length; i++) {
    troncos1[i].render();
    troncos1[i].sapoagua();
    troncos3[i].render();
    if (i < 2) {
      troncos2[i].render();
      troncos2[i].sapoagua();
    }
  }

  sapo.sapoganado();
  // Para troncos3 
  ultimotronco = true;
  troncos3[0].sapoagua();
  troncos3[1].sapoagua();
  troncos3[2].sapoagua();
  sapoparchao = false;
  ultimotronco = false;

  if (barWidth == 0) {
    updateVidas();
    startTime = millis();
  }

  updateHearts();
  if (vidas == 0) {
    noLoop();
    musica.stop();  
  }
  
  // Text messages
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
    // Se renderizan los corazones
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

  render() {
    imageMode(CORNER);
    image(imgsapo, this.position.x * scl, this.position.y * scl, scl, scl);
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
}

class Carro {
  constructor(velocidad, sapo, inicio, position = createVector(-2, rows - inicio)) {
    this.sapo = sapo;
    this.inicio = inicio;
    this.position = position;
    this.velocidad = velocidad;
    this.imagen = "imgcarro" + str(this.inicio / 2);
  }

  choque() { // si el sapo está en el mismo cuadrado del carro se devuelve al inicio y quita una vida (se redondea la posicion x del sapo por arriba y por abajo para ver si es igual)
    if ((this.sapo.position.x == ceil(this.position.x) || this.sapo.position.x == floor(this.position.x)) && this.sapo.position.y == this.position.y) {
      this.sapo.position.x = floor(cols / 2);
      this.sapo.position.y = rows - 1;
      updateVidas();
      console.log(vidas);
    }
  }

  render() {
    TroncosyCarros(this.inicio, this.velocidad, this.position, this.imagen, cols, scl);
    this.choque();
  }
}

class Tronco {
  constructor(sapo, inicio, position = createVector(-2, rows - inicio), velocidad = 0.02) {
    this.sapo = sapo;
    this.inicio = inicio;
    this.position = position;
    this.velocidad = velocidad;
    this.imagen = "imgtronco";
  }

  sapoagua() { // Si la posición x del sapo se encuentra aproximadamente dentro del tronco, se sincroniza su velocidad con la del tronco para que siga estando ahí
    if ((this.sapo.position.x <= ceil(this.position.x) + 2.5) && (this.sapo.position.x >= floor(this.position.x) - 0.5) && (this.sapo.position.y == this.position.y)) {
      if (this.inicio == 9) {
        this.sapo.position.x -= this.velocidad;
      } else {
        this.sapo.position.x += this.velocidad;
      }
      sapoparchao = true; // Para saber que el sapo está encima de un tronco
    } else if (this.sapo.position.y < rows / 2 - 1) { // Si el sapo no está encima de un tronco pero está en el agua, evalua con el siguiente
      if (sapoparchao) {
        return;
      } else if (ultimotronco) { // Si llega al último tronco y no se ve que esté sobre este tronco, se supone que está en el agua y se le devuelve al inicio sin una vida
        updateVidas();
        this.sapo.position.x = floor(cols / 2);
        this.sapo.position.y = rows - 1;
        console.log(vidas)
      } else {
        return;
      }
    }
  }

  render() {
    TroncosyCarros(this.inicio, this.velocidad, this.position, this.imagen, cols, scl);
  }
}