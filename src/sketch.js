const scl = 50;
let vidas = 3;
let sapoparchao = false;
let ultimotronco = false;
let primero = false;
let segundo = false;
let tercero = false;
let cuarto = false;
let quinto = false;
let sexto = false;
const metas = [1, 3, 5, 7, 9, 11];
let meta = [false, false, false, false, false, false];

function preload() {
  musica = loadSound("media/musica ambiente lofi.mp3")
}

function setup() {
  createCanvas(650, 600);

  // frameRate(5);

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

  sapo = new Sapo();
  carro1 = new Carro(0.02, sapo, 2);
  carro2 = new Carro(0.05, sapo, 4);
  carro3 = new Carro(0.04, sapo, 6);
  tronco1 = new Tronco(sapo, 8);
  tronco2 = new Tronco(sapo, 9);
  tronco3 = new Tronco(sapo, 10);

  musica.play();
}

function draw() {
  background(0, 255, 0);

  imageMode(CORNER);
  image(imgrio, 0, 0, cols * scl, ((rows * scl) / 2) - scl);
  image(imgcarretera, 0, (rows * scl) / 2, cols * scl, (rows * scl) / 2 - 1 * scl);

  carro1.render();
  carro2.render();
  carro3.render();
  tronco1.render();
  tronco2.render();
  tronco3.render();
  sapo.render();

  sapo.sapoganado();
  tronco1.sapoagua();
  tronco2.sapoagua();
  ultimotronco = true;
  tronco3.sapoagua();
  sapoparchao = false;
  ultimotronco = false;

  if (vidas == 0) {
    noLoop();
    musica.stop();
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
  if (imagen == "imgtronco") { // Poner la imagen correspondiente donde diga la posición del tronco o carro
    eval("image(" + imagen + ", position.x*scl, position.y*scl, 3*scl, scl);");
  } else {
    eval("image(" + imagen + ", position.x*scl, position.y*scl, scl, scl);");
  }
  if (inicio == 4 || inicio == 9) { // Si el tronco o el carro es el de la hilera del medio, que vaya hacia el lado contrario a los otros 2 (restando la velocidad)
    if (position.x > -1) {
      position.x -= velocidad;
    } else { // Si ya se pasan del canvas (posición -1) que se devuelvan a donde empezaron dependiendo de si va de izq a der o der a izq
      position.x = cols;
    }
  } else {
    if (position.x < cols) {
      position.x += velocidad;
    } else {
      position.x = -1;
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
        meta[i] = true; // Se cambia en la posición del arreglo meta por true para saber que por ahí ya pasó y se devuelve al sapo al inicio
        this.position.x = floor(cols / 2);
        this.position.y = rows - 1;
      }
      if (meta[i] === true) { // Se pone la imagen estática de que llegó a las metas que haya conseguido
        imageMode(CORNER);
        image(imgsapoganado, scl * (metas[i]), scl, scl, scl);
      }
    }
  }
}

class Carro {
  constructor(velocidad, sapo, inicio) {
    this.sapo = sapo;
    this.inicio = inicio;
    this.position = createVector(-2, rows - inicio);
    this.velocidad = velocidad;
    this.imagen = "imgcarro" + str(this.inicio / 2);
  }

  choque() { // si el sapo está en el mismo cuadrado del carro se devuelve al inicio y quita una vida (se redondea la posicion x del sapo por arriba y por abajo para ver si es igual)
    if ((this.sapo.position.x == ceil(this.position.x) || this.sapo.position.x == floor(this.position.x)) && this.sapo.position.y == this.position.y) {
      this.sapo.position.x = floor(cols / 2);
      this.sapo.position.y = rows - 1;
      vidas--;
      console.log(vidas);
    }
  }

  render() {
    TroncosyCarros(this.inicio, this.velocidad, this.position, this.imagen, cols, scl);
    this.choque();
  }
}

class Tronco {
  constructor(sapo, inicio) {
    this.sapo = sapo;
    this.inicio = inicio;
    this.position = createVector(-2, rows - inicio);
    this.velocidad = 0.02;
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
        vidas--;
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