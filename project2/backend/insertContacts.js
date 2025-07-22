import { initDb, getDb } from './db/connect.js';

console.log('Script started');

const contacts = [
  {
    firstName: "Gregor",
    lastName: "Tiwauke",
    email: "GTiwauke@test.com",
    nationality: "American Indian",
    birthday: "12/12/18",
    address: "123 Main St, San Diego, California, USA",
    phone: "485-689-5524",
  },
  {
    firstName: "Danielle",
    lastName: "Fitzgerald",
    email: "DFitz129@test.com",
    nationality: "American",
    birthday: "03/27/97",
    address: "14 Dainway street, St. George, Utah, USA",
    phone: "472-839-4325",
  },
  {
    firstName: "Brigham",
    lastName: "Young",
    email: "BYoung@test.com",
    nationality: "American",
    birthday: "03/16/95",
    address: "14 Dainway street, Idaho Falls, Idaho, USA",
    phone: "382-679-3050",
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


