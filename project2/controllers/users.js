const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all users
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const users = await db.collection('users').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};


// GET a single user
const getSingle = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Must use a valid user ID to find a user.' });
  }

  try {
    const userId = new ObjectId(id);
    const db = mongodb.getDatabase();
    const user = await db.collection('users').findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error retrieving user:', error);
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

// POST create new user
const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    nationality: req.body.nationality,
    birthday: req.body.birthday,
    address: req.body.address,
    phone: req.body.phone,
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

// PUT update user
const updateUser = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json('Must use a valid user ID to update a user.');
  }

  const userId = new ObjectId(id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    nationality: req.body.nationality,
    birthday: req.body.birthday,
    address: req.body.address,
    phone: req.body.phone,
  };

  try {
    const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json('Must use a valid user ID to delete a user.');
  }

  const userId = new ObjectId(id);

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