class Player extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.speed = 10;
        this.controller = {};
        this.projectiles = [];
    }

    draw(ctx) {
        super.draw(ctx);
    }

    
}