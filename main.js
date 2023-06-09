import Cell from './modules/cell.js';
import Grid from './modules/grid.js';

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = 1024;//indow.innerWidth;
const height = canvas.height = 1024;//window.innerHeight;

ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
ctx.fillRect(0, 0, width, height);

const DELAY = 100;

let grid = new Grid();

grid.randomize(0.2);
grid.update();
grid.drawAll();
// grid.cells[0][0].setAlive();
// grid.cells[0][1].setAlive();
// grid.cells[1][1].setAlive();
// console.log(grid.numAliveNeighbors(0,0));
// console.log(grid.numAliveNeighbors(3,3));
// grid.drawAll();

function loop()
{
    const start = Date.now();

    grid = grid.update();
    grid.drawChanged();

    //while(Date.now() < start + DELAY);

    requestAnimationFrame(loop);
}

loop();

export {ctx, width, height};
