# 🔍 Webpack Module Investigation Challenge

A hands-on exploration of how **Webpack** transforms modular JavaScript code into a single bundled file.  
This project helps you understand **Webpack internals** — including how it handles imports, module caching, and the runtime functions `__webpack_modules__` and `__webpack_require__`.

---

## 🎯 Objective

To build a simple Webpack project with **three interdependent JavaScript files**, bundle them, and then **inspect the generated output** to understand:

- How Webpack wraps and registers modules
- How `import` and `export` are compiled
- The purpose of `__webpack_require__`, `__webpack_modules__`, and the module cache

---

## 🧱 Project Structure

```

webpack-module-investigation/
│
├── src/
│   ├── index.js
│   ├── math.js
│   └── util.js
│
├── dist/
│   └── bundle.js           # Generated output after build
│
├── webpack.config.js
├── package.json
└── README.md

````

---

## ⚙️ Setup Instructions

### 1. Initialize the Project

```bash
mkdir webpack-module-investigation
cd webpack-module-investigation
npm init -y
````

### 2. Install Webpack

```bash
npm install webpack webpack-cli --save-dev
```

### 3. Create Source Files

**src/util.js**

```js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

**src/math.js**

```js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

**src/index.js**

```js
import { greet } from './util.js';
import { add, multiply } from './math.js';

console.log(greet('Webpack Investigator'));
console.log('2 + 3 =', add(2, 3));
console.log('2 * 3 =', multiply(2, 3));
```

---

## 🔧 Webpack Configuration

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  mode: 'development',   // readable output
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: false,        // disable source maps for clean inspection
};
```

Add a build script to **package.json**:

```json
"scripts": {
  "build": "webpack"
}
```

---

## 🚀 Build and Inspect

Run Webpack:

```bash
npm run build
```

After the build, open the generated file:

```
dist/bundle.js
```

---

## 🔍 What to Look For

In the bundle, search for these key runtime constructs:

| Symbol                     | Meaning                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `__webpack_modules__`      | An object containing all modules (your files), each stored as a function keyed by its path. |
| `__webpack_require__`      | Webpack’s internal implementation of `require()` to execute and cache modules.              |
| `__webpack_module_cache__` | Stores modules after their first execution to avoid re-running them.                        |
| `__webpack_require__.r`    | Marks a module as an ES module (`__esModule: true`).                                        |
| `__webpack_require__.d`    | Defines getters for exports (used for `import { ... } from ...`).                           |

You’ll see your **original source code** wrapped in functions like this:

```js
"./src/math.js": ((module, __webpack_exports__, __webpack_require__) => {
  __webpack_require__.r(__webpack_exports__);
  __webpack_require__.d(__webpack_exports__, {
    "add": () => (add),
    "multiply": () => (multiply)
  });

  function add(a, b) {
    return a + b;
  }

  function multiply(a, b) {
    return a * b;
  }
})
```

---

## 🧠 How It Works

1. **All modules** are stored in the `__webpack_modules__` object.
2. When your entry file (`index.js`) runs, Webpack calls `__webpack_require__("./src/index.js")`.
3. Each module is executed only once and then cached inside `__webpack_module_cache__`.
4. Webpack rewrites your `import`/`export` statements into calls to its runtime functions (`__webpack_require__.r`, `.d`, etc.).
5. The final bundle is a **self-executing function** that bootstraps your app.

---

## 🧩 Optional Experiments

### 🔹 1. Switch to CommonJS

Change `index.js` to use CommonJS:

```js
const { greet } = require('./util.js');
const { add, multiply } = require('./math.js');
```

Run `npm run build` again — notice how Webpack changes the wrapping functions for compatibility.

---

### 🔹 2. Inspect Bundle Size and Structure

Run:

```bash
npx webpack --profile --json > stats.json
```

Then visualize using [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer):

```bash
npx webpack-bundle-analyzer stats.json
```

---

## 🧩 Key Takeaways

✅ Webpack transforms ES modules into its own **runtime-managed system**.
✅ `__webpack_require__` and `__webpack_modules__` are the backbone of the Webpack runtime.
✅ You can manually explore how each source file becomes part of a single executable script.
✅ Understanding this mechanism is critical before learning about **loaders**, **plugins**, and **Module Federation**.

---

## 🧠 Challenge Extension

Try creating a **custom Webpack loader or plugin** that logs something during compilation (e.g., a `BannerPlugin` or a custom loader).
Then inspect how Webpack injects or modifies output.

---

## 🧩 Credits

Inspired by the official [Webpack documentation](https://webpack.js.org/) and designed for developers mastering **Webpack internals** before diving into advanced topics like **Module Federation** and **optimization**.

---

**Happy Bundling 🔧 — Investigate, Learn, and Master Webpack!**

