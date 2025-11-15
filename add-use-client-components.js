#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all component files
const componentFiles = glob.sync('src/components/**/*.{jsx,js}', { 
  ignore: ['node_modules/**'],
  cwd: process.cwd() 
});

console.log(`Scanning ${componentFiles.length} component files for hooks...`);

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

componentFiles.forEach((file) => {
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

console.log(`\n✅ Updated ${filesUpdated} component files with "use client"!`);
