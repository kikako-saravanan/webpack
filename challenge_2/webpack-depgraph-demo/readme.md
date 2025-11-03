# 🧩 Challenge 2: Dependency Graph Visualization

This project demonstrates **how Webpack builds and represents a dependency graph** for a React application.  
You’ll manually draw the graph, then confirm your results using Webpack’s `--stats` output and a **Graphviz-rendered visualization**.

---

## 🎯 Objective

1. Understand how Webpack analyzes and connects modules into a **dependency graph**.
2. Verify your mental model by comparing it to Webpack’s **actual dependency graph**.
3. Learn how to visualize this graph programmatically using **Graphviz**.

---

## 🧠 Concept Overview

Every Webpack build starts from an **entry point** (like `src/index.js`) and recursively follows every `import` it finds — JavaScript, JSX, images, CSS, etc.  

It constructs a **directed graph** where:
- Each **node** = a file (module or asset)
- Each **edge** = an import relationship

Example manual graph for this challenge:

```

index.js
|
v
App.jsx
/   
v     v
Header  Footer
|       |
v       v
logo.png utils.js

```

---

## 🧱 Project Structure

```

webpack-depgraph-demo/
│
├── src/
│   ├── index.js        # Entry file
│   ├── App.jsx         # Imports Header & Footer
│   ├── Header.jsx      # Imports logo.png
│   ├── Footer.jsx      # Imports utils.js
│   ├── utils.js        # Helper function
│   ├── logo.png        # Asset
│   └── index.html      # HTML template
│
├── webpack.config.js   # Webpack setup (JSX + asset modules)
├── gen-dot.js          # Converts Webpack stats to Graphviz DOT
├── package.json
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies
```bash
npm install
````

### 2️⃣ Build the React app

```bash
npm run build
```

This will bundle your app into the `dist/` directory.

### 3️⃣ Generate Webpack stats

```bash
npm run stats
```

This command runs Webpack with:

```bash
webpack --profile --json > stats.json
```

Result:

* A new file `stats.json` containing the entire dependency graph metadata.

### 4️⃣ Generate Graphviz DOT file

```bash
npm run gen-dot
```

This converts `stats.json` → `stats-deps.dot`.

Example excerpt:

```
digraph deps {
  rankdir=TB;
  node [shape=box, style=filled, fillcolor="#f7fbff"];
  "./src/index.js" -> "./src/App.jsx";
  "./src/App.jsx" -> "./src/Header.jsx";
  "./src/App.jsx" -> "./src/Footer.jsx";
  "./src/Header.jsx" -> "./src/logo.png";
  "./src/Footer.jsx" -> "./src/utils.js";
}
```

### 5️⃣ Render the dependency graph

Ensure you have **Graphviz** installed.

#### macOS

```bash
brew install graphviz
```

#### Ubuntu / Debian

```bash
sudo apt install graphviz -y
```

#### Windows

Download from: [https://graphviz.org/download](https://graphviz.org/download)
➡ During installation, **check “Add Graphviz to system PATH”**.

Then run:

```bash
npm run render-dot
```

✅ Output: `stats-deps.png` — a visual dependency graph.

---

## 🧩 Expected Output

**`stats-deps.png`** should show a flow like:

```
index.js → App.jsx → Header.jsx → logo.png
             ↘︎
              Footer.jsx → utils.js
```

Each file in `src/` appears as a node, with assets (like `logo.png`) also represented.

---

## 🧠 How It Works

| Step | Action                                                           | Result                    |
| ---- | ---------------------------------------------------------------- | ------------------------- |
| 1    | Webpack starts from `entry: './src/index.js'`                    | Begins graph traversal    |
| 2    | Webpack detects all `import` statements                          | Builds node relationships |
| 3    | Every imported file becomes a node in `__webpack_modules__`      | Graph expands             |
| 4    | The `--json` output records these relationships in `stats.json`  | Machine-readable graph    |
| 5    | `gen-dot.js` script parses the graph data and outputs a DOT file | Graphviz-compatible       |
| 6    | Graphviz renders the `.dot` file into a PNG or SVG               | Visual graph confirmed    |

---

## 🧩 Key Files Explained

### `gen-dot.js`

Converts `stats.json` into a DOT graph format that Graphviz can render.

### `webpack.config.js`

Handles:

* JSX via `babel-loader`
* Images via `asset/resource`
* HTML template via `HtmlWebpackPlugin`

### `stats.json`

Contains detailed module metadata, reasons (who imported what), chunk info, and build stats.

---

## 🧭 Optional Enhancements

* 🎨 **Color code** nodes:

  * Blue: React components (`.jsx`)
  * Green: JS utilities
  * Pink: Assets (`.png`, `.svg`)
* 🧩 **Highlight the entrypoint** node (`index.js`)
* 🔄 **Show multiple chunks** if using dynamic imports

To do this, modify `gen-dot.js` to assign colors or shapes based on file extensions.

---

## 🧠 Learning Outcomes

By completing this challenge, you’ll:

✅ Understand **Webpack’s internal module graph**

✅ Learn how assets are treated as graph nodes

✅ Gain insight into **how Webpack resolves dependencies recursively**

✅ Be able to **visualize and analyze build graphs** for larger apps

---

## 🏁 Next Challenge

Proceed to **Challenge 3: Mode Comparison**
Learn how different Webpack modes (`development` vs `production`) affect:

* Bundle size
* Readability
* Optimization
* Build time

---

**Happy Investigating 🔍 — you just visualized your first Webpack dependency graph!**


