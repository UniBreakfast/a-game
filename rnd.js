export function rndItem(arr) {
  return arr[rnd(0, arr.length - 1)];
}

export function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
