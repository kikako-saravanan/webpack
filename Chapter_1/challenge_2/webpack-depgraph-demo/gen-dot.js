// This small Node script converts stats.json module reasons into a DOT graph.
// gen-dot.js (fixed)
const fs = require('fs');

const statsFile = './stats.json';
if (!fs.existsSync(statsFile)) {
  console.error('stats.json not found. Run `npm run stats` first.');
  process.exit(1);
}

const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
const modules = stats.modules || [];

const nodes = new Set();
const edges = [];

function normalizeName(m) {
  // Prefer readable fields
  return m.name || m.moduleName || m.identifier || (m.resource && m.resource) || String(m);
}

modules.forEach(m => {
  const name = normalizeName(m);
  nodes.add(name);
  (m.reasons || []).forEach(r => {
    const from = r.moduleName || r.module;
    if (from) {
      nodes.add(from);
      edges.push({ from, to: name, type: r.type || r.explanation || '' });
    }
  });
});

// Utility to safely quote node names
const safe = n => `"${String(n).replace(/"/g, '\\"')}"`;

// --- Correct DOT format (real newlines) ---
let dot = 'digraph deps {\n';
dot += '  rankdir=TB;\n';
dot += '  node [shape=box, style=filled, fillcolor="#f7fbff"];\n';

nodes.forEach(n => {
  dot += `  ${safe(n)};\n`;
});

edges.forEach(e => {
  dot += `  ${safe(e.from)} -> ${safe(e.to)};\n`;
});

dot += '}\n';

fs.writeFileSync('stats-deps.dot', dot, 'utf8');
console.log('✅ Wrote stats-deps.dot successfully.');
console.log('👉 Render it using: dot -Tpng stats-deps.dot -o stats-deps.png');

