import { initDb, getDb } from './db/connect.js';

console.log('Script started');

const contacts = [
  {
    firstName: "Tina",
    lastName: "Georgia",
    email: "TGeorgia@test.com",
    favoriteColor: "Pink",
    birthday: "12/12/18"
  },
  {
    firstName: "Elijah",
    lastName: "Carter",
    email: "ECarter@test.com",
    favoriteColor: "Green",
    birthday: "02/05/19"
  },
  {
    firstName: "Glen",
    lastName: "Winderhim",
    email: "GWinderhimC@test.com",
    favoriteColor: "Yellow",
    birthday: "07/03/95"
  }
];

(async () => {
  try {
    console.log('Connecting to DB...');
    await initDb();
    console.log('DB connected.');

    const db = getDb();

    console.log('Deleting old documents...');
    await db.collection('users').deleteMany({});

    console.log('Inserting contacts...');
    const result = await db.collection('users').insertMany(contacts);

    console.log(`Inserted ${result.insertedCount} contacts successfully.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();


