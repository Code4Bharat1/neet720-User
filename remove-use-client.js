#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all page.jsx files in src/app
const pageFiles = glob.sync('src/app/**/page.jsx', { 
  ignore: ['node_modules/**'],
  cwd: process.cwd() 
});

console.log(`Found ${pageFiles.length} page files to process`);

pageFiles.forEach((file) => {
  const fullPath = path.join(process.cwd(), file);
  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;
  
  // Remove "use client"; line (with optional whitespace)
  content = content.replace(/^["']use client["'];?\s*\n/m, '');
  
  // Also handle case where it's on its own line without leading newline
  if (content.startsWith('"use client"')) {
    content = content.replace(/^["']use client["'];?\s*/m, '');
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Removed "use client" from ${file}`);
  }
});

console.log('\n✅ All "use client" directives removed from pages!');
