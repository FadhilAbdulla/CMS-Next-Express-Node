const mongoose = require('mongoose');

mongoServerApi="mongodb://localhost:27017"
databaseName="customers"

const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoServerApi}/${databaseName}`, {
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
