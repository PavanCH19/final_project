import { create } from 'ipfs-core';
import fs from 'fs';
import path from 'path';

// Initialize IPFS node
async function initializeNode() {
    return await create({
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
}

// 📥 3. Retrieve File using CID
async function retrieveFileFromIPFS(node, cid, outputName) {
    const stream = node.cat(cid);
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(chunk);
    }

    const retrievedBuffer = Buffer.concat(chunks);
    fs.writeFileSync(outputName, retrievedBuffer);

    console.log(`✅ File retrieved and saved as ${outputName}`);
}

// Runner
async function run() {
    const node = await initializeNode();
    const cid = 'QmPgBtbnh1je15pBeKUxEXhouHdmAzZyGmmFQMDp7T7c9u'; // Replace with your CID
    const fileName = 'retrieved_file.js';

    // 🔧 Ensure 'output' directory exists
    const outputDir = 'output';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const outputPath = `output/retrieved_${fileName}`;
    await retrieveFileFromIPFS(node, cid, outputPath);
}

run();
