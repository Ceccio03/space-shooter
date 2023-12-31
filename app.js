let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let animate;
const player = new Player((canvasWidth/2), (canvasHeight/2), 50, 50);
let allEnemies = [];
let enemyCooldown = 120;
let powerupCoolDown = 120;
let minibossCoolDown = 1200;
let playerProjectiles = player.projectiles;

const gameOver = document.getElementById('game-over');
const gameOverBtn = document.getElementById('game-over-btn');
// const hpText = document.getElementById('hp-text');
const hpBar = document.getElementById('hp-bar');
let hpWidth = 100 / player.healthPoints;

const scoreText = document.getElementById('score-text');
minibossProjectiles = [];

let state = "Play";

let background = new Image();
background.src = "./assets/space.png";
let background_y = 0;

gameOverBtn.addEventListener('click', () => {
    player.healthPoints = 3;
    player.projectiles = [];
    allEnemies = [];
    gameOver.style.display = "none";
    player.score = 0;
    player.x = canvasWidth / 2;
    player.y = canvasHeight / 2;
});

function animation() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    animate = requestAnimationFrame(animation);

    // canvasWidth = window.innerWidth;
    // canvasHeight = window.innerHeight;
    // canvas.width = canvasWidth;
    // canvas.height = canvasHeight;
    gameStates();
    if (state === "Play") {
        loopBackground();
        if (player) {
            player.draw(ctx);
            player.control(canvasWidth, canvasHeight);
            playerProjectiles = player.projectiles;
        }
    
        enemyCooldown--;
        if (enemyCooldown <= 0) {
            enemyFormationSpawn();
            enemyCooldown = 120;
        }
        powerupSpawn();
        minibossSpawn();
        minibossProjectiles = [];
        allEnemies = allEnemies.filter((e) => e.isAlive);
        for (let i = 0; i < allEnemies.length; i++) {
            const enemy = allEnemies[i];
            enemy.draw(ctx);
            enemy.move(canvasWidth);
            if (enemy.projectiles) {
                minibossProjectiles.push(...enemy.projectiles);
            }
        }
        enemyCollision();

        // hpText.innerText = "Vita: " + player.healthPoints;
        scoreText.innerText = "Score: " + player.score;
        hpBar.style.width = hpWidth * player.healthPoints + '%';
    } else if (state === "GameOver") {
        gameOver.style.display = "flex";
    }
}

function enemySpawn() {
    const randomY = Math.random() * (canvasHeight - 50);
    let enemy = new BaseEnemy(-50, randomY, 50, 50);

    allEnemies.push(enemy);
}

function enemyFormationSpawn() {
    const randomY = Math.random() * (canvasHeight - 50);
    let enemy = new BaseEnemy(-50, randomY, 50, 50);
    let enemy2 = new BaseEnemy(-200, randomY + 300, 50, 50);
    let enemy3 = new BaseEnemy(-200, randomY - 300, 50, 50);

    allEnemies.push(enemy, enemy2, enemy3);
}

function powerupSpawn() {
    powerupCoolDown--;

    if (powerupCoolDown <= 0) {
        const randomY = Math.random() * (canvasHeight - 50);
        let powerup = new Powerup(-50, randomY, 50, 50);

        allEnemies.push(powerup);
        powerupCoolDown = 120;
    }
}

function minibossSpawn() {
    minibossCoolDown--;

    if (minibossCoolDown <= 0) {
        let yPos = Math.round(Math.random() === 0 ? 0 - 128 : canvasHeight);
        let miniboss = new Miniboss(120, yPos, 84, 128);

        miniboss.score = 1000;
        miniboss.speed = yPos < 0.5 ? 2 : -2;
        allEnemies.push(miniboss);
        minibossCoolDown = 1200;
    }
}

function enemyCollision() {
    let playerAssets = [player, ...playerProjectiles];
    let enemyAssets = [...allEnemies, ...minibossProjectiles];

    for (let i = 0; i < playerAssets.length; i++) {
        const pA = playerAssets[i];
        
        for (let j = 0; j < enemyAssets.length; j++) {
            const enemy = enemyAssets[j];
            
            if (enemy.x < pA.x + pA.width &&
                enemy.x + enemy.width > pA.x &&
                enemy.y < pA.y + pA.height &&
                enemy.y + enemy.height > pA.y
                ) {
                enemy.healthPoints--;
                pA.healthPoints--;
                enemy.death();

                if (!enemy.isAlive && enemy.score && !pA.isPlayer) {
                    player.score += enemy.score;
                }

                if (!enemy.isAlive && enemy.isPowerup) {
                    player.resetCoolDown = 5;
                    setTimeout(300);
                }
            }
        }
    }
}

function gameStates() {
    switch (state) {
        case "Play":
            if (player.healthPoints <= 0) {
                state = "GameOver";
            }
            break;

        case "GameOver":
            if (player.healthPoints > 0) {
                state = "Play";
            }
            break;
            
        default:
            break;
    }
}

function loopBackground() {
    ctx.drawImage(background, 0, background_y, canvasWidth, canvasHeight);
    ctx.drawImage(background, 0, background_y - canvasHeight, canvasWidth, canvasHeight);
    background_y++;

    if (background_y >= canvasHeight) {
        background_y = 0;
    }
}
animation();