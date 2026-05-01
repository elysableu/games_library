# 🃏 JavaScript Games Library

A console-based JavaScript game library built with reusable, modular game logic. Designed with a future dynamic UI in mind — the core game logic is intentionally decoupled from the interface so it can be wired up to a frontend without rewriting the game rules.

---

## 🎮 Games Included

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
- All players are currently human — computer player logic is stubbed out but not yet implemented. PvP and computer vs. player modes need to be separated into distinct flows
- Console UI needs refinement — discard and stock pile display, hand formatting, and turn messaging could all be cleaner and more readable
- Minor issues with drawing cards and retaining them from turn to turn

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
- War
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
│   └── cards/
│       └── standard_52/
│           ├── deck.js
│           └── card.js
│   └── players/
│       └── cardPlayer.js
├── crazy_eights/
│   └── main.js
└── find_my_hat_cc/
    └── main.js
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
| `Shuffle.faroShuffle(arr)` | Perfect Faro shuffle — interleaves two halves |
| `Shuffle.riffleShuffle(arr)` | Riffle shuffle — mimics a human shuffle |

</details>

---

## 🃏 Game Piece Classes

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

---

## 🔮 Future Plans

- Dynamic UI frontend using the existing game logic
- Computer player AI for single player games
- Multiplayer support
- Score tracking across sessions