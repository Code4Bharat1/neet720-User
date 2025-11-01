const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'public', 'collegeData.js');
const text = fs.readFileSync(filePath, 'utf8');

const search = 'const collegeData =';
const idx = text.indexOf(search);
if (idx === -1) {
  console.error('Could not find "const collegeData =" in file');
  process.exit(1);
}

// find first '[' after the assignment
const startBracket = text.indexOf('[', idx);
if (startBracket === -1) {
  console.error('Could not find opening [ for the array');
  process.exit(1);
}

// find matching closing bracket using a simple stack
let i = startBracket;
let depth = 0;
let endBracket = -1;
for (; i < text.length; i++) {
  const ch = text[i];
  if (ch === '[') depth++;
  else if (ch === ']') {
    depth--;
    if (depth === 0) {
      endBracket = i;
      break;
    }
  }
}
if (endBracket === -1) {
  console.error('Could not find matching closing ] for the array');
  process.exit(1);
}

const arrayText = text.slice(startBracket, endBracket + 1);

let arr;
try {
  // Evaluate the array text safely using Function
  arr = Function('return ' + arrayText)();
  if (!Array.isArray(arr)) throw new Error('Parsed value is not an array');
} catch (err) {
  console.error('Failed to parse array from file:', err);
  process.exit(1);
}

function toUniform(obj) {
  // get name
  const collegeName = obj.collegeName || obj.name || obj.college || obj.college_name || '';
  const state = obj.state || null;
  const type = obj.type || null;
  const category = obj.category || 'General';
  const year = obj.year || 2024;
  let minAIR = null;
  let maxAIR = null;

  // derive min/max from known fields
  if (Array.isArray(obj.rankCutoff) && obj.rankCutoff.length >= 1) {
    minAIR = obj.rankCutoff[0] != null ? Number(obj.rankCutoff[0]) : null;
    maxAIR = obj.rankCutoff[1] != null ? Number(obj.rankCutoff[1]) : (obj.rankCutoff[0] != null ? Number(obj.rankCutoff[0]) : null);
  } else if (typeof obj.rankCutoff === 'number') {
    minAIR = obj.rankCutoff;
    maxAIR = obj.rankCutoff;
  } else if (obj.minAIR != null || obj.maxAIR != null) {
    minAIR = obj.minAIR != null ? Number(obj.minAIR) : null;
    maxAIR = obj.maxAIR != null ? Number(obj.maxAIR) : null;
  } else if (obj.intake != null && obj.intake < 1000 && obj.intake > 0 && obj.rankCutoff == null) {
    // nothing to do
  }

  const closingScore = (obj.closingScore !== undefined) ? obj.closingScore : null;

  return {
    collegeName: String(collegeName).trim(),
    state,
    type,
    category,
    minAIR: (minAIR === undefined) ? null : (minAIR === null ? null : Number(minAIR)),
    maxAIR: (maxAIR === undefined) ? null : (maxAIR === null ? null : Number(maxAIR)),
    closingScore: (closingScore === undefined) ? null : closingScore,
    year
  };
}

const transformed = arr.map(toUniform);

// prepare JS file content
const out = `// Formatted college data (uniform objects)\nconst collegeData = ${JSON.stringify(transformed, null, 2)};\n\nexport default collegeData;\n`;

fs.writeFileSync(filePath, out, 'utf8');
console.log('Wrote formatted collegeData to', filePath);
