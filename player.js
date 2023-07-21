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

    control() {
        document.onkeydown = (keyevent => {
            this.controller[keyevent.key] = true;
        });

        document.onkeyup = (keyevent => {
            this.controller[keyevent.key] = false;
        });

        console.log(this.controller);
        
        for (const key in this.controller) {
            if (key.includes("Left") && this.controller[key]) {
                this.x = this.x - this.speed;
            }
            if (key.includes("Right") && this.controller[key]) {
                this.x = this.x + this.speed;
            }
            if (key.includes("Up") && this.controller[key]) {
                this.y = this.y - this.speed;
            }
            if (key.includes("Down") && this.controller[key]) {
                this.y = this.y + this.speed;
            }
        }

        // switch (keyevent.key) {
        //     case "ArrowLeft":
        //         this.x = this.x - this.speed;
        //         break;

        //     case "ArrowRight":
        //         this.x = this.x + this.speed;
        //         break;

        //     case "ArrowUp":
        //         this.y = this.y - this.speed;
        //         break;

        //     case "ArrowDown":
        //         this.y = this.y + this.speed;
        //         break;
            
        //     default:
        //         break;
        // }
    }
}