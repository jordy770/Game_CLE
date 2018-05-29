class GameScreen{

    private player:Player
    private bomb:Bomb
    private platform:Platform
    private foreground:HTMLElement
    private game:Game
    private hitByBomb:number = 0
    

    constructor(g:Game){
        this.game = g
        this.bomb = new Bomb()
        this.platform = new Platform()
        this.player = new Player(this)
    
        this.foreground = document.getElementsByTagName("foreground")[0] as HTMLElement
    }

    public scrollLevel(pos:number){
        this.foreground.style.transform = `translateX(${pos}px)`
    }   

    public update():void {

        this.player.update()
        this.bomb.update() // doet op zich niks
        this.platform.update()

        if (this.checkCollision(this.player.getRectangle(), this.platform.getRectangle())) {
           this.player.hitPlat()
        } else {
            this.player.gravity = 10
        }
        
        if (this.checkCollision(this.player.getRectangle(), this.bomb.getRectangle())) {
            this.hitByBomb++
            if(this.hitByBomb > 0){
                this.game.emptyScreen()
                this.game.showScreen(new GameOver())
            }
        }
    }
    
    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}

