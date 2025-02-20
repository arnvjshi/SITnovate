import { MongoClient } from "mongodb";

const uri = "mongodb+srv://ghatenayan5:nayan135@inventory.rbdml.mongodb.net/?retryWrites=true&w=majority&appName=inventory";
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
