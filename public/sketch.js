function setup() {
    var canvas = createCanvas(500, 500);
    var old_mousex, old_mouse;
    background(255);
    canvas.parent('sketch');
}

function draw() {
    if (mouseIsPressed)
    {
        line(mouseX, mouseY, old_mousex, old_mousey);
    }
    old_mousex=mouseX;
    old_mousey=mouseY;
}

function mousePressed(){
    ellipse(mouseX,mouseY,1,1);
}

