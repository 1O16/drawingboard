const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("range");
const mode = document.getElementById("mode");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c"
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPaint() {
    painting = false;
};

function startPaint() {
    painting = true;
};

function mouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

function handleColorClicck(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRange(event) {
    const lineSize = event.target.value;
    ctx.lineWidth = lineSize
}

function handleMode() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function canvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mouseup", stopPaint);
    canvas.addEventListener("mouseleave", stopPaint);
    canvas.addEventListener("click", canvasClick);
};

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClicck));

if (range) {
    range.addEventListener("input", handleRange)
}

if (mode) {
    mode.addEventListener("click", handleMode)
}