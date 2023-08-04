class Powerup extends BaseEnemy {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.speed = 2;
        this.healthPoints = 1;
        this.color = 'green';
        this.isPowerup = true;
    }

    draw(ctx) {
        super.draw(ctx);
        this.death();
    }

    move() {
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
            player.cooldown = 5;
        }
    }
}