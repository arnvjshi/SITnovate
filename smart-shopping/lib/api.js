const MONGO_URI = "mongodb+srv://ghatenayan5:nayan@135@inventory.rbdml.mongodb.net/?retryWrites=true&w=majority&appName=inventory"
const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "inventory";