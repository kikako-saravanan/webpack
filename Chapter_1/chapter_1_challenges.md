# 🧪 Webpack Hands-On Challenges

A collection of practical, concept-reinforcing exercises designed to help you deeply understand how **Webpack** works under the hood.  
Each challenge focuses on a different aspect — from bundling internals to dependency graphs, build modes, and performance optimization.

---

## ⚙️ Challenge 1: Module Investigation

**🧩 Problem:**  
Create a simple Webpack project with **3 JavaScript files** that import from each other.  
Run Webpack and examine the **output bundle**.  
Identify where your code appears in the bundle and how Webpack transforms the imports.

**💡 Hint:**  
Use the following Webpack configuration settings for maximum readability:
```js
mode: 'development'
devtool: false
````

Then, open the bundle and look for:

* `__webpack_modules__`
* `__webpack_require__`

These show how Webpack registers and executes modules internally.

---

## 🧩 Challenge 2: Dependency Graph Visualization

**🧩 Problem:**
Given the following **React project structure**, draw the dependency graph **by hand** before running Webpack.

```
src/
  index.js       (imports App)
  App.jsx        (imports Header, Footer)
  Header.jsx     (imports logo.png)
  Footer.jsx     (imports utils.js)
  utils.js
```

Then verify that your graph matches what Webpack generates using the `--stats` flag.

**💡 Hint:**

* Start from the entry point `index.js` and follow each `import`.
* Remember: assets like `logo.png` are also **nodes** in the dependency graph.

---

## ⚙️ Challenge 3: Mode Comparison

**🧩 Problem:**
Build the same React application twice:

1. With `mode: 'development'`
2. With `mode: 'production'`

Then compare:

| Metric                     | Development | Production |
| -------------------------- | ----------- | ---------- |
| Bundle size                |             |            |
| Build time                 |             |            |
| Output readability         |             |            |
| Number of files in `dist/` |             |            |

**💡 Hint:**
Run:

```bash
webpack --mode=development
webpack --mode=production
```

Then inspect the `dist/` folder and measure file sizes:

```bash
ls -lh dist/
```

Document your observations and differences.

---

## ⚙️ Challenge 4: Without Webpack

**🧩 Problem:**
Take a **simple React component** that imports both **CSS** and an **image**, and try to make it run **in a browser without Webpack** — only using:

* Native `<script type="module">` tags
* Plain ES module imports

Document **every challenge** you encounter.

**💡 Hint:**
You’ll likely face issues with:

* JSX syntax (browser can’t parse it)
* CSS imports (not supported natively in JS)
* Image imports (URL resolution)
* Using npm packages (module resolution issues)

This exercise illustrates *why Webpack and bundlers exist*.

---

## ⚙️ Challenge 5: Performance Audit

**🧩 Problem:**
Create a React app that imports a **large library** (e.g., `lodash` or `moment`).
Then analyze the resulting bundle.

Answer these questions:

1. Is the **entire library** bundled, even if you use only one function?
2. How can you **reduce bundle size**?
3. What’s the difference between:

   ```js
   import _ from 'lodash';
   // vs
   import debounce from 'lodash/debounce';
   ```

**💡 Hint:**

* Use the [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) plugin to visualize what’s included.
* Research **tree-shaking** and how Webpack removes unused code.
* Check your build output and measure the bundle size difference.

---

### 🏁 Completion Goal

By completing these 5 challenges, you will:

* Understand Webpack’s **module system** and runtime (`__webpack_require__`)
* Visualize the **dependency graph**
* See how **modes affect** optimization and output
* Appreciate why **bundlers are needed**
* Learn how to **analyze and optimize bundle size**

```

---


