// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import crypto from "crypto";
// import ipfsClient from "./ipfsClient.js";  // Use the Web3.Storage client

// const app = express();
// const PORT = 5000;
// app.use(cors());
// app.use(bodyParser.json());

// const algorithm = "aes-256-cbc";

// // API to encrypt and store messages in Web3.Storage
// app.post("/store", async (req, res) => {
//     try {
//         const { message } = req.body;
//         if (!message) return res.status(400).json({ error: "Message is required" });

//         const secretKey = crypto.randomBytes(32);
//         const iv = crypto.randomBytes(16);

//         const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
//         let encrypted = cipher.update(message, "utf8", "hex");
//         encrypted += cipher.final("hex");

//         const encryptedData = JSON.stringify({ encrypted, iv: iv.toString("hex") });

//         // Store in Web3.Storage
//         const blob = new Blob([encryptedData], { type: "application/json" });
//         const file = new File([blob], "encrypted-message.json");

//         const cid = await ipfsClient.put([file]);  // Put the file in Web3.Storage
//         console.log("Message stored with CID:", cid);

//         res.json({ cid, key: secretKey.toString("hex") });
//     } catch (error) {
//         res.status(500).json({ error: "Error storing message" });
//     }
// });

// // API to retrieve and decrypt messages from Web3.Storage
// app.post("/retrieve", async (req, res) => {
//     try {
//         const { cid, key } = req.body;
//         if (!cid || !key) return res.status(400).json({ error: "CID and key are required" });

//         // Fetch encrypted data from Web3.Storage
//         const response = await ipfsClient.get(cid);
//         const file = response.files[0];
//         const encryptedData = await file.text();

//         const { encrypted, iv } = JSON.parse(encryptedData);

//         // Decrypt the message
//         const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
//         let decrypted = decipher.update(encrypted, "hex", "utf8");
//         decrypted += decipher.final("utf8");

//         res.json({ decryptedMessage: decrypted });
//     } catch (error) {
//         res.status(500).json({ error: "Error retrieving message" });
//     }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const PinataSDK = require("@pinata/sdk");
// const fs = require("fs");
// const path = require("path");

// const pinata = new PinataSDK({
//     pinataJWTKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YTk4OGE4ZC1kMjc5LTQwMTgtOGI0ZC0yOTYxMDdlMGUwYjgiLCJlbWFpbCI6ImhiZHBhdmFuMjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjgxZjFiYWE3MGVlNzg1MDI1YzI5Iiwic2NvcGVkS2V5U2VjcmV0IjoiYzI2NmFiMDE4MTU5NTNiYmEzYzk1MTBlMzIwMDFjNDYzOTkyZmNlYmE5OWZmODg4M2QxYmJkMjA0ZmVhMDhkMyIsImV4cCI6MTc3NDQzOTgyNH0.hwtT-XiVZcLocMAiqDZAFORLtk2ncuwNVzjqhvBnq7E"
// });

// async function uploadFileToPinata() {
//     try {
//         const filePath = path.join(__dirname, "women.jpg"); // Ensure correct path
//         const readableStreamForFile = fs.createReadStream(filePath);

//         const options = {
//             pinataMetadata: { name: "women.jpg" },
//             pinataOptions: { cidVersion: 1 },
//         };

//         const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
//         console.log("File uploaded successfully!");
//         console.log("CID:", result.IpfsHash);
//         console.log("File URL: https://gateway.pinata.cloud/ipfs/" + result.IpfsHash);
//     } catch (error) {
//         console.error("Error uploading file:", error);
//     }
// }

// uploadFileToPinata();


const { PinataSDK } = require("pinata")
const fs = require("fs")
const { Blob } = require("buffer")

const pavanjwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YTk4OGE4ZC1kMjc5LTQwMTgtOGI0ZC0yOTYxMDdlMGUwYjgiLCJlbWFpbCI6ImhiZHBhdmFuMjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjgxZjFiYWE3MGVlNzg1MDI1YzI5Iiwic2NvcGVkS2V5U2VjcmV0IjoiYzI2NmFiMDE4MTU5NTNiYmEzYzk1MTBlMzIwMDFjNDYzOTkyZmNlYmE5OWZmODg4M2QxYmJkMjA0ZmVhMDhkMyIsImV4cCI6MTc3NDQzOTgyNH0.hwtT-XiVZcLocMAiqDZAFORLtk2ncuwNVzjqhvBnq7E"


const pinata = new PinataSDK({
    pinataJwt: pavanjwt,
    pinataGateway: "https://app.pinata.cloud/ipfs/files"
})

async function upload() {
    try {
        // const blob = new Blob([fs.readFileSync("./women.jpg")]);
        // const file = new File([blob], "hello-world.txt", { type: "text/plain" })
        const blob = new Blob([fs.readFileSync("./women.jpg")], { type: "image/jpeg" });
        const file = new File([blob], "women.jpg", { type: "image/jpeg" });

        const upload = await pinata.upload.public.file(file);
        console.log(upload)
    } catch (error) {
        console.log(error)
    }
}

upload()