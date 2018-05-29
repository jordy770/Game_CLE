class Game {

    
<<<<<<< HEAD
    private currentscreen : StartScreen | GameScreen | GameOver
  
   

    constructor() {
        this.currentscreen = new StartScreen(this)
=======
    private car:Car
    private bomb:Bomb
    private platform:Platform
    private foreground:HTMLElement
   

    constructor() {
        this.bomb = new Bomb()
        this.platform = new Platform()
        this.car = new Car(this)
        
        this.foreground = document.getElementsByTagName("foreground")[0] as HTMLElement
        
>>>>>>> parent of bfc7c23... Name update**
        this.gameLoop()
    }

   
    
    private gameLoop():void{
<<<<<<< HEAD
        this.currentscreen.update()
=======
        
        this.car.update()
        this.bomb.update() // doet op zich niks
        this.platform.update()

        if (this.checkCollision(this.car.getRectangle(), this.platform.getRectangle())) {
           this.car.hitPlat()
        } else {
            this.car.gravity = 10
        }
        if (this.checkCollision(this.car.getRectangle(), this.bomb.getRectangle())) {
            console.log("car hits the bomb")
        }

>>>>>>> parent of bfc7c23... Name update**
        requestAnimationFrame(() => this.gameLoop())
    }

    public emptyScreen() {
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.innerHTML = ""
    }

    public showScreen(screen : StartScreen | GameScreen | GameOver ) {
        this.currentscreen = screen
    }
    
} 

window.addEventListener("load", () => new Game())