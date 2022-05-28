import { Gunman } from "./gunman.js";
import { rnd } from "./rnd.js";
import { gunmanContainer, counterRP } from "./elements.js";
import { resourcePoints, waveProbability, maxGunmenPerWave } from "./defaultConstants.js";

export class Game {
  start() {
    this.gunmen = [];
    this.resourcePoints = resourcePoints;
    this.gunmanContainer = gunmanContainer;
    this.counterRP = counterRP;

    this.generateGunmen(maxGunmenPerWave);

    this.intervalId = setInterval(() => {
      if (rnd(0, 100) < waveProbability) {
        this.generateGunmen(rnd(1, maxGunmenPerWave));
      }
    }, 1000);

    this.running = true
  }

  generateGunmen(count) {
    for (let i = 0; i < count; i++) {
      const gunman = new Gunman();

      this.gunmen.push(gunman);

      gunman.render();
      gunman.addEventListener('plunder', ({detail}) => this.updateRP(-detail));
      gunman.addEventListener('death', () => this.updateRP(3));
    }
  }

  updateRP(change) {
    this.resourcePoints += change;
    this.counterRP.innerHTML = `RP: ${this.resourcePoints}`;

    this.over();
  }

  over() {
    if (this.running && this.resourcePoints <= 0) {
      this.running = false
      clearInterval(this.intervalId);
      alert('Game over');
      location.reload();
    }
  }
}
