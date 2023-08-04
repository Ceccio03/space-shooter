class Player extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.speed = 10;
        this.controller = {};
        this.projectiles = [];
        this.cooldown = 15;
        this.healthPoints = 3;
        this.score = 0;
        this.isPlayer = true;
        this.color = 'green';
        this.resetCoolDown = 15;
    }

    draw(ctx) {
        super.draw(ctx);

        this.cooldown--;
        this.projectiles = this.projectiles.filter((p) => p.isAlive);

        for (let i = 0; i < this.projectiles.length; i++) {
            const proj = this.projectiles[i];
            
            proj.draw(ctx);
            proj.move();
        }
        console.log(this.healthPoints);
    }

    control(canvasWidth, canvasHeight) {
        document.onkeydown = (keyevent => {
            this.controller[keyevent.key] = true;
        });

        document.onkeyup = (keyevent => {
            this.controller[keyevent.key] = false;
        });
        
        if (this.controller["ArrowLeft"]) {
            this.x = this.x > 0 ? this.x - this.speed : 0;
        }
        if (this.controller["ArrowRight"]) {
            this.x = (this.x + this.width) < canvasWidth ? this.x + this.speed : canvasWidth - this.width;
        }
        if (this.controller["ArrowUp"]) {
            this.y = this.y > 0 ? this.y - this.speed : 0;
        }
        if (this.controller["ArrowDown"]) {
            this.y = (this.y + this.height) < canvasHeight ? this.y + this.speed : canvasHeight - this.height;
        }
        if (this.controller[" "]) {
            this.baseAttack();
        }
    }

    baseAttack() {
        console.log(this.cooldown);
        console.log(this.resetCoolDown);
        if (this.cooldown <= 0) {
            let proj = new Projectile(this.x, this.y + this.height / 2 - 2.5, 20, 5);

            this.projectiles.push(proj);
            this.cooldown = this.resetCoolDown;
        }
    }

    death() {
        if (this.healthPoints <= 0) {
            
        }
    }
}