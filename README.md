# CAL — Sunset glass calculator

A responsive calculator with sunset-orange gradients, frosted glass, and tactile 3D keys. Plain HTML, CSS, and JavaScript: no dependencies or build step.

## Run

Open `index.html` in a browser, or serve the folder with `python3 -m http.server 8080` and visit http://localhost:8080.

## Features

- Addition, subtraction, multiplication, division with standard operator precedence
- Decimals, sign toggle, percentage, clear, and backspace
- Live result preview and divide-by-zero errors
- Keyboard: digits, `+ - * /`, `.`, `%`, Enter/`=`, Escape/Delete, Backspace
- Mobile layout, visible focus, screen-reader labels, reduced-motion support
- Arithmetic engine without `eval`; results rounded to 12 significant digits

Percentage converts the current number to a fraction (`50%` becomes `0.5`), not a contextual business-calculator percentage. Equals does not repeat the last operation. A digit after equals starts a new calculation; an operator continues with the answer. Use the +/− button to enter negative operands. Input is limited to 12 digits per operand.

## Test

`node --test calculator.test.js`

## Publish with GitHub Pages

After merging the feature PR, in repository **Settings → Pages**, choose **Deploy from a branch**, then `main` and `/ (root)` and save. Deployment is not enabled automatically.

## Files

- `index.html`: semantic interface
- `styles.css`: sunset glass theme and responsive layouts
- `calculator.js`: standalone arithmetic engine
- `app.js`: interactions and keyboard controls
- `calculator.test.js`: engine regression tests
