class Carro  extends ObjetoMovible{
  constructor(inicio, position = createVector(-2, rows - inicio), velocidad) {
    super(inicio, position, velocidad, "imgcarro" + str(Math.floor(Math.random() * 5 + 1)));
  }

  setImage() {
    this.imagen = "imgcarro" + str(Math.floor(Math.random() * 5 + 1));
  }

  show(inicio, velocidad, position, imagen, cols, scl) {
    imageMode(CORNER);

    let x = position.x * scl;
    let width = scl;
    let right = x + width;

    eval("image(" + imagen + ", position.x*scl, position.y*scl, scl, scl);");

    if (inicio == 4) { 
        if (right > -1) {
          position.x -= velocidad;
        } else {
          this.setImage();
          position.x = cols;
        }
    } else {
        if (position.x < cols) {
          position.x += velocidad;
        } else {
          this.setImage();
          position.x = -3;
        }
    }
  }
}