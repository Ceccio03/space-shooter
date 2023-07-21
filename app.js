let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let animate;
const player = new Player((canvasWidth/2), (canvasHeight/2), 50, 50);

function animation() {
    animate = requestAnimationFrame(animation);

    if (player) {
        player.draw(ctx);
    }
}
animation();