class StartScreen {

    private textfield: HTMLElement
    private game : Game

    private addNumbers(a:number, b:number){
        console.log( a + b )
    }

    constructor(g:Game) {
        this.addNumbers(2,3)

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