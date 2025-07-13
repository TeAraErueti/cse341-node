const fs = require('fs');
const path = require('path');

console.log('🔍 Starting test-env.js...');

// Adjust if needed based on your file layout
const envPath = path.join(__dirname, 'week1', '.env');

fs.readFile(envPath, 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Could not read .env:', err.message);
  } else {
    console.log('📄 .env file contents:\n', data);
  }
});
