// Verification script for StackBlitz setup
console.log('🔍 Verifying FinchesEye Animation Library StackBlitz Setup...');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'angular.json',
  'src/index.html',
  'src/main.ts',
  'src/app.module.ts',
  'src/app.component.ts',
  'demo-ui/app.js',
  'demo-ui/styles.css',
  'dist/index.umd.js',
  'stackblitz.json'
];

const fs = require('fs');
const path = require('path');

let allFilesExist = true;

console.log('\n📁 Checking required files:');
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json dependencies
console.log('\n📦 Checking package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`✅ Package name: ${packageJson.name}`);
  console.log(`✅ Version: ${packageJson.version}`);
  console.log(`✅ Dependencies: ${Object.keys(packageJson.dependencies || {}).length} packages`);
  console.log(`✅ Dev dependencies: ${Object.keys(packageJson.devDependencies || {}).length} packages`);
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  allFilesExist = false;
}

// Check if dist folder has UMD bundle
console.log('\n📦 Checking distribution files:');
const distFiles = [
  'dist/index.umd.js',
  'dist/index.esm.js',
  'dist/index.js',
  'dist/index.d.ts'
];

distFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check demo-ui files
console.log('\n🎨 Checking demo UI files:');
const demoFiles = [
  'demo-ui/app.js',
  'demo-ui/styles.css',
  'demo-ui/index.html'
];

demoFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Final result
console.log('\n🎯 Setup Verification Result:');
if (allFilesExist) {
  console.log('✅ All files are present and ready for StackBlitz!');
  console.log('\n🚀 Next steps:');
  console.log('1. Upload this folder to StackBlitz');
  console.log('2. Run "npm install" to install dependencies');
  console.log('3. Run "npm start" to start the development server');
  console.log('4. The demo UI will be available at the root URL');
} else {
  console.log('❌ Some files are missing. Please check the errors above.');
}

console.log('\n📋 StackBlitz Configuration:');
console.log('- Template: Angular CLI');
console.log('- Start command: npm start');
console.log('- Open files: src/index.html, demo-ui/app.js, demo-ui/styles.css');
console.log('- Dev tools: Enabled');
