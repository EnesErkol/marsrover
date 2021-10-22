class Mars {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rovers = [];
        this.activeRover = null;
    }

    addRover(x, y, direction) {
        if (this.activeRover) {
            this.rovers.push(this.activeRover);
            this.activeRover = null;
        }
        const mars = {
            x: this.x,
            y: this.y
        }

        const rover = new Rover({ x, y, direction, mars });
        this.activeRover = rover;
    }
    sendCommand(commands) {
        commands.split('').forEach((command) => {
            this.activeRover.activateCommand(command);
        });
    }
    getFinalPositions() {
        let positions = this.rovers.map((rover) => {
            return rover.getPosition();
        });
        if (this.activeRover) {
            positions.push(this.activeRover.getPosition());
        }
        return positions;
    }
}
const directions = ['N', 'E', 'S', 'W'];

class Rover {
    constructor({ x, y, direction, mars }) {
        this.mars = mars;
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    activateCommand(command) {
        switch (command) {
            case 'L': {
                let directionIndex = directions.indexOf(this.direction);
                this.direction = directionIndex === 0 ? directions[3] : directions[directionIndex - 1];
                break;
            }
            case 'R': {
                let directionIndex = directions.indexOf(this.direction);
                this.direction = directionIndex === 3 ? directions[0] : directions[directionIndex + 1];
                break;
            }
            case 'M':
                this.moveRover();
                break;
            default:
                break;

        }
    }

    moveRover() {
        switch (this.direction) {

            case 'N':
                if (this.mars.y >= this.y + 1) {
                    this.y = this.y + 1;
                    return
                }
                console.log("Border Max-Y has already been reached!");
                break;
            case 'E':
                if (this.mars.x >= this.x + 1) {
                    this.x = this.x + 1;
                    return
                }
                console.log("Border Max-X has already been reached!");
                break;

            case 'S':
                if (this.y - 1 >= 0) {
                    this.y = this.y - 1;
                    return
                }
                console.log("Border Min-Y has already been reached!");
                break;

            case 'W':
                if (this.x - 1 >= 0) {
                    this.x = this.x - 1;
                    return
                }
                console.log("Border Min-X has already been reached!");
                break;

            default:
                break;

        }
    }
    getPosition() {
        return `${this.x},${this.y},${this.direction}`;

    }
}

let marsRover = new Mars(5, 5);
marsRover.addRover(1, 2, 'N');
marsRover.sendCommand('LMLMLMLMM');
marsRover.addRover(3, 3, 'E');
marsRover.sendCommand('MMRMMRMRRM');
marsRover.addRover(4, 4, 'N');
marsRover.sendCommand('MMRMMRMRRM');
marsRover.addRover(1, 1, 'S');
marsRover.sendCommand('MMRMMRMRRM');
marsRover.getFinalPositions();
