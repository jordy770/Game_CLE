class GameOver {
    private textfield: HTMLElement

    constructor() {
        this.textfield = document.createElement("textfield")
        foreground.appendChild(this.textfield)
    }
    public update() {
        this.textfield.innerHTML = "GAME OVER, MAN!"
    }
}