const scl = 50;
let primero = false;
let segundo = false;
let tercero = false;
let cuarto = false;
let quinto = false;
let sexto = false;

function preload() {
  musica = loadSound("media/musica ambiente lofi.mp3")
}

function setup() {
  createCanvas(650, 600);

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
  carro1 = new Carro1();
  carro2 = new Carro2();
  carro3 = new Carro3();
  tronco = new Tronco();
  
  musica.play();
}

function draw() {
  background(0, 255, 0);

  imageMode(CORNER);
  image(imgrio, 0, 0, cols * scl, (rows * scl) / 2);
  image(imgcarretera, 0, (rows * scl) / 2, cols * scl, (rows * scl) / 2 - 1 * scl);
  
  carro1.render();
  carro2.render();
  carro3.render();
  tronco.render();
  sapo.render();
  
  if(sapo.position.x*scl == scl && sapo.position.y*scl == scl) {
    primero = true;
  } else if(sapo.position.x*scl == 3*scl && sapo.position.y*scl == scl) {
    segundo = true;
  } else if(sapo.position.x*scl == 5*scl && sapo.position.y*scl == scl) {
    tercero = true;
  } else if(sapo.position.x*scl == 7*scl && sapo.position.y*scl == scl) {
    cuarto = true;
  } else if(sapo.position.x*scl == 9*scl && sapo.position.y*scl == scl) {
    quinto = true;
  } else if(sapo.position.x*scl == 11*scl && sapo.position.y*scl == scl) {
    sexto = true;
  }
  
  if(primero == true) {
    imageMode(CORNER);
    image(imgsapoganado, scl, scl, scl, scl);
  } 
  if(segundo == true) {
    imageMode(CORNER);
    image(imgsapoganado, 3*scl, scl, scl, scl);
  } 
  if(tercero == true) {
    imageMode(CORNER);
    image(imgsapoganado, 5*scl, scl, scl, scl);
  } 
  if(cuarto == true) {
    imageMode(CORNER);
    image(imgsapoganado, 7*scl, scl, scl, scl);
  } 
  if(quinto == true) {
    imageMode(CORNER);
    image(imgsapoganado, 9*scl, scl, scl, scl);
  } 
  if(sexto == true) {
    imageMode(CORNER);
    image(imgsapoganado, 11*scl, scl, scl, scl);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    sapo.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    sapo.setDirection(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    sapo.setDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    sapo.setDirection(1, 0);
  }
}

class Sapo {
  constructor() {
    this.position = createVector(floor(cols / 2), rows - 1);
    this.direction = createVector(0, 0);
  }

  setDirection(x, y) {
    this.direction.x = x;
    this.direction.y = y;
    this.position.add(this.direction);
  }

  render() {
    imageMode(CORNER);
    image(imgsapo, this.position.x * scl, this.position.y * scl, scl, scl);
  }
}

class Carro1 {
  constructor() {
    this.position = createVector(cols*scl-scl,rows*scl-2*scl);
  }
  
  render() {
    imageMode(CORNER);
    image(imgcarro1, this.position.x, this.position.y, scl, scl);
  }
}

class Carro2 {
  constructor() {
    this.position = createVector(0,rows*scl-3*scl);
  }
  
  render() {
    imageMode(CORNER);
    image(imgcarro2, this.position.x, this.position.y, scl, scl);
  }
}

class Carro3 {
  constructor() {
    this.position = createVector(cols*scl-scl,rows*scl-4*scl);
  }
  
  render() {
    imageMode(CORNER);
    image(imgcarro3, this.position.x, this.position.y, scl, scl);
  }
}

class Tronco {
  constructor() {
    this.position = createVector(scl, 4*scl)
  }
  
  render() {
    imageMode(CORNER);
    image(imgtronco, this.position.x, this.position.y, 3*scl, scl);
  }
}