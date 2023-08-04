class BaseEnemy extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.speed = 3;
        this.isAlive = true;
        this.healthPoints = 1;
        this.score = 100;
        this.color = 'red';
    }

    draw(ctx) {
        super.draw(ctx);
        this.death();
    }

    move(canvasWidth) {
        this.x = this.x + this.speed;
        this.outOfGame(canvasWidth);
    }

    outOfGame(canvasWidth) {
        if (this.x >= canvasWidth) {
            this.isAlive = false;
        }
    }

    death() {
        if (this.healthPoints <= 0) {
            this.isAlive = false;
        }
    }
}