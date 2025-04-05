import { create } from 'ipfs-core';

async function createNode() {
    const node = await create({
        repo: './private-ipfs',  // Store data in a local directory
        config: {
            Addresses: {
                Swarm: [
                    '/ip4/127.0.0.1/tcp/4002', // Private network connection
                    '/ip4/127.0.0.1/tcp/4003/ws' // WebSocket for browser communication
                ]
            },
            Bootstrap: [], // No public bootstrap nodes
            Discovery: {
                MDNS: { Enabled: false }, // Disable local network discovery
                webRTCStar: { Enabled: false }
            }
        }
    });

    console.log("✅ Private IPFS node is running!");

    // Add a file to the node
    const { cid } = await node.add({
        path: 'hello.txt',
        content: 'Hello, Private IPFS!'
    });
    console.log("📌 File CID:", cid.toString());

    // Retrieve the file using the CID
    const stream = node.cat(cid); // Use the CID that was returned when adding the file
    let data = '';
    for await (const chunk of stream) {
        data += chunk.toString();
    }
    console.log("📌 File Content:", data);

    return node; // Return the node in case you want to use it elsewhere later
}

// Call the function to create the node and perform actions
createNode();




// const { cid } = await node.add({ path: 'hello.txt', content: 'Hello, Private IPFS!' });
// console.log("📌 File CID:", cid.toString());



// const stream = node.cat(cid);
// let data = '';
// for await (const chunk of stream) {
//     data += chunk.toString();
// }
// console.log("📌 File Content:", data);



// const id = await node.id();
// console.log("Peer ID:", id.addresses);


// await node.swarm.connect('/ip4/192.168.1.10/tcp/4002/p2p/Qm123...xyz');
// console.log("✅ Connected to Private Network!");
