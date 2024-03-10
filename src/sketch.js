const scl = 30;


function setup() {
  createCanvas(600, 600);
  cols = width / scl;
  rows = height / scl;

  imgsapo = loadImage("media/sapo.png");

  sapo = new Sapo();
  car1 = new Car(0.02, sapo, 3);
  car2 = new Car(0.05, sapo, 5);
  car3 = new Car(0.04, sapo, 7);
}

function draw() {
  background(200);
  sapo.render();
  car1.render();
  car2.render();
  car3.render();
}

function keyPressed() {
  if (keyCode === UP_ARROW){
    if (sapo.position.y > 0){
      sapo.position.add(0, -1);
    }
  } else if (keyCode === DOWN_ARROW) {
    if (sapo.position.y < rows-1){
      sapo.position.add(0, 1);
    }
  } else if (keyCode === LEFT_ARROW) {
    if (sapo.position.x > 0){
      sapo.position.add(-1, 0);
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (sapo.position.x < cols-1){
      sapo.position.add(1, 0);
    }
  }
}

class Sapo {
  constructor() {
    this.position = createVector(floor(cols / 2), rows - 1);
  }

  render() {
    fill(0, 255, 0);
    rect(this.position.x * scl, this.position.y * scl, scl, scl);
  }
}


class Car {
  constructor(speed, sapo, inicio) {
    this.speed = speed;
    this.sapo = sapo;
    this.inicio = inicio
    this.position = createVector(1, rows - inicio);
  }

  render() {
    fill(255, 0, 0);
    rect(this.position.x * scl, this.position.y * scl, scl, scl);
    this.position.x += this.speed;
    if (sapo.position.x == ceil(this.position.x) && sapo.position.y == ceil(this.position.y)
    ||(sapo.position.x == floor(this.position.x) && sapo.position.y == floor(this.position.y))){
    console.log("perdiste gran puta")
    sapo.position.y = rows-1
    }
  }
}