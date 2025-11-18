function createCube() {
    var cube = document.createElement("div");
    cube.className = "cube";
    cube.innerHTML = "2";
    var x = parseInt((Math.random() * 4))
    var y = parseInt((Math.random() * 4))
    while(getCube(x, y)) {
        x = parseInt((Math.random() * 4))
        y = parseInt((Math.random() * 4))
    }
    cube.x = x;
    cube.y = y;
    cube.style.top = 10 + 70 * cube.x + "px";
    cube.style.left = 10 + 70 * cube.y + "px";
    var container = document.getElementById("cellContainer");
    container.appendChild(cube);
}
function getCube(x, y) {
    var cubes = document.getElementsByClassName("cube");
    for(var i in cubes) {
        if(cubes[i].x === x && cubes[i].y === y) {
            return cubes[i];
        }
    }
    return null;
}
document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":   
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
    }
});
function moveLeft(){
    for(var y=0;y<4;y++){
        for(var x=0;x<4;x++){
            var cube = getCube(x,y);
        }
    }
}