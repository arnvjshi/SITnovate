import express from "express";
import { MongoClient } from "mongodb";
import QRCode from "qrcode";

const app = express();
const port = 8000;

const uri = "mongodb+srv://ghatenayan5:nayan135@inventory.rbdml.mongodb.net/?retryWrites=true&w=majority&appName=inventory";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

// Connect to MongoDB once at startup
connectDB();

app.get("/", async (req, res) => {
    try {
        const database = client.db("inventory");
        const collection = database.collection("items");
        
        // Fetch items, excluding the `_id` field
        const items = await collection.find({}, { projection: { _id: 0 } }).toArray();
        
        // Generate table headers dynamically from item fields
        let headers = new Set();
        items.forEach(item => Object.keys(item).forEach(key => headers.add(key)));

        // HTML & CSS Styling
        let table = `
        <html>
        <head>
            <title>Inventory Available</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-color: #f4f4f4;
                    margin: 20px;
                }
                h1 {
                    color: #333;
                }
                table {
                    width: 80%;
                    margin: auto;
                    border-collapse: collapse;
                    background: white;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    overflow: hidden;
                }
                th, td {
                    padding: 10px;
                    text-align: center;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #007bff;
                    color: white;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
                img {
                    display: block;
                    margin: auto;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
            <h1>Inventory Available</h1>
            <table>
                <tr>`;

        headers.forEach(header => table += `<th>${header}</th>`);
        table += `<th>QR Code</th></tr>`; // Extra column for QR code

        for (const item of items) {
            let qrData = item.id.toString(); // Only using ID for QR Code
            let qrImage = await QRCode.toDataURL(qrData);
            
            table += "<tr>";
            headers.forEach(header => table += `<td>${item[header] || ""}</td>`); // Fill missing fields with empty strings
            table += `<td><img src='${qrImage}' width='100'/></td></tr>`;
        }
        
        table += `</table></body></html>`;
        res.send(`${table}`);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
