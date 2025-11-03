import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in environment variables');
  process.exit(1);
}

async function clearCollections() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db('grs-db');

    // კოლექციების სია რომელიც უნდა გაიწმინდოს
    const collections = ['categories', 'sets', 'exercises'];

    for (const collectionName of collections) {
      try {
        await db.collection(collectionName).drop();
      } catch (err) {
        if ((err as any).code === 26) {
        } else {
          console.error(`Error dropping collection ${collectionName}:`, err);
        }
      }
    }

    // წავშალოთ ყველა ინდექსი
    for (const collectionName of collections) {
      try {
        const collection = db.collection(collectionName);
        await collection.dropIndexes();
      } catch (err) {
        console.error(`Error dropping indexes for ${collectionName}:`, err);
      }
    }

    await client.close();
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
}

clearCollections(); 