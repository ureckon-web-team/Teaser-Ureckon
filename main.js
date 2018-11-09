var canvas;
var noOfPoints;
var pen = {
    startX : 0,
    startY : 0,
    angle : 0,
    length : 0,
    bobX : 0,
    bobY : 0,
    aVel : 0,
    aAcc : 0
};
var logo = {
    X : 0,
    y : 0,
    img : null
};

// Point Definition
function Point(){
    this.x = 0;
    this.y = 0;
    this.xVel = 0;
    this.yVel = 0;
    this.size = 0;
    this.update = function(){
        this.x += this.xVel;
        this.y += this.yVel;
    };
    this.color =  '';
    this.drawPoint = function(){
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    };
    
}

var points = [];

function preload(){
    logo.img = loadImage('assets/img/svgs/logo_icon_sky.svg', 
    function(){console.log('loaded')});
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('bg-container');
    background(0);
    frameRate(60);

    // Pendulum Initialization
    pen.angle = PI/8;
    setValues();

    // Points Creation
    for(var i=0;i<120;i++){
        points[i] = new Point();
        points[i].x = floor(random(0, width));
        points[i].y = floor(random(0, height));
        points[i].xVel = random(-0.8, 0.8);
        points[i].yVel = random(-0.8, 0.8);
        points[i].size = floor(random(0, 2.5) + 1) * 6;
        var col = floor(random(0, 5) + 1);
        if(col == 1){
            points[i].color = '#fff';
        }
        else if(col == 2){
            points[i].color = '#D60D2C';
        }
        else if(col == 3){
            points[i].color = '#FFF700';
        }
        else if(col == 4){
            points[i].color = '#00FFE8';
        }
        else if(col == 5){
            points[i].color = '#FF5500';
        }
        points[i].drawPoint();
    }
}

function draw(){
    background('#240033');

     // Pendulum Rendering
    stroke('#00fff3');
    fill('#240033');
    pen.bobX = pen.startX + pen.length * sin(pen.angle);
    pen.bobY = pen.startY + pen.length * cos(pen.angle);
    line(pen.startX, pen.startY, pen.bobX, pen.bobY);
    ellipse(pen.bobX, pen.bobY, 32, 32);
    update();
    
    noStroke();
    // Points Rendering
    for(var i=0;i<points.length;i++){
        points[i].update();
        if(points[i].x + points[i].size > width || points[i].x < 0)
            points[i].xVel *= -1;
        if(points[i].y + points[i].size > height || points[i].y < 0)
            points[i].yVel *= -1;
        points[i].drawPoint();
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}


function setValues(){
    pen.startX = width / 2.2;
    pen.bobX = pen.startX;
    pen.startY = 220;
    pen.bobY = pen.startY;
    pen.length = height / 3;
}

function update() {
    var gravity = 0.4;
    pen.aAcc = (-1 * gravity / pen.length) * sin(pen.angle);
    pen.aVel += pen.aAcc;
    pen.angle += pen.aVel;
    // aVelocity *= damping;
}


