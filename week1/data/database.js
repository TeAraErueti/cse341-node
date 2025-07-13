const dotenv = require('dotenv');
dotenv.config({ path: './week1/.env' });

const { MongoClient } = require('mongodb');

let database;

const initDb = async () => {
  if (database) {
    console.log('Db is already initialized');
    return database;
  }
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    database = client.db(process.env.DB_NAME);
    console.log(`✅ Connected to MongoDB: ${process.env.DB_NAME}`);
    return database;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err; // propagate error so caller can handle it
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};
