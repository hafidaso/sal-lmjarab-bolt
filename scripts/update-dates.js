#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results = results.concat(findFiles(filePath, extensions));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Function to generate current date strings
function getCurrentDateStrings() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
  const currentDay = String(now.getDate()).padStart(2, '0');
  
  return {
    currentYear,
    currentDate: `${currentYear}-${currentMonth}-${currentDay}`,
    currentDateTime: now.toISOString(),
    recentDates: {
      '1': new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '2': new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '3': new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '5': new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '7': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '10': new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '12': new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '13': new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '14': new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '15': new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '18': new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '20': new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '25': new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '30': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '31': new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '32': new Date(now.getTime() - 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '34': new Date(now.getTime() - 34 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '45': new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      '60': new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }
  };
}

// Function to update dates in a file
function updateDatesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const dates = getCurrentDateStrings();
    
    // Replace hardcoded 2024 dates with current dates
    const replacements = [
      // Replace '2024-01-15' with recent date
      { from: /'2024-01-15'/g, to: `'${dates.recentDates['15']}'` },
      { from: /"2024-01-15"/g, to: `"${dates.recentDates['15']}"` },
      
      // Replace '2024-01-10' with recent date
      { from: /'2024-01-10'/g, to: `'${dates.recentDates['10']}'` },
      { from: /"2024-01-10"/g, to: `"${dates.recentDates['10']}"` },
      
      // Replace '2024-01-08' with recent date
      { from: /'2024-01-08'/g, to: `'${dates.recentDates['7']}'` },
      { from: /"2024-01-08"/g, to: `"${dates.recentDates['7']}"` },
      
      // Replace '2024-01-05' with recent date
      { from: /'2024-01-05'/g, to: `'${dates.recentDates['5']}'` },
      { from: /"2024-01-05"/g, to: `"${dates.recentDates['5']}"` },
      
      // Replace '2024-01-03' with recent date
      { from: /'2024-01-03'/g, to: `'${dates.recentDates['3']}'` },
      { from: /"2024-01-03"/g, to: `"${dates.recentDates['3']}"` },
      
      // Replace '2024-01-01' with recent date
      { from: /'2024-01-01'/g, to: `'${dates.recentDates['1']}'` },
      { from: /"2024-01-01"/g, to: `"${dates.recentDates['1']}"` },
      
      // Replace '2024-01-20' with recent date
      { from: /'2024-01-20'/g, to: `'${dates.recentDates['20']}'` },
      { from: /"2024-01-20"/g, to: `"${dates.recentDates['20']}"` },
      
      // Replace '2024-01-12' with recent date
      { from: /'2024-01-12'/g, to: `'${dates.recentDates['12']}'` },
      { from: /"2024-01-12"/g, to: `"${dates.recentDates['12']}"` },
      
      // Replace '2024-01-14' with recent date
      { from: /'2024-01-14'/g, to: `'${dates.recentDates['14']}'` },
      { from: /"2024-01-14"/g, to: `"${dates.recentDates['14']}"` },
      
      // Replace '2024-01-13' with recent date
      { from: /'2024-01-13'/g, to: `'${dates.recentDates['13']}'` },
      { from: /"2024-01-13"/g, to: `"${dates.recentDates['13']}"` },
      
      // Replace '2024-01-18' with recent date
      { from: /'2024-01-18'/g, to: `'${dates.recentDates['18']}'` },
      { from: /"2024-01-18"/g, to: `"${dates.recentDates['18']}"` },
      
      // Replace '2024-07-01' with recent date
      { from: /'2024-07-01'/g, to: `'${dates.recentDates['30']}'` },
      { from: /"2024-07-01"/g, to: `"${dates.recentDates['30']}"` },
      
      // Replace '2024-07-02' with recent date
      { from: /'2024-07-02'/g, to: `'${dates.recentDates['31']}'` },
      { from: /"2024-07-02"/g, to: `"${dates.recentDates['31']}"` },
      
      // Replace '2024-07-05' with recent date
      { from: /'2024-07-05'/g, to: `'${dates.recentDates['34']}'` },
      { from: /"2024-07-05"/g, to: `"${dates.recentDates['34']}"` },
      
      // Replace '2024-07-03' with recent date
      { from: /'2024-07-03'/g, to: `'${dates.recentDates['32']}'` },
      { from: /"2024-07-03"/g, to: `"${dates.recentDates['32']}"` },
      
      // Replace '2024-12-31' with future date
      { from: /'2024-12-31'/g, to: `'${dates.currentYear}-12-31'` },
      { from: /"2024-12-31"/g, to: `"${dates.currentYear}-12-31"` },
      
      // Replace '2024-02-15' with recent date
      { from: /'2024-02-15'/g, to: `'${dates.recentDates['45']}'` },
      { from: /"2024-02-15"/g, to: `"${dates.recentDates['45']}"` },
      
      // Replace '2024-11-10' with recent date
      { from: /'2024-11-10'/g, to: `'${dates.recentDates['60']}'` },
      { from: /"2024-11-10"/g, to: `"${dates.recentDates['60']}"` },
      
      // Replace '2023-12-15' with recent date
      { from: /'2023-12-15'/g, to: `'${dates.recentDates['25']}'` },
      { from: /"2023-12-15"/g, to: `"${dates.recentDates['25']}"` },
      
      // Replace '2023-11-10' with recent date
      { from: /'2023-11-10'/g, to: `'${dates.recentDates['45']}'` },
      { from: /"2023-11-10"/g, to: `"${dates.recentDates['45']}"` },
      
      // Replace '2024' in context of dates with current year
      { from: /(\b)2024(\b)/g, to: `$1${dates.currentYear}$2` },
    ];
    
    replacements.forEach(replacement => {
      content = content.replace(replacement.from, replacement.to);
    });
    
    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated dates in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
function main() {
  console.log('🔄 Updating hardcoded dates to current dates...\n');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const files = findFiles(srcDir);
  
  let updatedCount = 0;
  let totalFiles = files.length;
  
  files.forEach(file => {
    if (updateDatesInFile(file)) {
      updatedCount++;
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files updated: ${updatedCount}`);
  console.log(`   Files unchanged: ${totalFiles - updatedCount}`);
  
  if (updatedCount > 0) {
    console.log('\n✅ Date update completed successfully!');
  } else {
    console.log('\nℹ️  No files needed updating.');
  }
}

// Run the script
main(); 