import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!uri) {
  throw new Error("Add NEXT_PUBLIC_MONGODB_URI to env");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const options: MongoClientOptions = {};

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so that the MongoClient is not recreated each time
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, it's better to avoid using a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;