// db/connect.js
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from week1
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log('MONGODB_URI:', process.env.MONGODB_URI);  
console.log('DB_NAME:', process.env.DB_NAME);

let _db;

export const initDb = async () => {  
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri || !dbName) {
    throw new Error('❌ MONGODB_URI or DB_NAME is missing in .env');
  }

  const client = await MongoClient.connect(uri);
  _db = client.db(dbName);
  console.log(`✅ Connected to MongoDB: ${dbName}`);
  return _db;
};

export const getDb = () => {
  if (!_db) throw new Error('❌ DB not initialized. Call initDb() first.'); 
  return _db;
};
