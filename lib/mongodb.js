import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.28bsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let client;
let clientPromise;

if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local");
}

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
