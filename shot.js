export class Shot {
  constructor(x, y) {
    const div = document.createElement('div')

    div.classList.add('shot')
    div.style.left = `${x}px`
    div.style.top = `${y}px`

    document.body.appendChild(div)

    div.onanimationend = () => { div.remove() }
  }
}
