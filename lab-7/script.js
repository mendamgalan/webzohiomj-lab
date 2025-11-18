var canvas = document.getElementById("myCanvas");
var context = canvas && canvas.getContext("2d");

var bubbles = [];
var stage = 1; 
var count = 4;
var mouseX = null, mouseY = null;
var endFrame = 600;
var popSound = new Audio('pop.mp3');
var popEffects = [];
var scoreBoard = document.getElementById("scoreBoard");
if (!scoreBoard) {
    console.error('Scoreboard element not found');
}
var gameOver = false; 

function createPopAnimation(x, y, color) {
    popEffects.push({
        x: x,
        y: y,
        radius: 0,
        maxRadius: 500,
        alpha: 1,
        color: color
    });
}

function moveBubble(bubble) {
    context.beginPath();
    context.fillStyle = bubble.color;
    context.arc(bubble.x, bubble.y, bubble.size, 0, 2 * Math.PI);
    if (mouseX !== null && mouseY !== null && context.isPointInPath(mouseX, mouseY)) {
        bubble.removed = true;
        var newPopSound = new Audio('pop.mp3');
        newPopSound.play().catch(function(error) {
            console.warn('Audio playback failed:', error);
        });
        createPopAnimation(bubble.x, bubble.y, bubble.color);
        mouseX = null;
        mouseY = null;
    }
    context.fill();
    context.beginPath();
    context.fillStyle = "#ffffff";
    context.arc(bubble.x - (bubble.size / 20) * 7, bubble.y - (bubble.size / 20) * 7, (bubble.size / 20) * 7, 0, 2 * Math.PI);
    context.fill();
    if (bubble.y >= canvas.height - bubble.size || bubble.y <= bubble.size) {
        bubble.my *= -1;
    }
    if (bubble.x >= canvas.width - bubble.size || bubble.x <= bubble.size) {
        bubble.mx *= -1;
    }
    bubble.x += bubble.mx;
    bubble.y += bubble.my;
}

function renderFrame() {
    if (!context) return;
    
    context.fillStyle = "#000066";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    if (!gameOver) {
        bubbles.forEach(function(bubble) {
            moveBubble(bubble);
        });
        
        bubbles = bubbles.filter(function(bubble) {
            return !bubble.removed;
        });
        
        if (bubbles.length === 0) {
            stage += 1; 
            count += 2; 
            createBubble();
            endFrame = 600;
        }
        
        popEffects.forEach(function(p) {
            context.beginPath();
            context.strokeStyle = `rgba(${p.color.match(/\d+/g).join(',')},${p.alpha})`;
            context.lineWidth = 4;
            context.arc(p.x, p.y, Math.min(p.radius, p.maxRadius), 0, 2 * Math.PI);
            context.stroke();
            p.radius += 2.5;
            p.alpha -= 0.02;
        });
        popEffects = popEffects.filter(p => p.alpha > 0);
        
        if (scoreBoard) {
            scoreBoard.innerText = "Үе: " + stage + " Үлдсэн бөмбөг: " + bubbles.length + " Цаг: " + Math.floor(endFrame / 60);
        }
        
        if (endFrame-- === 0) {
            gameOver = true; 
        }
    } else {
        context.fillStyle = "#000066";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.font = "40px Arial";
        context.textAlign = "center";
        context.fillText("Game Over! Score: " + stage, canvas.width / 2, canvas.height / 2 - 50);
        
        context.fillStyle = "#4CAF50";
        context.fillRect(canvas.width / 2 - 100, canvas.height / 2, 200, 50);
        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText("Replay", canvas.width / 2, canvas.height / 2 + 35);
    }
}

function createBubble() {
    for (var i = 0; i < count; i++) {
        var size = parseInt(Math.random() * 20) + 15;
        var speed = Math.random() * 6 - 3;
        var mx = speed === 0 ? 1 : speed;
        var my = speed === 0 ? 1 : speed;
        var bubble = {
            size: size,
            x: parseInt(Math.random() * (canvas.width - size * 2)) + size,
            y: parseInt(Math.random() * (canvas.height - size * 2)) + size,
            mx: mx,
            my: my,
            color: 'rgb(' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ')',
            removed: false
        };
        bubbles.push(bubble);
    }
}

createBubble();
setInterval(renderFrame, 16);

canvas.addEventListener('mousedown', function(event) {
    if (!context) return;
    var rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    
    if (gameOver && mouseX >= canvas.width / 2 - 100 && mouseX <= canvas.width / 2 + 100 &&
        mouseY >= canvas.height / 2 && mouseY <= canvas.height / 2 + 50) {
        bubbles = [];
        popEffects = [];
        stage = 1;
        count = 4;
        createBubble();
        endFrame = 600;
        gameOver = false;
    }
});