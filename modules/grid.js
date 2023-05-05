import Cell from './cell.js';
import {ctx, width, height} from '../main.js';

const NUM_ROWS = 32;
const NUM_COLS = 32;

export default class Grid
{
    constructor()
    {
        this.cells = [];

        for(let index_row = 0; index_row < NUM_ROWS; index_row++)
        {
            this.cells[index_row] = [];

            for(let index_col = 0; index_col < NUM_COLS; index_col++)
            {
                this.cells[index_row][index_col] = new Cell(index_col, index_row, width / NUM_COLS, height / NUM_ROWS);
            }
        }
    }

    randomize(odds_alive)
    {
        for(let index_row = row - 1; index_row <= row + 1; index_row++)
        {
            for(let index_col = col - 1; index_col <= col + 1; index_col++)
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
                if(cells[(index_col + NUM_COLS) % NUM_COLS][(index_row + NUM_ROWS) % NUM_ROWS].isAlive())
                {
                    num_alive_neighbors++;
                }
            }
        }

        // uncount the middle cell if it is alive(should only be counting 8 neighbors)
        if(cells[col][row].isAlive())
        {
            num_alive_neighbors--;
        }

        return num_alive_neighbors;
    }

    update()
    {

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
