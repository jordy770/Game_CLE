class StartScreen {

    private textfield: HTMLElement
    private game : Game
    
    constructor(g:Game) {

        this.game = g
        this.textfield = document.createElement("textfield")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.textfield)
        this.textfield.addEventListener("click", ()=> this.switchScreens())
    }

    public update() {
        this.textfield.innerHTML = "START THE GAME - dit is het startscreen"
    }

    private switchScreens(){
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen(this.game))
    }
}