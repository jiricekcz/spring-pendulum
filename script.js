"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gslider = document.getElementById("gslider");
const kslider = document.getElementById("kslider");
const mslider = document.getElementById("mslider");
const gvalue = document.getElementById("gvalue");
const kvalue = document.getElementById("kvalue");
const mvalue = document.getElementById("mvalue");
let ps = [];
const frameRate = 60;
const stepsPerFrame = 1000;
const topX = 500;
const topY = 250;
const mult = 20;
var g = 5;
var k = 20;
const a = 10;
var m = 3;
let r = 11.5;
let angle = Math.PI * 6 / 20;
let dr = 0, ddr = 0;
let da = 0, dda = 0;
let x, y;
calculate();
function calculate() {
    x = topX + Math.sin(angle) * mult * r;
    y = topY + Math.cos(angle) * mult * r;
}
function draw() {
    updateValues();
    calculate();
    clear();
    ctx.fillStyle = "brown";
    ctx.fillRect(0, topY - 10, canvas.width, 10);
    ctx.beginPath();
    for (let i = Math.max(0, ps.length - 2000); i < ps.length; i++) {
        if (i == Math.max(0, ps.length - 2000))
            ctx.moveTo(ps[i][0], ps[i][1]);
        else
            ctx.lineTo(ps[i][0], ps[i][1]);
    }
    ctx.strokeStyle = "magenta";
    ctx.stroke();
    if (ps.length > 50000)
        ps = ps.slice(ps.length - 5000, ps.length - 1);
    fillCircle(topX, topY, 5, "blue");
    fillCircle(x, y, 5);
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.save();
    ctx.fillStyle = "green";
    ctx.fillRect(1200, 600, 100, getEnergy() / 300 * 600);
    ctx.restore();
    ps.push([x, y]);
    step(1 / frameRate, stepsPerFrame);
}
function getEnergy() {
    return 1 / 2 * m * Math.pow(dr, 2) + 1 / 2 * m * Math.pow(r, 2) * Math.pow(da, 2) + 1 / 2 * k * Math.pow((r - a), 2) - m * g * r * Math.cos(angle);
}
function fillCircle(x, y, r, color = "black") {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
}
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function step(seconds, count) {
    for (let i = 0; i < count; i++) {
        dda = (-2 * dr * da - g * Math.sin(angle)) / r;
        ddr = r * Math.pow(da, 2) + g * Math.cos(angle) - (k * (r - a)) / m;
        da += dda * seconds / count;
        dr += ddr * seconds / count;
        angle += da * seconds / count;
        r += dr * seconds / count;
    }
}
function updateValues() {
    mvalue.innerText = String(m);
    kvalue.innerText = String(k);
    gvalue.innerText = String(g);
    g = Number(gslider.value);
    k = Number(kslider.value);
    m = Number(mslider.value);
}
setInterval(() => {
    draw();
}, 1 / frameRate);
