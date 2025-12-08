
const cvs = document.getElementById("gameCanvas");
const ctx = cvs.getContext("2d");

let frames = 0;
const DEGREE = Math.PI / 180;
let score = 0;

const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
};

//images
const bgImg = new Image(); bgImg.src = "assets/Flappy Bird/background-day.png";
const fgImg = new Image(); fgImg.src = "assets/Flappy Bird/base.png";
const birdImg0 = new Image(); birdImg0.src = "assets/Flappy Bird/yellowbird-upflap.png";
const birdImg1 = new Image(); birdImg1.src = "assets/Flappy Bird/yellowbird-midflap.png";
const birdImg2 = new Image(); birdImg2.src = "assets/Flappy Bird/yellowbird-downflap.png";
const pipeImg = new Image(); pipeImg.src = "assets/Flappy Bird/pipe-green.png";
const messageImg = new Image(); messageImg.src = "assets/UI/message.png";
const gameoverImg = new Image(); gameoverImg.src = "assets/UI/gameover.png";

//sounds
const SCORE_S = new Audio(); SCORE_S.src = "assets/Sound Efects/point.wav";
const FLAP_S = new Audio(); FLAP_S.src = "assets/Sound Efects/wing.wav";
const HIT_S = new Audio(); HIT_S.src = "assets/Sound Efects/hit.wav";
const SWOOSH_S = new Audio(); SWOOSH_S.src = "assets/Sound Efects/swoosh.wav";
const DIE_S = new Audio(); DIE_S.src = "assets/Sound Efects/die.wav";

function getHighScores() {
    const stored = localStorage.getItem('flappyHighScores');
    return stored ? JSON.parse(stored) : [0, 0, 0, 0, 0];
}

function saveScore(newScore) {
    let scores = getHighScores();
    scores.push(newScore);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 5);
    localStorage.setItem('flappyHighScores', JSON.stringify(scores));
}

//tło
const bg = {
    sX: 0, sY: 0, w: 288, h: 512, x: 0, y: 0,
    draw: function() {
        ctx.drawImage(bgImg, this.x, this.y, cvs.width, cvs.height);
    }
}

//ziemia
const fg = {
    h: 112, x:0, dx: 2,
    draw: function() {
        ctx.drawImage(fgImg, this.x, cvs.height - this.h, cvs.width, this.h);
        ctx.drawImage(fgImg, this.x + cvs.width, cvs.height - this.h, cvs.width, this.h);
    },
    update: function() {
        if (state.current == state.game) {
            this.x = (this.x - this.dx) % (cvs.width);
        }
    }
}

const bird = {
    animation: [birdImg0, birdImg1, birdImg2, birdImg1],
    x: 50, y: 150, w: 34, h: 24, radius: 12,
    frame: 0, speed: 0, gravity: 0.25, jump: 4.6, rotation: 0,

    draw: function() {
        let birdSprite = this.animation[this.frame];
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.rotation > 90 * DEGREE) this.rotation = 90 * DEGREE;
        ctx.rotate(this.rotation);
        ctx.drawImage(birdSprite, -this.w/2, -this.h/2, this.w, this.h);
        ctx.restore();
    },

    flap: function() {
        this.speed = -this.jump;
        this.rotation = -25 * DEGREE;
        if(FLAP_S.readyState >= 2) FLAP_S.currentTime = 0;
        FLAP_S.play().catch(e => {});
    },

    update: function() {
        const period = state.current == state.getReady ? 10 : 5;
        this.frame += frames % period == 0 ? 1 : 0;
        this.frame = this.frame % this.animation.length;

        if (state.current == state.getReady) {
            this.y = 150;
            this.rotation = 0 * DEGREE;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            //dziób w dół
            if(this.speed > this.jump/2){
                this.rotation += 3 * DEGREE;
            }

            //kolizja  z ziemia
            if (this.y + this.h/2 >= cvs.height - fg.h) {
                this.y = cvs.height - fg.h - this.h/2;
                this.landing();
            }
        }
    },

    landing: function() {
        if (state.current == state.game) {
            state.current = state.over;
            DIE_S.play();
            saveScore(score);
        }
    }
}

const pipes = {
    position: [], w: 52, h: 320, gap: 100, dx: 2, maxYPos: -150,

    draw: function() {
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            let topY = p.y;
            let bottomY = p.y + this.h + this.gap;

            ctx.save();
            ctx.translate(p.x + this.w/2, topY + this.h/2);
            ctx.scale(1, -1);
            ctx.drawImage(pipeImg, -this.w/2, -this.h/2, this.w, this.h);
            ctx.restore();

            ctx.drawImage(pipeImg, p.x, bottomY, this.w, this.h);
        }
    },

    update: function() {
        if(state.current !== state.game) return;

        if(frames % 100 == 0){
            this.position.push({ x: cvs.width, y: this.maxYPos * (Math.random() + 1) });
        }

        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            p.x -= this.dx;

            let bottomPipeY = p.y + this.h + this.gap;

            // Kolizje
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w &&
                bird.y - bird.radius < p.y + this.h && bird.y + bird.radius > p.y){
                this.hit();
            }
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w &&
                bird.y + bird.radius > bottomPipeY && bird.y - bird.radius < bottomPipeY + this.h){
                this.hit();
            }

            if(p.x + this.w <= 0){
                this.position.shift();
                score++;
                SCORE_S.play();
                i--;
            }
        }
    },

    hit: function() {
        HIT_S.play();
        state.current = state.over;
        bird.jump = 0;
    },

    reset: function(){
        this.position = [];
    }
}

// UI
const getReady = {
    draw: function() {
        if(state.current == state.getReady){
            ctx.drawImage(messageImg, cvs.width/2 - messageImg.width/2, 80);
        }
    }
}

const gameOver = {
    draw: function() {
        if(state.current == state.over){
            if(bird.y + bird.h/2 >= cvs.height - fg.h - 1) {
                ctx.drawImage(gameoverImg, cvs.width/2 - gameoverImg.width/2, 90);

                // Tabela wyników
                ctx.fillStyle = "#ded895";
                ctx.fillRect(cvs.width/2 - 100, 150, 200, 180);
                ctx.strokeRect(cvs.width/2 - 100, 150, 200, 180);

                ctx.fillStyle = "#000";
                ctx.font = "bold 20px Courier New";
                ctx.fillText("Score: " + score, cvs.width/2 - 50, 190);

                let best = getHighScores();
                ctx.font = "16px Courier New";
                for(let i=0; i<best.length; i++){
                    ctx.fillText((i+1) + ". " + best[i], cvs.width/2 - 30, 240 + (i*20));
                }

                // Restart msg
                ctx.fillStyle = "#e86101";
                ctx.fillText("PRESS SPACE", cvs.width/2 - 60, 380);
            }
        }
    }
}

const scoreDraw = {
    draw: function() {
        if(state.current == state.game){
            ctx.fillStyle = "#FFF";
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.font = "35px Courier New";
            ctx.fillText(score, cvs.width/2 - 10, 50);
            ctx.strokeText(score, cvs.width/2 - 10, 50);
        }
    }
}

function performAction() {
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            SWOOSH_S.play().catch(e=>{});
            bird.flap();
            break;
        case state.game:
            bird.flap();
            break;
        case state.over:
            if(bird.y + bird.h/2 >= cvs.height - fg.h - 1) {
                pipes.reset();
                bird.speed = 0;
                bird.rotation = 0;
                bird.jump = 4.6;
                score = 0;
                frames = 0;
                state.current = state.getReady;
            }
            break;
    }
}

// klawiatura
document.addEventListener("keydown", function(evt) {
    if (evt.code === 'Space' || evt.key === ' ' || evt.keyCode === 32) {
        evt.preventDefault();
        console.log("Space");
        performAction();
    }
});

// myszka
cvs.addEventListener("click", function(evt) {
    console.log("mouse click");
    performAction();
});


function draw(){
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    bg.draw();
    pipes.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    scoreDraw.draw();
}

function update(){
    bird.update();
    fg.update();
    pipes.update();
}

function loop(){
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();