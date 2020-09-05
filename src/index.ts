import mongoose from 'mongoose';

import { app } from './app';
import cors from 'cors';
import { MongoMemoryServer } from 'mongodb-memory-server';

const start = async () => {

  let mongoUri = ''
  if (process.env.NODE_ENV === 'development') {
    process.env.JWT_KEY = 'asdfasdf';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const mongo = new MongoMemoryServer();
    mongoUri = await mongo.getUri();
    app.use(cors({ credentials: true, origin: "http://app.test.com:3000" }))
  }
  else {
    mongoUri = 'mongodb://auth-mongo-srv:27017/auth'
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }


  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log('Auth listening on port 5000!');
  });
};

start();
