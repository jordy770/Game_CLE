"use strict";
var Bomb = (function () {
    function Bomb() {
        this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.x = 4000 - this.getRectangle().width - 1000;
        this.y = window.innerHeight - this.getRectangle().height - 100;
    }
    Bomb.prototype.update = function () {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Bomb.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    return Bomb;
}());
var Game = (function () {
    function Game() {
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.emptyScreen = function () {
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.innerHTML = "";
    };
    Game.prototype.showScreen = function (screen) {
        this.currentscreen = screen;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver() {
        this.textfield = document.createElement("textfield");
        document.body.appendChild(this.textfield);
    }
    GameOver.prototype.update = function () {
        this.textfield.innerHTML = "GAME OVER, MAN!";
    };
    return GameOver;
}());
var GameScreen = (function () {
    function GameScreen(g) {
        this.hitByBomb = 0;
        this.game = g;
        this.bomb = new Bomb();
        this.platform = new Platform();
        this.player = new Player(this);
        this.foreground = document.getElementsByTagName("foreground")[0];
    }
    GameScreen.prototype.scrollLevel = function (pos) {
        this.foreground.style.transform = "translateX(" + pos + "px)";
    };
    GameScreen.prototype.update = function () {
        this.player.update();
        this.bomb.update();
        this.platform.update();
        if (this.checkCollision(this.player.getRectangle(), this.platform.getRectangle())) {
            this.player.hitPlat();
        }
        else {
            this.player.gravity = 10;
        }
        if (this.checkCollision(this.player.getRectangle(), this.bomb.getRectangle())) {
            this.hitByBomb++;
            if (this.hitByBomb > 0) {
                this.game.emptyScreen();
                this.game.showScreen(new GameOver());
            }
        }
    };
    GameScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return GameScreen;
}());
var Platform = (function () {
    function Platform() {
        this.x = 800;
        this.y = 800;
        this.div = document.createElement("platform");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.div);
    }
    Platform.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Platform.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Platform;
}());
var Player = (function () {
    function Player(b) {
        var _this = this;
        this.levelposition = 0;
        this.y = window.innerHeight - 150;
        this.speedLeft = 0;
        this.speedRight = 0;
        this.speedUp = 0;
        this.gamescreen = b;
        this.element = document.createElement("player");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.gravity = 10;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10;
                break;
            case "ArrowRight":
                this.speedRight = 10;
                break;
            case "ArrowUp":
                this.speedUp = 50;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0;
                break;
            case "ArrowRight":
                this.speedRight = 0;
                break;
            case "ArrowUp":
                this.speedUp = 0;
                break;
        }
    };
    Player.prototype.hitPlat = function () {
        this.gravity = 0;
    };
    Player.prototype.update = function () {
        this.levelposition = this.levelposition + this.speedLeft - this.speedRight;
        this.gamescreen.scrollLevel(this.levelposition);
        var newY = this.y - this.speedUp + this.gravity;
        if (newY > 0 && newY + 150 < window.innerHeight)
            this.y = newY;
        this.element.style.transform = "translate(200px, " + this.y + "px)";
    };
    Player.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    return Player;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.textfield = document.createElement("textfield");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.textfield);
        this.textfield.addEventListener("click", function () { return _this.switchScreens(); });
    }
    StartScreen.prototype.update = function () {
        this.textfield.innerHTML = "START THE GAME - dit is het startscreen";
    };
    StartScreen.prototype.switchScreens = function () {
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen(this.game));
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map