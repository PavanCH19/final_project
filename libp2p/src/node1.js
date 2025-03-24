import { createLibp2p } from './libp2p.js';
import { stdinToStream, streamToConsole } from './stream.js';

const peerId = process.argv[2]; // Unique peer ID
let peers = {}; // Store discovered peers

async function run() {
    try {
        const node = await createLibp2p({
            addresses: { listen: ['/ip4/0.0.0.0/tcp/0'] }
        });

        console.log(`${peerId} ready, listening on:`);
        node.getMultiaddrs().forEach((ma) => console.log(ma.toString()));

        // Handle peer discovery
        node.addEventListener('peer:discovery', async (evt) => {
            const discoveredPeer = evt.detail;
            const peerIdStr = discoveredPeer.id.toString();

            if (!peerIdStr || peers[peerIdStr]) return;

            console.info(`🔍 Discovered Peer: ${peerIdStr}`);
            peers[peerIdStr] = discoveredPeer;
        });

        // Handle peer connection
        node.addEventListener('peer:connect', (evt) => {
            const remotePeer = evt.detail;
            if (!remotePeer || !remotePeer.id) return;
            console.log(`🔗 Connected to: ${remotePeer.id.toString()}`);
        });

        // Handle incoming messages
        await node.handle('/chat/1.0.0', async ({ stream, connection }) => {
            console.log(`📩 Incoming message from ${connection.remotePeer.toString()}`);
            streamToConsole(stream);
        });

        // Handle user input for sending messages
        process.stdin.on('data', async (data) => {
            const input = data.toString().trim();
            const [targetPeerId, ...messageParts] = input.split(' ');
            const messageText = messageParts.join(' ');

            if (!targetPeerId || !messageText) {
                console.log('⚠️ Invalid input. Use: <peerID> <message>');
                return;
            }

            if (!peers[targetPeerId]) {
                console.log(`❌ No peer found with ID: ${targetPeerId}`);
                return;
            }

            try {
                console.log(`📡 Dialing ${targetPeerId}`);
                const stream = await node.dialProtocol(peers[targetPeerId].id, '/chat/1.0.0');
                console.log(`📤 Sending message to ${targetPeerId}: ${messageText}`);
                stdinToStream(stream, messageText);
            } catch (error) {
                console.error(`❌ Failed to send message to ${targetPeerId}:`, error);
            }
        });

        console.log('📝 Enter a peer ID followed by a message to send.');
    } catch (error) {
        console.error('❌ Failed to initialize libp2p node:', error);
    }
}

run();


















// import { createLibp2p } from './libp2p.js';
// import { stdinToStream, streamToConsole } from './stream.js';

// const peerId = process.argv[2]; // Unique peer ID provided as a command-line argument
// let peers = {}; // Store discovered peers

// /**
//  * Creates and starts the libp2p node
//  * @returns {Object} The created libp2p node instance
//  */
// async function createNode() {
//     return await createLibp2p({
//         addresses: { listen: ['/ip4/0.0.0.0/tcp/0'] } // Listen on available TCP address
//     });
// }

// /**
//  * Displays the listening addresses of the node
//  * @param {Object} node - The libp2p node instance
//  */
// function displayNodeInfo(node) {
//     console.log(`${peerId} ready, listening on:`);
//     node.getMultiaddrs().forEach((ma) => console.log(ma.toString()));
// }

// /**
//  * Handles peer discovery events
//  * @param {Object} node - The libp2p node instance
//  */
// function handlePeerDiscovery(node) {
//     node.addEventListener('peer:discovery', async (evt) => {
//         const discoveredPeer = evt.detail;
//         const peerIdStr = discoveredPeer.id.toString();

//         if (!peerIdStr || peers[peerIdStr]) return;

//         console.info(`🔍 Discovered Peer: ${peerIdStr}`);
//         peers[peerIdStr] = discoveredPeer; // Store discovered peer
//     });
// }

// /**
//  * Handles peer connection events
//  * @param {Object} node - The libp2p node instance
//  */
// function handlePeerConnection(node) {
//     node.addEventListener('peer:connect', (evt) => {
//         const remotePeer = evt.detail;
//         if (!remotePeer || !remotePeer.id) return;
//         console.log(`🔗 Connected to: ${remotePeer.id.toString()}`);
//     });
// }

// /**
//  * Handles incoming messages from connected peers
//  * @param {Object} node - The libp2p node instance
//  */
// async function handleIncomingMessages(node) {
//     await node.handle('/chat/1.0.0', async ({ stream, connection }) => {
//         console.log(`📩 Incoming message from ${connection.remotePeer.toString()}`);
//         streamToConsole(stream); // Print received message to console
//     });
// }

// /**
//  * Handles user input from the terminal to send messages to peers
//  * @param {Object} node - The libp2p node instance
//  */
// function handleUserInput(node) {
//     process.stdin.on('data', async (data) => {
//         const input = data.toString().trim();
//         const [targetPeerId, ...messageParts] = input.split(' ');
//         const messageText = messageParts.join(' ');

//         if (!targetPeerId || !messageText) {
//             console.log('⚠️ Invalid input. Use: <peerID> <message>');
//             return;
//         }

//         if (!peers[targetPeerId]) {
//             console.log(`❌ No peer found with ID: ${targetPeerId}`);
//             return;
//         }

//         await sendMessage(node, targetPeerId, messageText);
//     });
// }

// /**
//  * Sends a message to a specified peer
//  * @param {Object} node - The libp2p node instance
//  * @param {string} targetPeerId - The ID of the peer to send a message to
//  * @param {string} messageText - The message to send
//  */
// async function sendMessage(node, targetPeerId, messageText) {
//     try {
//         console.log(`📡 Dialing ${targetPeerId}`);
//         const stream = await node.dialProtocol(peers[targetPeerId].id, '/chat/1.0.0');
//         console.log(`📤 Sending message to ${targetPeerId}: ${messageText}`);
//         stdinToStream(stream, messageText);
//     } catch (error) {
//         console.error(`❌ Failed to send message to ${targetPeerId}:`, error);
//     }
// }

// /**
//  * Initializes and starts the libp2p chat node
//  */
// async function initializeNode() {
//     try {
//         const node = await createNode();
//         displayNodeInfo(node);
//         handlePeerDiscovery(node);
//         handlePeerConnection(node);
//         handleIncomingMessages(node);
//         handleUserInput(node);

//         console.log('📝 Enter a peer ID followed by a message to send.');
//     } catch (error) {
//         console.error('❌ Failed to initialize libp2p node:', error);
//     }
// }

// // Start the node
// initializeNode();

