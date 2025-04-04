import mongoose from 'mongoose';

const createMongoConnection = (connectionString: string) => {
  return mongoose.connect(connectionString);
};

export { createMongoConnection };
