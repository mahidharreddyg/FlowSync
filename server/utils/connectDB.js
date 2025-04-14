import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    // Make sure we provide connection options for Mongoose to avoid deprecation warnings
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database Connected');
  } catch (error) {
    console.log('DB Error: ' + error.message);
    process.exit(1); 
  }
};

export default dbConnection;
