export class BloodMess {
  constructor(x, y) {
    const div = document.createElement('div')

    div.classList.add('blood-mess')
    div.style.left = `${x}px`
    div.style.top = `${y}px`

    document.body.appendChild(div)

    div.onanimationend = () => { div.remove() }
  }
}
