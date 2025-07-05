const { response } = require('express');
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');


const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('users').find();
    const users = await result.toArray(); 
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contactKey = req.params.contactNumber;

    console.log('Looking for user:', userId);
    console.log('Looking for contact:', contactKey);

    const userDoc = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .findOne({ _id: userId });

    if (!userDoc) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!userDoc[contactKey]) {
      return res.status(404).json({ message: `Contact ${contactKey} not found` });
    }

    res.status(200).json(userDoc[contactKey]);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving contact', error: err.message });
  }
};


module.exports = {
  getAll,
  getSingle
};