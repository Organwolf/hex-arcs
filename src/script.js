/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

let canvas;
let ctx;
let w, h;
let hexagons;

class Hexagon {
  constructor(x, y, r, R) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.R = R;
  }
  draw() {
    let randomOffset = (Math.floor(Math.random() * 6) * Math.PI) / 3;
    ctx.save();
    ctx.translate(this.x, this.y);
    // the offset is the rotation of the hex
    // all hexes are the same
    ctx.rotate(randomOffset);
    // sides of each hex
    let nrOfPoints = 6;
    ctx.beginPath();
    for (let point = 0; point < nrOfPoints; point++) {
      let angle = (Math.PI * 2 * point) / nrOfPoints + Math.PI / 6;
      let x = Math.cos(angle) * this.R * 0.97;
      let y = Math.sin(angle) * this.R * 0.97;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.lineWidth = this.r * 0.01;
    ctx.stroke();
    ctx.clip();

    ctx.lineWidth = this.r * 0.04;
    ctx.beginPath();
    // ctx.arc(this.r * 2, 0, this.r * 1.73, 0, Math.PI * 2);
    ctx.arc(this.r * 2, 0, this.r * 1.73, 0, Math.PI * 3, 4);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(-this.r * 2, 0, this.r * 1.73, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }
}

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
  canvas.addEventListener("click", draw);
  resize();
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function setupHexagons() {
  hexagons = [];
  // r - the size of the screen
  // let r = Math.random() * 50 + 30;
  let r = Math.random() * 5 + 30;
  let R = r / Math.cos(Math.PI / 6);
  let t = (r * 2) / Math.sqrt(3);
  let rows = w / (r * 2) + 1;
  let cols = h / R;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let xOffset = y % 2 === 0 ? r : 0;
      let xPixel = r * x * 2 + xOffset;
      let yPixel = (t / 2 + R) * y;
      let hexagon = new Hexagon(xPixel, yPixel, r, R);
      hexagons.push(hexagon);
    }
  }
}

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  setupHexagons();
  hexagons.forEach((h) => {
    h.draw();
  });
}

setup();
draw();
