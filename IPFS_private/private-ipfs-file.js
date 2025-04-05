import { create } from 'ipfs-core';
import fs from 'fs';
import path from 'path';

let node; // Global variable to hold the IPFS node instance

// 🟢 1. Initialize Private IPFS Node
async function initializeNode() {
    node = await create({
        repo: './private-ipfs',
        config: {
            Addresses: {
                Swarm: [
                    '/ip4/127.0.0.1/tcp/4002',
                    '/ip4/127.0.0.1/tcp/4003/ws'
                ]
            },
            Bootstrap: [],
            Discovery: {
                MDNS: { Enabled: false },
                webRTCStar: { Enabled: false }
            }
        }
    });
    console.log("✅ Private IPFS node is running!");
}

// 📤 2. Add File to IPFS
async function addFileToIPFS(filePath) {
    const fileName = path.basename(filePath);
    const fileContent = fs.readFileSync(filePath);

    const { cid } = await node.add({
        path: fileName,
        content: fileContent
    });

    console.log("📌 File added with CID:", cid.toString());

    return { cid, fileName };
}

// 📥 3. Retrieve File using CID
async function retrieveFileFromIPFS(cid, outputName) {
    const stream = node.cat(cid);
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(chunk);
    }

    const retrievedBuffer = Buffer.concat(chunks);
    fs.writeFileSync(outputName, retrievedBuffer);

    console.log(`✅ File retrieved and saved as ${outputName}`);
}

// 📚 4. List all pinned CIDs
// async function listPinnedFiles() {
//     console.log("📂 Listing all pinned CIDs:");
//     for await (const pin of node.pin.ls()) {
//         console.log("📌", pin.cid.toString());
//     }
// }

// 🚀 Main runner
async function run(filePath) {
    await initializeNode();

    const { cid, fileName } = await addFileToIPFS(filePath);
    await node.pin.add(cid); // Optional: Pin to keep content

    // 🔧 Ensure 'output' directory exists
    const outputDir = 'output';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const outputPath = `output/retrieved_${fileName}`;
    await retrieveFileFromIPFS(cid, outputPath);

    // await listPinnedFiles(); // Optional: Show all pinned CIDs
}

// 🏁 Change file path here
run('./private-ipfs.js');
