import { names } from "./names.js";
import { rnd, rndItem } from "./rnd.js";
import { gunmanContainer } from "./elements.js";
import { Shot } from "./shot.js";
import { BloodMess } from "./mess.js";

import {
  gunmanSize,
  minAge,
  maxAge,
  minWeapon,
  maxWeapon,
  gunmanSpeed,
} from "./defaultConstants.js";

export class Gunman extends EventTarget {
  constructor(
    name = rndItem(names),
    age = rnd(minAge, maxAge),
    weapon = rnd(minWeapon, maxWeapon),
  ) {
    super();
    this.name = name;
    this.age = age;
    this.weapon = weapon;
  }

  attack() {
    console.log(`${this.name} attacks with his ${this.weapon}`);
  }

  render() {
    const gunmanPic = document.createElement("img");
    const topPosition = rnd(gunmanSize, innerHeight - gunmanSize - gunmanSize);

    this.el = gunmanPic;
    this.run();

    gunmanPic.classList.add("gunman");
    gunmanPic.style.height = `${gunmanSize}px`;
    gunmanPic.style.top = `${topPosition}px`;
    gunmanPic.style.transitionDuration = `${2000 / gunmanSpeed}s`;
    gunmanPic.setAttribute('draggable', 'false');

    gunmanContainer.appendChild(gunmanPic);

    gunmanPic.onclick = ({ x, y }) => {
      this.hit(x, y)
    };

    gunmanPic.ontransitionend = () => { this.plunder() };
  }

  run() {
    let frame = 0

    setInterval(() => {
      frame = (frame + 1) % 8;
      this.el.src = `./img/${frame}.png`;
    }, 10_000 / gunmanSpeed);

    setTimeout(() => {
      this.el.style.left = `${innerWidth - gunmanSize}px`;
    }, 100);
  }

  plunder() {
    this.dispatchEvent(new CustomEvent("plunder", { detail: this.weapon }));
    this.remove();
  }

  hit(x, y) {
    if (rnd(1, 100) < 30) this.die();
    else new Shot(x, y)
  }

  die() {
    this.dispatchEvent(new CustomEvent("death"));

    const {left, bottom} = this.el.getBoundingClientRect();
    new BloodMess(left + 5, bottom - 5);

    this.remove();
  }

  remove() {
    this.el.remove();
  }
}
