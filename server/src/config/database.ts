require('dotenv').config(); // Load .env variables
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE_URL; // Use environment variable
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    await client.close();
  }
}


