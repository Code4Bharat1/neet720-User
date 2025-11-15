#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all page.jsx files that have both "use client" and "export const metadata"
const pageFiles = glob.sync('src/app/**/page.jsx', { 
  ignore: ['node_modules/**'],
  cwd: process.cwd() 
});

console.log(`Scanning ${pageFiles.length} page files for metadata...`);

let filesProcessed = 0;

pageFiles.forEach((file) => {
  const fullPath = path.join(process.cwd(), file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if file has "use client" and "export const metadata"
  const hasUseClient = content.startsWith('"use client";');
  const hasMetadata = content.includes('export const metadata');
  
  if (hasUseClient && hasMetadata) {
    // Extract metadata block
    const metadataMatch = content.match(/export const metadata = \{[\s\S]*?\};\n/);
    
    if (metadataMatch) {
      const metadataBlock = metadataMatch[0];
      const pageDir = path.dirname(file);
      const layoutPath = path.join(pageDir, 'layout.jsx');
      const layoutFullPath = path.join(process.cwd(), layoutPath);
      
      // Create layout.jsx with metadata
      const layoutContent = metadataBlock + '\nexport default function Layout({ children }) {\n  return <>{children}</>;\n}';
      
      fs.writeFileSync(layoutFullPath, layoutContent, 'utf8');
      console.log(`✓ Created ${layoutPath} with metadata`);
      
      // Remove metadata from page
      const newPageContent = content.replace(metadataBlock, '');
      fs.writeFileSync(fullPath, newPageContent, 'utf8');
      console.log(`✓ Removed metadata from ${file}`);
      
      filesProcessed++;
    }
  }
});

console.log(`\n✅ Processed ${filesProcessed} files! Metadata moved to layouts.`);
