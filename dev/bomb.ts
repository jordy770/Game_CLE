class Bomb {
    
    private element: HTMLElement
    private x:number
    private y:number
        
    constructor() {
        this.element = document.createElement("bomb")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element)
        
        this.x = 4000 - this.getRectangle().width -1000
        this.y = window.innerHeight - this.getRectangle().height - 100
    }

    public update():void {
        // als de bom zelf beweegt moet je dat hier updaten

        // tekenen
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

}