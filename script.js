const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let w, h, balls = [];
let mouse = {
	x: undefined,
	y: undefined
}
let rgb = [
	[156, 77, 172],
	[192, 117, 207],
	[230, 135, 249],
	[78, 34, 87],
	[94, 42, 103]
]

function init() {
	resizeReset();
	animationLoop();
}

function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}

function animationLoop() {
	ctx.clearRect(0, 0, w, h);
	if (mouse.x !== undefined && mouse.y !== undefined) {
		balls.push(new Ball());
	}	
	if (balls.length > 250) {
		balls = balls.slice(1);
	}
	drawBalls();
	requestAnimationFrame(animationLoop);
}

function drawBalls() {
	for (let i = 0; i < balls.length; i++) {
		balls[i].update();
		balls[i].draw();
	}
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;
}

function mouseout() {
	mouse.x = undefined;
	mouse.y = undefined;
}

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

class Ball {
	constructor() {
		this.x = mouse.x + getRandomInt(-20, 20);
		this.y = mouse.y + getRandomInt(-20, 20);
		this.size = getRandomInt(10, 20);
		this.rgb = rgb[getRandomInt(0, rgb.length - 1)];
		this.style = "rgba("+this.rgb[0]+","+this.rgb[1]+","+this.rgb[2]+",.5)";
	}
	draw() {
		ctx.fillStyle = this.style;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
	update() {
		if (this.size > 0) {
			let s = this.size - 0.3;
			this.size = (s <= 0) ? 0 : s;
		}
	}
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);