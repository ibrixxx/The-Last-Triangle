var canvas = document.getElementById("canvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var m, n;
m = 8; //broj redova imaginarnih
n = 10; //broj kolona imaginarnih
var sirina = window.innerWidth;
var visina = window.innerHeight;
var dots = [];
var razmakX = sirina*0.05;
var razmakY = visina/10;
var radius = sirina*0.005;

function krug(x, y, r){
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.fillStyle = "gray";
	ctx.fill();
}

function getrekt1(x, y, w, h){
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = "orange";
	ctx.fill();
}

function getrekt2(x, y, w, h){
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = "blue";
	ctx.fill();
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


var iks = sirina/4-sirina*0.1;
var ipsilon = visina/8;
var ve = sirina*0.01;
var ha = visina*0.7;
var iks2 = (n-1)*razmakX+sirina/4+sirina*0.1;

getrekt1(iks, ipsilon, ve, ha);
getrekt1(iks2, ipsilon, ve, ha);

var gornjaMedjaX = (n-1)*razmakX+sirina/4;
var donjaMedjaX = sirina/4;
var gornjaMedjaY = (m-1)*razmakY+visina/7;
var donjaMedjaY = visina/7;

var brojTacaka = 33;
let j = 0;
while(j<brojTacaka){
	var tacka = {};
    var randX = getRandomInteger(donjaMedjaX, gornjaMedjaX);
    var randY = getRandomInteger(donjaMedjaY, gornjaMedjaY);
	krug(randX, randY, radius);
	tacka.x = randX;
	tacka.y = randY;
	dots.push(tacka);
	j++;
}

console.log(dots);

//https://github.com/thomasdevin525/connecting-dots/blob/master/js/connecting-dots.js

var clickedDot = null;
canvas.addEventListener("mousedown", function (e) {
    checkForDot(e);
});

function circleCollision (c1, c2) {
    var a = c1.r + c2.r,
        x = c1.x - c2.x,
        y = c1.y - c2.y;

    if ( a > Math.sqrt( (x*x) + (y*y) ) ) return true;
    else return false;
}

function drawLine1 (toDot) {
    ctx.beginPath();
    ctx.moveTo(clickedDot.x, clickedDot.y);
    ctx.lineTo(toDot.x, toDot.y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "orange";
    ctx.stroke();
    ctx.closePath();
}

function drawLine2 (toDot) {
    ctx.beginPath();
    ctx.moveTo(clickedDot.x, clickedDot.y);
    ctx.lineTo(toDot.x, toDot.y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();
}

var brojac = 0;

function checkForDot (e) {
    var i = 0, col = null;
    for (; i < dots.length; i++) {
        var d = dots[i],
            c1 = {x: d.x, y: d.y, r: radius},
            c2 = {x: e.pageX, y: e.pageY, r: radius};
        if (circleCollision(c1, c2)) 
        	col = d;
    }
    if (col !== null) {
        if (clickedDot !== null) {
        	brojac++;
        	if (brojac <= 3){
        		drawLine1(col);  
        		if (brojac == 3){
        			getrekt2(iks, ipsilon, ve, ha);
					getrekt2(iks2, ipsilon, ve, ha);
        			col = null;
        		}
        	}
        	if (brojac > 3 && brojac <= 6){
        		drawLine2(col); 
        		if (brojac == 6){
        			brojac = 0;
        			col = null;
        			getrekt1(iks, ipsilon, ve, ha);
					getrekt1(iks2, ipsilon, ve, ha);
        		}
        	}
        }
    	clickedDot = col;
    } 
    else clickedDot = null;
}
