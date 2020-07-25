import mongoose, { Mongoose } from 'mongoose';

let cachedClient: Mongoose | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    // console.log('cached client retrieved');
    return cachedClient;
  }

  const client = await mongoose.connect(process.env.MONGODB_URL || '', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  // console.log('new client created');
  cachedClient = client;
  return client;
}
