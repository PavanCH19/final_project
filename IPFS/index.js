import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import crypto from "crypto";
import ipfsClient from "./ipfsClient.js";  // Use the Web3.Storage client

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

const algorithm = "aes-256-cbc";

// API to encrypt and store messages in Web3.Storage
app.post("/store", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const secretKey = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        let encrypted = cipher.update(message, "utf8", "hex");
        encrypted += cipher.final("hex");

        const encryptedData = JSON.stringify({ encrypted, iv: iv.toString("hex") });

        // Store in Web3.Storage
        const blob = new Blob([encryptedData], { type: "application/json" });
        const file = new File([blob], "encrypted-message.json");

        const cid = await ipfsClient.put([file]);  // Put the file in Web3.Storage
        console.log("Message stored with CID:", cid);

        res.json({ cid, key: secretKey.toString("hex") });
    } catch (error) {
        res.status(500).json({ error: "Error storing message" });
    }
});

// API to retrieve and decrypt messages from Web3.Storage
app.post("/retrieve", async (req, res) => {
    try {
        const { cid, key } = req.body;
        if (!cid || !key) return res.status(400).json({ error: "CID and key are required" });

        // Fetch encrypted data from Web3.Storage
        const response = await ipfsClient.get(cid);
        const file = response.files[0];
        const encryptedData = await file.text();

        const { encrypted, iv } = JSON.parse(encryptedData);

        // Decrypt the message
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");

        res.json({ decryptedMessage: decrypted });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving message" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
