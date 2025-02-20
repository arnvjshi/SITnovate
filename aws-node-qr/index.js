import express from "express";
import { MongoClient } from "mongodb";
import QRCode from "qrcode";

const app = express();
const port = 8000;

const uri = "mongodb+srv://ghatenayan5:nayan135@inventory.rbdml.mongodb.net/?retryWrites=true&w=majority&appName=inventory";
const client = new MongoClient(uri);

app.get("/", async (req, res) => {
    try {
        await client.connect();
        const database = client.db("inventory");
        const collection = database.collection("items");
        
        const items = await collection.find({}).toArray();
        
        let table = `<table border='1'><tr><th>ID</th><th>Name</th><th>Price</th><th>QR Code</th></tr>`;
        for (const item of items) {
            const qrData = JSON.stringify({ id: item.id, name: item.item_name, price: item.price });
            const qrImage = await QRCode.toDataURL(qrData);
            table += `<tr><td>${item.id}</td><td>${item.item_name}</td><td>${item.price}</td><td><img src='${qrImage}' width='100'/></td></tr>`;
        }
        table += "</table>";
        
        res.send(`${table}`);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
