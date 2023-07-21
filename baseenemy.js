class BaseEnemy extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.speed = 3;
    }

    draw(ctx) {
        super.draw(ctx);
    }

    move() {
        this.y = this.y + this.speed;
    }
}