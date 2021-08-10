const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

const gslider = <HTMLInputElement>document.getElementById("gslider");
const kslider = <HTMLInputElement>document.getElementById("kslider");
const mslider = <HTMLInputElement>document.getElementById("mslider");

const gvalue = <HTMLInputElement>document.getElementById("gvalue");
const kvalue = <HTMLInputElement>document.getElementById("kvalue");
const mvalue = <HTMLInputElement>document.getElementById("mvalue");

let ps: Array<[ number, number ]> = [];

const frameRate = 60;
const stepsPerFrame = 10000;

const topX = 500;
const topY = 250;
const mult = 20;
var g = 10;
var k = 20;
const a = 10;
var m = 3;

let r = 11.5;
let angle = Math.PI * 6 / 20;

let dr = 0, ddr = 0;
let da = 0, dda = 0;
let x: number, y: number;


calculate();
function calculate(): void {
    x = topX + Math.sin(angle) * mult * r;
    y = topY + Math.cos(angle) * mult * r;
}

function draw(): void {
    updateValues();
    calculate();
    clear();
    ctx.fillStyle = "brown"
    ctx.fillRect(0, topY - 10, canvas.width, 10);
    ctx.beginPath();
    for (let i = Math.max(0, ps.length - 2000); i < ps.length; i++) {
        if (i == Math.max(0, ps.length - 2000)) ctx.moveTo(ps[ i ][ 0 ], ps[ i ][ 1 ]);
        else ctx.lineTo(ps[ i ][ 0 ], ps[ i ][ 1 ]);
    }
    ctx.strokeStyle = "magenta";
    ctx.stroke();
    if (ps.length > 50000) ps = ps.slice(ps.length - 5000, ps.length - 1);
    fillCircle(topX, topY, 5, "blue");
    fillCircle(x, y, 5);
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ps.push([ x, y ]);
    step(1 / frameRate, stepsPerFrame);
}
function fillCircle(x: number, y: number, r: number, color = "black"): void {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();

}
function clear(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function step(seconds: number, count: number): void {
    for (let i = 0; i < count; i++) {
        dda = (-2 * dr * da * da - g * Math.sin(angle)) / r;
        ddr = r * da + g * Math.cos(angle) - (k * (r - a)) / m;

        da += dda * seconds / count;
        dr += ddr * seconds / count;

        angle += da * seconds / count;
        r += dr * seconds / count;

    }
}
function updateValues(): void {
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