class ObjetoMovible {
    constructor(inicio, position, velocidad, imagen) {
        this.inicio = inicio;
        this.position = position;
        this.velocidad = velocidad;
        this.imagen = imagen;
    }

    show(inicio, velocidad, position, imagen, cols, scl) {
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

    updateSpeed(velocidad) {
        this.velocidad = velocidad;
    }

    render() {
        this.show(this.inicio, this.velocidad, this.position, this.imagen, cols, scl);
    }
}