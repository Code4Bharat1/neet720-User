#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all page.jsx files in src/app
const pageFiles = glob.sync('src/app/**/page.jsx', { 
  ignore: ['node_modules/**'],
  cwd: process.cwd() 
});

console.log(`Scanning ${pageFiles.length} page files for hooks...`);

const hookPatterns = [
  /useState/,
  /useEffect/,
  /useRef/,
  /useContext/,
  /useCallback/,
  /useReducer/,
  /useLayoutEffect/,
  /useRouter/,
  /usePathname/,
  /useSearchParams/,
];

let filesUpdated = 0;

pageFiles.forEach((file) => {
  const fullPath = path.join(process.cwd(), file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if file uses any hooks
  const usesHooks = hookPatterns.some(pattern => pattern.test(content));
  
  // Check if file already has "use client"
  const hasUseClient = content.startsWith('"use client";') || content.startsWith("'use client';");
  
  if (usesHooks && !hasUseClient) {
    // Add "use client"; at the very beginning
    content = '"use client";\n' + content;
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Added "use client" to ${file}`);
    filesUpdated++;
  }
});

console.log(`\n✅ Updated ${filesUpdated} files with "use client"!`);
