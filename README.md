# Addition Game - Mathematical Trick

## Overview

The Addition Game is an interactive web application that demonstrates a fascinating mathematical trick. The game presents a seemingly magical ability to predict the final answer after only the first row of digits is entered.

## How to Play

1. Enter 5 single digits (0-9) in the first row
2. Enter 5 digits in the second row
3. The system will generate the third row automatically
4. Enter 5 digits in the fourth row
5. The system will generate the fifth row automatically
6. The answer displayed at the bottom is calculated immediately after you enter the first row!

## The Mathematical Trick

The trick works through a clever mathematical principle:

- The answer is calculated immediately after you enter the first row
- To get the answer:
  - Take the digits from the first row as is
  - Subtract 2 from the rightmost digit
  - Add a new digit "2" at the leftmost position

- For system-generated rows (rows 3 and 5):
  - Each digit + the corresponding digit in the previous row must sum to 9

## Features

- Interactive digit input with automatic focus navigation
- Dynamic mathematical background animation
- Responsive design that works on all devices
- Attractive UI with visual feedback
- Instructions modal to explain the game
- Reset functionality to start a new game

## Technologies Used

- HTML5
- CSS3 (with animations and transitions)
- JavaScript (ES6+)
- Font Awesome icons

## Installation

No installation required! Simply open the `index.html` file in any modern web browser to start playing.

```bash
# If you have Python installed, you can run a simple server:
python -m http.server

# Then open your browser and navigate to:
# http://localhost:8000
```

## Development

The project structure is simple:

- `index.html` - The main HTML structure
- `styles.css` - All styling and animations
- `script.js` - Game logic and interactivity

## Future Enhancements

Potential future improvements:
- Add sound effects for a more immersive experience
- Implement difficulty levels with different number of digits
- Create a timer mode for added challenge
- Add more mathematical tricks and games

## Contact

Feel free to connect with me on LinkedIn if you have any questions or suggestions:
- [LinkedIn Profile](https://www.linkedin.com/in/himanshurawat12)

---

Created with ❤️ | Mathematical Trick Game
