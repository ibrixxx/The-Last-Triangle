var canvas = document.getElementById("canvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var m, n; //dimenzije matrice tecaka
m = 8; //broj redova
n = 10; //broj kolona
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


var iks = sirina/4-sirina*0.1;
var ipsilon = visina/8;
var ve = sirina*0.01;
var ha = visina*0.7;
var iks2 = (n-1)*razmakX+sirina/4+sirina*0.1;

getrekt1(iks, ipsilon, ve, ha);
getrekt1(iks2, ipsilon, ve, ha);  

var i = 0;
while(i<m){
	var j = 0;
	while(j<n){
		var tacka = {};
		krug(j*razmakX+sirina/4,i*razmakY+visina/7, radius);
		tacka.x = j*razmakX+sirina/4;
		tacka.y = i*razmakY+visina/7;
		dots.push(tacka);
		j++;
	}
	i++;
}
console.log(dots);

var linije = [];

function maxi(a, b){
	if(a > b)
		return a;
	return b;
}

function mini(a, b){
	if(a < b)
		return a;
	return b;
}

function onSegment(p, q, r){
	if (q.x < maxi(p.x, r.x) && q.x > mini(p.x, r.x) && 
        q.y < maxi(p.y, r.y) && q.y > mini(p.y, r.y)) 
       return true; 
    return false; 
}

function orientation(p, q, r){
	var val = (q.y - p.y) * (r.x - q.x) - 
              (q.x - p.x) * (r.y - q.y); 
  
    if (val == 0) return 0; 
    else if(val > 0) return 1;
    else return 2;
}

function doIntersect(p1, q1, p2, q2){
	var o1 = orientation(p1, q1, p2); 
    var o2 = orientation(p1, q1, q2); 
    var o3 = orientation(p2, q2, p1); 
    var o4 = orientation(p2, q2, q1); 
  
    if (o1 != o2 && o3 != o4) 
        return true; 

    return false;
}

//https://github.com/thomasdevin525/connecting-dots/blob/master/js/connecting-dots.js

var clickedDot = null;
canvas.addEventListener("mousedown", function (e) {
    checkForDot(e);
});

function circleCollision (c1, c2) {
    var a = c1.r + c2.r,
        x = c1.x - c2.x,
        y = c1.y - c2.y;

    if ( a > Math.sqrt( (x*x) + (y*y) ) ) 
    	return true;
    return false;
}

function drawLine (toDot, color) {
    ctx.beginPath();
    ctx.moveTo(clickedDot.x, clickedDot.y);
    ctx.lineTo(toDot.x, toDot.y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
    var linija = [];
    var dot1 = {};
    dot1.x = clickedDot.x;
    dot1.y = clickedDot.y;
    linija.push(dot1);
    var dot2 = {};
    dot2.x = toDot.x;
    dot2.y = toDot.y;
    linija.push(dot2);
    linije.push(linija);
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
        	if (!(daLiSijece(clickedDot, col))){
	        	brojac++;
	        	if (brojac <= 3){
	        		drawLine(col, "orange");  
	        		if (brojac == 3){
	        			getrekt2(iks, ipsilon, ve, ha);
						getrekt2(iks2, ipsilon, ve, ha);
	        			col = null;
	        		}
	        	}
	        	if (brojac > 3 && brojac <= 6){
	        		drawLine(col, "blue"); 
	        		if (brojac == 6){
	        			brojac = 0;
	        			col = null;
	        			getrekt1(iks, ipsilon, ve, ha);
						getrekt1(iks2, ipsilon, ve, ha);
	        		}
	        	}
	        }
	        else clickedDot = null;	
        }
    	clickedDot = col;
    } 
    else clickedDot = null;
}
console.log(linije);

function daLiSijece(p1, q1){
	var flag = false;
	var i = 0;
	for (; i < linije.length; i++){
		var p2 = linije[i][0];
		var q2 = linije[i][1];
		if (doIntersect(p1, q1, p2, q2))
			flag = true;
	}
	return flag;
}