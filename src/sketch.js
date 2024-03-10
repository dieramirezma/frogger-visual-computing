const scl = 30;


function setup() {
  createCanvas(650, 600);
  cols = width / scl;
  rows = height / scl;

  imgsapo = loadImage("media/sapo.png");

  sapo = new Sapo();
}

function draw() {
  background(200);
  sapo.render();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    sapo.position.add(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    sapo.position.add(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    sapo.position.add(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    sapo.position.add(1, 0);
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