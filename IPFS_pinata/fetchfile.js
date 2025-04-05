// import PinataSDK from '@pinata/sdk'; // Correct import

// const pavanjwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YTk4OGE4ZC1kMjc5LTQwMTgtOGI0ZC0yOTYxMDdlMGUwYjgiLCJlbWFpbCI6ImhiZHBhdmFuMjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjgxZjFiYWE3MGVlNzg1MDI1YzI5Iiwic2NvcGVkS2V5U2VjcmV0IjoiYzI2NmFiMDE4MTU5NTNiYmEzYzk1MTBlMzIwMDFjNDYzOTkyZmNlYmE5OWZmODg4M2QxYmJkMjA0ZmVhMDhkMyIsImV4cCI6MTc3NDQzOTgyNH0.hwtT-XiVZcLocMAiqDZAFORLtk2ncuwNVzjqhvBnq7E"

// // Initialize Pinata correctly as a class
// const pinata = new PinataSDK({ pinataJwt: pavanjwt });

// async function main() {
//     try {
//         const cid = 'bafkreigmzw3donalgcywxn4ig3qyv4oedstcf653xplwybzscmjaapr56e'; // Example CID
//         const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
//         console.log("File available at:", url);

//         // Fetch the file
//         const response = await fetch(url);
//         const contentType = response.headers.get("content-type");

//         if (contentType.startsWith("text")) {
//             // If the file is text-based, read as text
//             const fileContent = await response.text();
//             console.log("File content:", fileContent);
//         } else {
//             // If the file is binary (image, video, PDF, etc.), handle it as a Blob
//             const blob = await response.blob();
//             console.log("Binary file fetched successfully.");

//             // If it's an image, create an object URL
//             if (contentType.startsWith("image")) {
//                 const imageUrl = URL.createObjectURL(blob);
//                 console.log("Image URL:", imageUrl);
//             }

//             // Provide a download link
//             const link = document.createElement("a");
//             link.href = URL.createObjectURL(blob);
//             link.download = "downloaded_file";
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//     } catch (error) {
//         console.error('Error fetching from Pinata:', error);
//     }
// }

// main();



const { PinataSDK } = require("pinata")

const pavanjwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YTk4OGE4ZC1kMjc5LTQwMTgtOGI0ZC0yOTYxMDdlMGUwYjgiLCJlbWFpbCI6ImhiZHBhdmFuMjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjgxZjFiYWE3MGVlNzg1MDI1YzI5Iiwic2NvcGVkS2V5U2VjcmV0IjoiYzI2NmFiMDE4MTU5NTNiYmEzYzk1MTBlMzIwMDFjNDYzOTkyZmNlYmE5OWZmODg4M2QxYmJkMjA0ZmVhMDhkMyIsImV4cCI6MTc3NDQzOTgyNH0.hwtT-XiVZcLocMAiqDZAFORLtk2ncuwNVzjqhvBnq7E"

const pinata = new PinataSDK({
    pinataJwt: pavanjwt,
    pinataGateway: "https://gateway.pinata.cloud/ipfs/"
})

async function main() {
    try {
        const file = await pinata.gateways.get("bafkreiac3t35fklpiwqonav2vj4x2dh6x2zugkdu7dsh6zkaq5jr33lcwy")
        console.log(file.data)
    } catch (error) {
        console.log(error);
    }
}

main()