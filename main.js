import Cell from './modules/cell.js';
import Grid from './modules/grid.js';

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const DELAY_60HZ_MS = 17;

let grid = new Grid();

grid.randomize(0.5);
grid = grid.update();
grid.drawAll();

function loop()
{
    const start = Date.now();

    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    // grid = grid.update();
    // grid.drawAll();

    while(Date.now() < start + DELAY_60HZ_MS);

    requestAnimationFrame(loop);
}

loop();

export {ctx, width, height};
