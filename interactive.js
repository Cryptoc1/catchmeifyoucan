var width = window.innerWidth,
    height = window.innerHeight;

var elem = document.getElementById('drawing-area');
var two = new Two({
    width: width,
    height: height,
    fullscreen: true
}).appendTo(elem);

var group = two.makeGroup();

var circle = two.makeCircle(0, 0, two.height / 6);
circle.fill = '#F44336';
circle.stroke = "rgba(136, 136, 136, .55)";
circle.linewidth = 5;

group.add(circle);

var dot = two.makeCircle(two.height / 9, 0, two.height / 45);
dot.fill = "#424242";
dot.stroke = "rgba(128, 128, 128, .5)";
dot.linewidth = 2;

two.update();
dot._renderer.elem.addEventListener('mouseover', onDotMouseOver, false);

group.add(dot);

group.translation.set(two.width / 2, two.height / 2);
group.scale = 1;

var rotationAngle = .075;

window.addEventListener('mousedown', onMouseDown, false);

function onDotMouseOver(e) {
    var _rotationAngle = rotationAngle;
    rotationAngle += .05;
    setTimeout(function () {
        rotationAngle = _rotationAngle;
    }, 500);
}

var count = 0;

function onMouseDown(e) {
    if (count < 50) {
        if (e.target.id == "two_3") {
            var hitCount = document.getElementById('hit-count');
            var _count = parseInt(hitCount.innerHTML);
            hitCount.innerHTML = _count + 1;
            console.log("hit")
        } else if (e.target.id != "two_3") {
            rotationAngle += .01;
        }
    } else {
        alert("You've clicked over 50 times. I'm sorry, but that dot got away from you.");
    }
    count += 1;
}

two.bind('update', function (frameCount) {
    group.rotation += rotationAngle;
}).play();
