class Tronco extends ObjetoMovible{
  constructor(inicio, position = createVector(-2, rows - inicio), velocidad = 0.02) {
    super(inicio, position, velocidad, "imgtronco");
  }
}