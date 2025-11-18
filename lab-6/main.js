var leftArea = document.getElementById('left');
var leftCircle = leftArea.children[0];
var rightArea = document.getElementById('right');
var rightCircle = rightArea.children[0];
var vs = document.getElementById('vs');

leftArea.addEventListener('click', function (event) {
    var l = parseInt(leftCircle.innerText) + 1;
    l = l || 1;

    leftCircle.innerText = l;
    leftArea.style.flex = l;

    var r = parseInt(rightCircle.innerText) || 1;
    rightArea.style.flex = r;

    vs.style.left = (100 * l / (l + r)) + '%';
});

rightArea.addEventListener('click', function (event) {
    var r = parseInt(rightCircle.innerText) + 1;
    r = r || 1;
    rightCircle.innerText = r;
    rightArea.style.flex = r;

    var l = parseInt(leftCircle.innerText) || 1;
    leftArea.style.flex = l;

    vs.style.left = (100 * l / (l + r)) + '%';
});
