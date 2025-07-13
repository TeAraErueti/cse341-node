const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  console.log('Using DB:', process.env.DB_NAME);

  const db = mongodb.getDatabase();

  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));

  try {
    console.log('✅ getAll controller hit');
    const result = await db.collection('users').find();
    const users = await result.toArray();
    console.log('✅ users retrieved:', users.length);
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error in getAll:', err);
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
};


const getSingle = async (req, res) => {
  //#swager.tags=['Users'];
  try {
    const userId = new ObjectId(req.params.id);
    const userDoc = await mongodb.getDatabase().collection('users').findOne({ _id: userId });

    if (!userDoc) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userDoc);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: err.message });
  }
};

const createUser = async (req, res) => {
  //#swager.tags=['Users'];
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  try {
    const response = await mongodb.getDatabase().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json({ message: 'User created', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create user' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

const updateUser = async (req, res) => {
  //#swager.tags=['Users'];
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  try {
    const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found or nothing changed' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  //#swager.tags=['Users'];
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
