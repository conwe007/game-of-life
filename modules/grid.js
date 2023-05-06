import Cell from './cell.js';
import {width, height} from '../main.js';

const NUM_ROWS = 32;
const NUM_COLS = 32;

export default class Grid
{
    constructor(grid)
    {
        if(grid == null)
        {
            this.cells = [];

            for(let index_row = 0; index_row < NUM_ROWS; index_row++)
            {
                this.cells[index_row] = [];
    
                for(let index_col = 0; index_col < NUM_COLS; index_col++)
                {
                    const cell_width = width / NUM_COLS;
                    const cell_height = height / NUM_ROWS;
                    const cell_x = index_col * cell_width;
                    const cell_y = index_row * cell_height;
    
                    this.cells[index_row][index_col] = new Cell(cell_x, cell_y, cell_width, cell_height);
                }
            }
        }
        else
        {
            this.cells = [];

            for(let index_row = 0; index_row < NUM_ROWS; index_row++)
            {
                this.cells[index_row] = [];
    
                for(let index_col = 0; index_col < NUM_COLS; index_col++)
                {
                    this.cells[index_row][index_col] = grid.cells[index_row][index_col].clone();
                }
            }
        }
    }

    randomize(odds_alive)
    {
        for(let index_row = 0; index_row < NUM_ROWS; index_row++)
        {
            for(let index_col = 0; index_col < NUM_COLS; index_col++)
            {
                if(Math.random() < odds_alive)
                {
                    this.cells[index_row][index_col].setAlive();
                }
            }
        }
    }

    numAliveNeighbors(row, col)
    {
        let num_alive_neighbors = 0;

        for(let index_row = row - 1; index_row <= row + 1; index_row++)
        {
            for(let index_col = col - 1; index_col <= col + 1; index_col++)
            {
                // roll over if neighbor is outside grid bounds
                if(this.cells[((index_col % NUM_COLS) + NUM_COLS) % NUM_COLS][((index_row % NUM_ROWS) + NUM_ROWS) % NUM_ROWS].isAlive())
                {
                    num_alive_neighbors++;
                }
            }
        }

        // uncount the middle cell if it is alive(should only be counting 8 neighbors)
        if(this.cells[col][row].isAlive())
        {
            num_alive_neighbors--;
        }

        return num_alive_neighbors;
    }

    update()
    {
        const grid = new Grid(this);

        for(let index_row = 0; index_row < NUM_ROWS; index_row++)
        {
            for(let index_col = 0; index_col < NUM_COLS; index_col++)
            {
                const num_alive_neighbors = this.numAliveNeighbors(index_row, index_col);
                console.log(num_alive_neighbors);
                // set alive if:
                // cell is alive and has 2 or 3 alive neighbors or
                // cell is dead and has 3 alive neighbors
                if((this.cells[index_row][index_col].isAlive() && (num_alive_neighbors == 2 || num_alive_neighbors == 3)) ||
                    (!this.cells[index_row][index_col].isAlive() && num_alive_neighbors == 3))
                {
                    console.log(this.cells[index_row][index_col]);
                    grid.cells[index_row][index_col].setAlive();
                }
                else
                {
                    grid.cells[index_row][index_col].setDead();
                }
            }
        }

        return grid;
    }

    clone()
    {
        const grid = new Grid();

        for(let index_row = 0; index_row < NUM_ROWS; index_row++)
        {
            for(let index_col = 0; index_col < NUM_COLS; index_col++)
            {
                grid.cells[index_row][index_col] = this.cells[index_row][index_col].clone();
            }
        }

        return grid;
    }

    drawAll()
    {
        for(let index_row = 0; index_row < NUM_ROWS; index_row++)
        {
            for(let index_col = 0; index_col < NUM_COLS; index_col++)
            {
                this.cells[index_row][index_col].draw();
            }
        }
    }

    drawChanged()
    {
        for(let index_row = 0; index_row < NUM_ROWS; index_row++)
        {
            for(let index_col = 0; index_col < NUM_COLS; index_col++)
            {
                if(this.cells[index_row][index_col].isChanged())
                {
                    this.cells[index_row][index_col].draw();
                }
            }
        }
    }
}
