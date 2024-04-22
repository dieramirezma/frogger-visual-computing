class Carro  extends ObjetoMovible{
  constructor(inicio, position = createVector(-2, rows - inicio), velocidad) {
    super(inicio, position, velocidad, "imgcarro" + str(inicio / 2));
  }
}