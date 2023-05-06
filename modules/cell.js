import {ctx} from '../main.js';

const STATE_DEAD = 0;
const STATE_ALIVE = 0;

export default class Cell
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "white";
        this.state = STATE_DEAD;
        this.state_previous = STATE_DEAD;
    }
    
    setAlive()
    {
        this.state_previous = this.state;
        this.state = STATE_ALIVE;
        this.color = "black";
    }

    setDead()
    {
        this.state_previous = this.state;
        this.state = STATE_DEAD;
        this.color = "white";
    }

    isAlive()
    {
        return this.state == STATE_ALIVE;
    }

    wasAlive()
    {
        return this.state_previous == STATE_ALIVE;
    }

    isChanged()
    {
        return this.state != this.state_previous;
    }

    draw()
    {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    toString()
    {
        let output = '';

        output += '(' + this.x + ',' + this.y + ')\n';
        output += 'w: ' + this.width + ', h: ' + this.height + '\n';
        output += 'state: ' + this.state;

        return output;
    }
}
