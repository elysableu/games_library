const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const validMoves = ['u', 'd', 'l', 'r'];

class Field {
    constructor(field, playerX = 0, playerY = 0) {
        this._field = field;
        this._playerX = playerX;
        this._playerY = playerY;
        this._resolved = false;
    }

    static generateField(height, width) {
        let newField = Array.from({length: height}, () => new Array(width).fill(fieldCharacter));
        newField[0][0] = pathCharacter;

        const holeCount = Math.floor(height * width / 3);

        let placed = 0;
        let hatPlaced = false;

        while (placed < holeCount || !hatPlaced) {
            const ranRow = Math.floor(Math.random() * height);
            const ranCol = Math.floor(Math.random() * width);

            if (newField[ranRow][ranCol] === pathCharacter) {
                continue;
            }

            if (newField[ranRow][ranCol] === fieldCharacter) {
                newField[ranRow][ranCol] = hole;
                placed++;
            }

            if (placed === holeCount) {
                newField[ranRow][ranCol] = hat;
                hatPlaced = true;
            }
        }
        return newField;
    }

    // Method to run game play, and maintain game play based on field's resolved value
    playGame() {
        console.log('Oh no you\'ve lost your very special hat!');
        // Add user input to allow for custom starting position
        //
        // console.log('Where was the last place that you saw it?');
        // // Player response
        // const lastPlace = [];

        console.log('Let\s start look where you last saw it!');

        // Maintain game play as long as !resolved
        while (!this._resolved) {
            // At beginning of each move display updated map
            this.printField();
            // Prompt for and accept user input for next move
            const move = prompt('Which way? (u/d/l/r) -> ');

            // If user input is included in approved list of moves
            if (validMoves.includes(move)) {
                // Move will be made based on player input
                this.playerMove(move);
            } else {
                console.log('That wasn\'t a valid move. Try again!');
            }
        }
    }

    printField() {
        this._field.forEach( line => {
           console.log(line.join(' ')); 
        });
    }

    playerMove(direction) {
        const [ newX, newY ] = this.calcualteNewPosition(direction);
        console.log("X: " + newX + " , Y: " + newY);

        if (!this.isInBounds(newX, newY)) {
            console.log('This is not a valid move!  Try again!');
        } 

        this.moveAction(newX, newY);
    }

    calcualteNewPosition(direction) {
        let newX = this._playerX;
        let newY = this._playerY;
    
        switch (direction) {
            case 'r': 
                newX += 1;
                break;
            case 'l':
                newX -= 1;
                break;
            case 'u':
                newY -= 1;
                break;
            case 'd':
                newY += 1;
                break;
       }

       return [newX, newY];
    }

    isInBounds(x, y) {
        // Check that location does not expand beyond the board boundaries
        const width = this._field[0].length - 1;
        const height = this._field.length - 1;

        if ( x < 0 || x > width ) {
            return false;
        }

        if ( y < 0 || y > height ) {
            return false;
        }

        return true;
    }

    moveAction(x, y) {
        const symbol = this._field[y][x];
        console.log(symbol);
        switch (symbol) {
            case hat:
                this.gameResolve(true);
                break;
            case hole:
                this.gameResolve(false);
                break;
            case fieldCharacter:
                this.visitLocation(x, y);
                break;
            case pathCharacter:
                this.visitLocation(x, y);
                break;
        }
    }

    visitLocation(x, y) {
        this._field[y][x] = pathCharacter;
        this._playerX = x;
        this._playerY = y;
    }

    gameResolve(winner) {
        if (winner) {
            console.log('Awesome! You found your hat!');
            this._resolved = true;
        } else {
            console.log('Bummer! You didn\'t see that hole.  Now no hat and a bum leg, what a bad day!');
            this._resolved = true;
        }
    }
}


// Generate a random field based on size parameters, using the statis method Field.generateField
const field = Field.generateField(6, 7);

// Instantiate a new field object
const myField = new Field(field);

myField.playGame();