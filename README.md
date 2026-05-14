# 🃏 JavaScript Games Library

A console-based JavaScript game library built with reusable, modular game logic. Designed with a future dynamic UI in mind — the core game logic is intentionally decoupled from the interface so it can be wired up to a frontend without rewriting the game rules.

---

## 🎮 Games Included

<details>
<summary><strong>Mancala</strong> — <code>mancala/main.js</code></summary>

### About
A two-player strategy game played on a board with 12 small cups and 2 stores (large cups). Players take turns sowing stones around the board, trying to capture their opponent's pieces and collect the most stones in their store.

### Setup
- 4 stones are placed in each of the 12 small cups (6 per side)
- The store to each player's right belongs to them

### How to Play
- Players alternate turns, picking up all stones from one of their six cups
- Stones are distributed one by one into subsequent cups going counterclockwise
- **Sowing:** Drop a stone in your own store when you pass it — skip your opponent's store
- **Extra Turn:** If your last stone lands in your own store, take another turn
- **Capturing:** If your last stone lands in an empty cup on your side, capture that stone plus all stones in the directly opposite cup — all go into your store. If the opposite cup is empty, nothing is captured.

### Game End
- The game ends when all six cups on one side of the board are empty
- Any stones remaining on a player's side are added to their store
- The player with the most stones in their store wins

### Strategy
- **Going first** is an advantage — use it
- **Start with your third cup** — the last stone lands in your store, earning a second turn
- **Chain turns** — always look for moves that end in your store to maintain momentum

### Known Issues
- None at this time

</details>

<details>
<summary><strong>Crazy Eights</strong> — <code>crazy_eights/main.js</code></summary>

### About
Match the top card of the discard pile by suit or value. Eights are wild — play one and declare the next suit your opponent must follow!

### How to Play
- Each player is dealt 5 cards (7 cards for 2 players)
- On your turn, play a card that matches the top of the discard pile by suit or value
- If you have no valid play, draw from the stock pile until you do
- Play an eight at any time and declare the next suit
- First player to empty their hand wins

### Known Issues
- ✅ RESOLVED: All players are currently human — computer player logic is stubbed out but not yet implemented. PvP and computer vs. player modes need to be separated into distinct flows
- Console UI needs refinement — discard and stock pile display (✅ RESOLVED), hand formatting, and turn messaging could all be cleaner and more readable
- ✅ RESOLVED: Minor issues with drawing cards and retaining them from turn to turn

</details>

<details>
<summary><strong>Find My Hat</strong> — <code>find_my_hat_cc/main.js</code></summary>

### About
A [Codecademy](https://codecademy.com) backend course exercise. Navigate a randomly generated field trying to find your hat. Watch your step — one wrong move into a hole and it's game over!

### How to Play
- You start at the top left corner of a randomly generated field
- Use `u` `d` `l` `r` to move up, down, left, and right
- Find the hat `^` to win
- Fall in a hole `O` and you lose

### Known Issues
- No known issues at this time

</details>

---

## 🔜 Games Coming Soon

- Gin Rummy
- Go Fish
- Blackjack
- Snap

---

## ⚙️ Setup & Installation

### Prerequisites
Make sure you have Node.js installed. You can download it at [nodejs.org](https://nodejs.org).

Verify your installation:
```bash
node -v
npm -v
```

### Clone the Repository
```bash
git clone <your-repo-url>
cd games_library
```

### Install Dependencies
```bash
npm install
```

---

## 🚀 Running a Game

Navigate to the game's directory and run it with Node:

```bash
# Mancala
node mancala/main.js

# Crazy Eights
node crazy_eights/main.js

# Find My Hat
node find_my_hat_cc/main.js
```

---

## 🗂️ Project Structure

```
games_library/
├── utility/
│   └── shuffle.js
├── game_pieces/
|   ├── boards/
|   |   ├── spaces/
|   |   |   ├── filledSpace.js
|   |   |   ├── perimeterSpace.js
|   |   |   └── space.js
|   |   ├── board.js
|   |   ├── filledBoard.js
|   |   ├── perimeterBoard.js
│   └── cards/
│       └── standard_52/
│           ├── deck.js
│           └── card.js
|   ├── pieces/
|   |   └── piece.js
│   └── players/
|       ├── boardPlayer.js
│       └── cardPlayer.js
├── crazy_eights/
│   └── main.js
├── find_my_hat_cc/
| └── main.js
└── mancala/
    ├── main.js
    └── mancalaBoard.js
```

---

## 🧰 Utility Classes

### `Shuffle` — `utility/shuffle.js`
<details>
<summary>Show details</summary>

Static shuffle methods for randomizing arrays.

| Method | Description |
|--------|-------------|
| `Shuffle.fyShuffle(arr)` | Fisher-Yates shuffle — true random shuffle |
| `Shuffle.faroShuffle(arr)` | Faro shuffle — interleaves two halves |
| `Shuffle.riffleShuffle(arr)` | Riffle shuffle — mimics a human shuffle |

</details>

---

## 🃏 Card Classes

### `Card` — `game_pieces/cards/standard_52/card.js`
<details>
<summary>Show details</summary>

Represents a single playing card.

| Property | Description |
|----------|-------------|
| `suit` | The card's suit (H, D, S, C) |
| `value` | The card's value (A, 2-10, J, Q, K) |
| `numericValue` | The card's numeric value for scoring |

| Method | Description |
|--------|-------------|
| `display()` | Returns a formatted string of the card |

</details>

### `Deck` — `game_pieces/cards/standard_52/deck.js`
<details>
<summary>Show details</summary>

Represents a standard 52-card deck.

| Method | Description |
|--------|-------------|
| `deal()` | Removes and returns the top card |
| `shuffle()` | Shuffles the deck in place |
| `build()` | Rebuilds the full 52-card deck |

Constructor accepts an optional boolean to include Jokers:
```js
new Deck();        // 52 cards
new Deck(true);    // 54 cards with Jokers
```

</details>

---

## 🎲 Board Classes

### `Board` — `game_pieces/boards/board.js`
<details>
<summary>Show details</summary>

Base class for all board types. Extended by `FilledBoard` and `PerimeterBoard`.

| Property | Description |
|----------|-------------|
| `dimensions` | Object with `x` and `y` properties defining the board size |
| `board` | The board data structure (set by subclass `build()`) |

| Method | Description |
|--------|-------------|
| `reset()` | Clears the board and calls `build()` to reinitialize |

</details>

### `FilledBoard` — `game_pieces/boards/filledBoard.js`
<details>
<summary>Show details</summary>

> ⚠️ **Work in progress** — several methods are stubbed out and not yet implemented.

Extends `Board`. Represents a 2D grid board where every cell is a `FilledSpace`. Suited for games like chess, checkers, or Find My Hat where pieces occupy a full grid.

| Method | Description |
|--------|-------------|
| `build()` | Constructs the 2D grid of `FilledSpace` instances based on `dimensions` |
| `getSpace(x, y)` | _(not yet implemented)_ Returns the space at coordinates `(x, y)` |
| `isValidPosition(x, y)` | _(not yet implemented)_ Returns whether `(x, y)` is within the board bounds |
| `getNeighbors(x, y)` | _(not yet implemented)_ Returns neighboring spaces of `(x, y)` |
| `getOccupied()` | Returns all spaces that are not empty |
| `findPiece(piece)` | _(not yet implemented)_ Returns the space containing the given piece |
| `display()` | Prints the board to the console as a grid |

</details>

### `PerimeterBoard` — `game_pieces/boards/perimeterBoard.js`
<details>
<summary>Show details</summary>

Extends `Board`. Represents a board where spaces run along the perimeter of a rectangle, stored as a flat array. Suited for games like Mancala where pieces travel around the edge of the board.

| Property | Description |
|----------|-------------|
| `config` | Array of space config objects used to name and type each space |
| `cyclical` | If `true`, the board wraps around — the last space neighbors the first |

| Method | Description |
|--------|-------------|
| `build()` | Constructs the perimeter as a flat array of `PerimeterSpace` instances |
| `configSpaces(configDetails)` | Assigns `name`, `type`, and `owner` to each space from the config array |
| `calculatePerimeter()` | Returns the number of spaces: `(2x + 2y - 4)` |
| `getSpace(index)` | Returns the space at the given index, throws if out of bounds |
| `isValidPosition(index)` | Returns whether the index is within the board bounds |
| `getNeighbors(index)` | Returns `{ next, previous }` spaces — wraps around if `cyclical` is `true` |
| `getOccupied()` | Returns all spaces that are not empty |
| `findPiece(piece)` | Returns all spaces containing the given piece |
| `display()` | Prints the board to the console as a perimeter layout |

Constructor:
```js
new PerimeterBoard(dimensions, config, cyclical);
// dimensions: { x, y }
// config: array of { name, type, owner } objects — length must match perimeter size
// cyclical: boolean (default false)
```

</details>

---

## 🟦 Space Classes

### `Space` — `game_pieces/boards/spaces/space.js`
<details>
<summary>Show details</summary>

Base class for all space types. Extended by `FilledSpace` and `PerimeterSpace`.

| Property | Description |
|----------|-------------|
| `name` | Display name of the space |
| `type` | The space's type (e.g. `'cup'`, `'store'`) |
| `owner` | The player who owns the space, or `null` |
| `events` | A `Map` of event listeners attached to this space |
| `pieces` | Array of pieces currently occupying the space |

| Method | Description |
|--------|-------------|
| `on(eventName, fn)` | Attaches an event listener to the space |
| `trigger(eventName, data)` | Fires the event listener for the given event, passing `data` and the space itself |
| `addToSpace(piece)` | Adds a piece to the space |
| `removeFromSpace(piece)` | Removes a specific piece from the space |
| `isEmpty()` | Returns `true` if no pieces are on the space |
| `count()` | Returns the number of pieces on the space |
| `display()` | Returns a formatted string — `[name]` if named, `[ ]` if not |

</details>

### `FilledSpace` — `game_pieces/boards/spaces/filledSpace.js`
<details>
<summary>Show details</summary>

> ⚠️ **Work in progress** — not yet complete.

Extends `Space`. Represents a single cell in a 2D grid board, identified by `x` and `y` coordinates.

| Property | Description |
|----------|-------------|
| `x` | The horizontal coordinate of the space |
| `y` | The vertical coordinate of the space |

</details>

### `PerimeterSpace` — `game_pieces/boards/spaces/perimeterSpace.js`
<details>
<summary>Show details</summary>

Extends `Space`. Represents a single space on a perimeter board, identified by its position in the flat array.

| Property | Description |
|----------|-------------|
| `index` | The position of the space in the board array |

</details>

---

## 🧩 Piece Classes

### `Piece` — `game_pieces/pieces/piece.js`
<details>
<summary>Show details</summary>

Represents a single game piece that can be placed on a board space.

| Property | Description |
|----------|-------------|
| `name` | Display name of the piece |
| `type` | The piece's type (e.g. `'stone'`, `'pawn'`) |
| `owner` | The player who owns the piece |

</details>

---

## 👤 Player Classes

### `BoardPlayer` — `game_pieces/players/boardPlayer.js`
<details>
<summary>Show details</summary>

Represents a player in a board game.

| Property | Description |
|----------|-------------|
| `name` | Player's name, auto-generated as `Player1`, `Player2`, etc. based on constructor number |
| `pieces` | Array of pieces currently held by the player |
| `score` | Player's current score |

| Method | Description |
|--------|-------------|
| `pickUpPiece(piece)` | Adds a piece to the player's held pieces |
| `placePiece(piece)` | Removes a piece from the player's held pieces |
| `updateScore(update)` | Adds `update` to the player's score |

Constructor:
```js
new BoardPlayer(1); // name: 'Player1'
new BoardPlayer(2); // name: 'Player2'
```

</details>

### `CardPlayer` — `game_pieces/players/cardPlayer.js`
<details>
<summary>Show details</summary>

Represents a player in a card game.

| Property | Description |
|----------|-------------|
| `name` | Player's name or identifier |
| `hand` | Array of Card instances in the player's hand |
| `score` | Player's current score |

| Method | Description |
|--------|-------------|
| `takeCard(card)` | Adds a card to the player's hand |
| `playCard(card)` | Removes a card from the player's hand |
| `displayHand()` | Returns a formatted string of the player's hand |

</details>

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `@inquirer/prompts` | Console input — selections, confirmations, text input |
| `prompt-sync` | Synchronous console input — used in Find My Hat |
| `vitest` | Unit testing framework |

---

## 🔮 Future Plans

- Dynamic UI frontend using the existing game logic
- Computer player AI for single player games
- Multiplayer support
- Score tracking across sessions
