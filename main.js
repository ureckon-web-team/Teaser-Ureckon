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
    aAcc : 0,
    flx : 0,
    frx : 0
};
var logo = {
    x : 0,
    y : 0,
    img : null,
    h : 65,
    w : 65,
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
        stroke(this.color);
        strokeWeight(1);
        ellipse(this.x, this.y, this.size, this.size);
    };
    
}

var points = [];

function preload(){
    logo.img = loadImage('assets/img/svgs/logo_icon_sky.svg', 
    function(){console.log('loaded');});
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('bg-container');
    background(0);
    frameRate(60);

    // Pendulum Initialization
    drawFrame();

    intiPen();
    
    // Points Creation
    noOfPoints = getPtCount();
    initPts(noOfPoints);

    {
    // for(var i=0;i<120;i++){
    //     points[i] = new Point();
    //     points[i].x = floor(random(0, width));
    //     points[i].y = floor(random(0, height));
    //     points[i].xVel = random(-0.8, 0.8);
    //     points[i].yVel = random(-0.8, 0.8);
    //     points[i].size = floor(random(0, 2.5) + 1) * 6;
    //     var col = floor(random(0, 5) + 1);
    //     if(col == 1){
    //         points[i].color = '#fff';
    //     }
    //     else if(col == 2){
    //         points[i].color = '#D60D2C';
    //     }
    //     else if(col == 3){
    //         points[i].color = '#FFF700';
    //     }
    //     else if(col == 4){
    //         points[i].color = '#00FFE8';
    //     }
    //     else if(col == 5){
    //         points[i].color = '#FF5500';
    //     }
    //     points[i].drawPoint();
    // }
    }
}

function draw(){
    background('#240033');
     
    drawFrame();
    drawFrameText();
    {
    // stroke('#00fff3');
    // fill('#240033');
    // strokeWeight(2.5);
    // image(logo.img, logo.x, logo.y, logo.w, logo.h);
    // pen.bobX = pen.startX + pen.length * sin(pen.angle);
    // pen.bobY = pen.startY + pen.length * cos(pen.angle);
    // line(pen.startX, pen.startY, pen.bobX, pen.bobY);
    // ellipse(pen.bobX, pen.bobY, 32, 32);
    // update();
    }

    // Pendulum Rendering
    drawPen();
    
    {
    // Points Rendering
    // for(var i=0;i<points.length;i++){
    //     points[i].update();
    //     // Window Check
    //     if(points[i].x + points[i].size > width || points[i].x < 0)
    //         points[i].xVel *= -1;
    //     if(points[i].y + points[i].size > height || points[i].y < 0)
    //         points[i].yVel *= -1;
    //     // Pendulum Frame Check
    //     if((points[i].x + points[i].size >= pen.flx - 60 && points[i].x <= pen.frx + 60)
    //         && (points[i].y > 160 && points[i].y <= 160 + pen.length + logo.h + 32 + 60)){
    //         points[i].x = floor(random(0, width));
    //         points[i].y = floor(random(0, height));
    //     }
    //     points[i].drawPoint();
    // }
    }
    // Points Rendering
    drawPts();
}
{
// Advanced check
 // (points[i].x + points[i].size > pen.flx - 60 && (points[i].y > 160 && points[i].y < 160 + pen.length + logo.h + 32 + 60))  ||
            // points[i].x < pen.frx + 60 && (points[i].y > 160 && points[i].y < 160 + pen.length + logo.h + 32 + 60) ||
            // points[i].y + points[i].size > 160 && (points[i].x >= pen.flx - 60 && points[i].x <= pen.frx + 60)
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    // Pendulum Re-Initialization
    drawFrame();

    intiPen();
    
    // Points Re-Creation
    noOfPoints = getPtCount();
    initPts(noOfPoints);
}


function setValues(){
    logo.x = width / 2.1 - logo.w/2;
    logo.y = 200;
    pen.startX = logo.x + logo.w/2;
    pen.startY = logo.y + logo.h;
    pen.bobX = pen.startX;
    pen.bobY = pen.startY;
    pen.length = height / 4.5;
}

function drawFrame(){
    stroke(255 ,0 ,0);
    noFill();
    strokeWeight(3);

    // Upper Text Rect
    rect(pen.flx-60, 195 - 30, pen.frx + 60 - (pen.flx - 60), 30, 5);

    // Lower Text Rect
    rect(pen.flx - 65, 160 + pen.length + logo.h + 32 + 32, pen.frx + 65 - (pen.flx - 65), 30, 5);
    
    // Left side Lines
    line(pen.flx - 25, 195, pen.flx-25, 160 + pen.length + logo.h + 32 + 32);
    line(pen.flx - 35, 195, pen.flx-35, 160 + pen.length + logo.h + 32 + 32);

    // Right side Lines
    line(pen.frx + 25, 195, pen.frx+25, 160 + pen.length + logo.h + 32 + 32);
    line(pen.frx + 35, 195, pen.frx+35, 160 + pen.length + logo.h + 32 + 32);
}

function drawFrameText(){
    strokeWeight(0.9);
    fill(14, 228, 228);
    stroke(14, 228, 228);
    textSize(22);
    text("CLOCK'S TICKING", pen.flx - 40, 160 + 28);
    text("ARE YOU READY?", pen.flx - 45, 160 + pen.length + logo.h + 32 + 32 + 24);
}

function intiPen(){
    pen.angle = PI/8;
    setValues();
    pen.frx = ceil(pen.startX + pen.length * sin(pen.angle));
    pen.flx = ceil(pen.startX + pen.length * sin(-1*pen.angle));
}

function drawPen(){
    stroke('#00fff3');
    fill('#240033');
    strokeWeight(2.5);
    image(logo.img, logo.x, logo.y, logo.w, logo.h);
    pen.bobX = pen.startX + pen.length * sin(pen.angle);
    pen.bobY = pen.startY + pen.length * cos(pen.angle);
    line(pen.startX, pen.startY, pen.bobX, pen.bobY);
    ellipse(pen.bobX, pen.bobY, 32, 32);
    update();
}

function initPts(no){
    for(var i=0;i<no;i++){
        points[i] = new Point();
        points[i].x = floor(random(0, width));
        points[i].y = floor(random(0, height));
        if((points[i].x + points[i].size >= pen.flx - 60 && points[i].x <= pen.frx + 60)
        && (points[i].y >= 160 && points[i].y <= 160 + pen.length + logo.h + 32 + 60)){
            points[i].x = 10;
            points[i].y = 40;
        }
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

function drawPts(){
    for(var i=0;i<points.length;i++){
        points[i].update();
        // Window Check
        if(points[i].x + points[i].size > width || points[i].x < 0)
            points[i].xVel *= -1;
        if(points[i].y + points[i].size > height || points[i].y < 0)
            points[i].yVel *= -1;
        // Pendulum Frame Check
        if((points[i].x + points[i].size >= pen.flx - 60 && points[i].x - points[i].size/2 <= pen.frx + 60)
            && (points[i].y > 160 && points[i].y <= 160 + pen.length + logo.h + 32 + 60)){
            points[i].yVel *= -1;
            points[i].xVel *= -1;
        }
        points[i].drawPoint();
    }
}

function getPtCount(){
    var ret = 0;
    if(width > 1440)ret = 200;
    else if(width > 1024 && width <= 1440) ret = 150;
    else if(width > 768 && width <= 1024) ret = 90;
    else if(width > 450 && width <= 768) ret = 85;
    else if(width < 450) ret = 75;
    return ret;
}

function update() {
    var gravity = 0.4;
    pen.aAcc = (-1 * gravity / pen.length) * sin(pen.angle);
    pen.aVel += pen.aAcc;
    pen.angle += pen.aVel;
    // aVelocity *= damping;
}


