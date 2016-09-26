var value = 0;
function setup() {
    var canvas = createCanvas(500, 500);
    var old_mousex, old_mouse;
    background(255);
    canvas.parent('sketch');


}

function keyPressed() {
    if (keyCode === 32) {
        if (value === 0) {
            stroke(255);
            strokeWeight(10);
            value = 1;
        } else {
            stroke(0);
            strokeWeight(1);
            value = 0;
        }
    }
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

