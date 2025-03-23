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
