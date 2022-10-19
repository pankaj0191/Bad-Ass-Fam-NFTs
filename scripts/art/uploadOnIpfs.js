const console = require("console");
const dotenv = require("dotenv");
const { create, urlSource } = require('ipfs-http-client')

dotenv.config(); // setup dotenv


const INFURA_PROJECT_ID = process.env.VITE_INFURA_PROJECT_ID;
const INFURA_PROJECT_SECRET = process.env.VITE_INFURA_PROJECT_SECRET;
const INFURA_API_ENDPOINT = process.env.VITE_INFURA_API_ENDPOINT;


const infuraIpfsClient = () => {
    const auth = 'Basic ' + Buffer.from(INFURA_PROJECT_ID + ':' + INFURA_PROJECT_SECRET).toString('base64');
    const projectUrl = INFURA_API_ENDPOINT ? INFURA_API_ENDPOINT : "https://ipfs.infura.io:5001";
    const urlObject = new URL(projectUrl);

    const client = create({
        host: urlObject.hostname || 'ipfs.infura.io',
        port: urlObject.port || 5001,
        protocol: urlObject.protocol.replace(":", "") || 'https',
        headers: {
            authorization: auth,
        },
    });

    return client;
}



const createFolder = async () => {
    const ipfsClient = infuraIpfsClient();
    let result = await ipfsClient.config.getAll();
    console.log({ipfsClient, result})

}

createFolder();
