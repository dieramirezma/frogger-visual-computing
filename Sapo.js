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
      carHit.play();
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
        onLog = true;
        if ((0 <= this.position.x) && (this.position.x < cols - 1)) {
          if (i > 2 && i < 6) {
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
        if (meta[i]) {
          this.position.y++;
        }
        else{
          meta[i] = true; // Se cambia en la posición del arreglo meta por true para saber que por ahí ya pasó y se devuelve al sapo al inicio
          frogWin.play();
          this.position.x = floor(cols / 2);
          this.position.y = rows - 1;
          score += 100;
          //startTime = millis();
        }
        
      }
      if (meta[i] === true) { // Se pone la imagen estática de que llegó a las metas que haya conseguido
        imageMode(CORNER);
        image(grass, scl * (metas[i]), scl, scl, scl);
        image(imgsapoganado, scl * (metas[i]), scl, scl, scl);
      }
      else{
        imageMode(CORNER);
        image(grass, scl * (metas[i]), scl, scl, scl);
      }
    }
  }

  render() {
    imageMode(CORNER);
    image(imgsapo, this.position.x * scl, this.position.y * scl, scl, scl);
  }
}