import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined");
}

const client = new MongoClient(uri);

const clientPromise = client.connect();

export default clientPromise;