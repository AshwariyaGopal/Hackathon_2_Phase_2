const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Manually load env vars since we are not in Next.js context
const envPath = path.resolve(__dirname, '.env.local');
console.log('Loading env from:', envPath);

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    // Simple parse, handles basic KEY=VALUE
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim();
      if (key && !key.startsWith('#')) {
        process.env[key] = value;
      }
    }
  });
} else {
    console.error("ERROR: .env.local file not found!");
}

console.log('Testing Database Connection...');
console.log('URL provided:', !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is missing or empty in .env.local');
  process.exit(1);
}

// Mask the password for logging
const maskedUrl = process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@');
console.log('Connecting to:', maskedUrl);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true 
});

pool.connect()
  .then(client => {
    console.log('SUCCESS: Connected to database!');
    return client.query('SELECT NOW()')
      .then(res => {
        console.log('Database Time:', res.rows[0].now);
        client.release();
        process.exit(0);
      });
  })
  .catch(err => {
    console.error('CONNECTION ERROR:', err.message);
    if (err.code === '28P01') console.error('Hint: Check your username/password.');
    if (err.code === '3D000') console.error('Hint: Database does not exist.');
    if (err.code === 'ENOTFOUND') console.error('Hint: Hostname incorrect.');
    if (err.message.includes('self signed')) console.error('Hint: SSL issue. Try adding rejectUnauthorized: false if testing locally.');
    process.exit(1);
  });
