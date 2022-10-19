const fs = require("fs");
const ipfsClient = require("ipfs-http-client");
const { baseUrl } = require("../helpers");
const { LAYERS_NAME } = require('../data');

const INFURA_PROJECT_ID = process.env.VITE_INFURA_PROJECT_ID;
const INFURA_PROJECT_SECRET = process.env.VITE_INFURA_PROJECT_SECRET;
const INFURA_API_ENDPOINT = process.env.VITE_INFURA_API_ENDPOINT;
const INFURA_IPFS_BASE_URL = process.env.VITE_INFURA_IPFS_BASE_URL;

const APP_NAME = process.env.VITE_APP_NAME || "Bad Ass Fam";
const APP_DESCRIPTION = process.env.VITE_APP_DESCRIPTION || "";
const BASE_PATH = process.env.PWD || "";
const ART_GENERATOR_BASE_DIR = baseUrl(process.env.ART_GENERATOR_DIR, BASE_PATH, "arts");
const artGeneratorOutputDir = `${ART_GENERATOR_BASE_DIR}output/`;


const infuraIpfsClient = (projectId, projectSecret, projectUrl) => {
    projectUrl = projectUrl ? projectUrl : "https://ipfs.infura.io:5001";
    if (projectId && projectSecret) {
        const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
        const urlObject = new URL(projectUrl);
        const client = ipfsClient.create({
            host: urlObject.hostname || 'ipfs.infura.io',
            port: urlObject.port || 5001,
            protocol: urlObject.protocol.replace(":", "") || 'https',
            headers: {
                authorization: auth,
            },
        });
        return client;
    }
    const client = ipfsClient.create(projectUrl);
    return client;
}

const uploadOnIpfsServer = async (options = {}) => {
    const { edition, mintValue } = options;
    if (edition && mintValue) {
        var metadata = [];
        for (let index = 0; index < mintValue; index++) {
            const newOption = {
                edition: parseInt(edition) + index,
            }
            const fileData = await _uploadImageOnIpfsServer(newOption);
            if (fileData && fileData.path) {
                const metadataResponse = await _uploadMetadataOnIpfsServer(newOption, fileData);
                if (metadataResponse && metadataResponse.ipfsUrl) {
                    metadata.push(metadataResponse);
                }
            }
        }
        return {
            status: true,
            message: "",
            data: metadata
        }
    }
    var message = "Something went wrong!";
    message = !edition ? "Nft edition is required!" : (!mintValue ? "Mint value is required!" : message);
    return {
        status: false,
        message: message
    }

}

const _uploadImageOnIpfsServer = async (options) => {
    try {
        const { edition } = options;
        if (!edition) { return false }
        // Get infura ipfs client object
        const infIpfsClient = infuraIpfsClient(INFURA_PROJECT_ID, INFURA_PROJECT_SECRET, INFURA_API_ENDPOINT);

        // Get metadata file data from the art generator folder
        let bufferData = fs.readFileSync(`${artGeneratorOutputDir}images/${edition}.png`);

        // Upload nft art on infura ipfs server
        const ipfsResult = await infIpfsClient.add(bufferData)
        return ipfsResult;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const _uploadMetadataOnIpfsServer = async (options, ipfs) => {
    try {
        const { path } = ipfs;
        const { edition, walletAddress } = options;

        // Get infura ipfs client object
        const infIpfsClient = infuraIpfsClient(INFURA_PROJECT_ID, INFURA_PROJECT_SECRET, INFURA_API_ENDPOINT);

        // Get metadata file data from the art generator folder
        let bufferData = fs.readFileSync(`${artGeneratorOutputDir}metadata/${edition}.json`);
        let oldMetadata = JSON.parse(bufferData.toString());
        const metadata = {
            name: `${APP_NAME} #${edition}`,
            description: `Edition: #${edition}, ${APP_DESCRIPTION}`,
            image: baseUrl(path, INFURA_IPFS_BASE_URL, 'ipfs'),
            date: new Date(),
            attributes: oldMetadata.attributes.map((attribute) => {
                return {
                    ...attribute,
                    value: LAYERS_NAME[attribute.value.toLowerCase()] || attribute.value
                }
            }) || []
        }

        // Upload nft metadata on infura ipfs server
        const ipfsResult = await infIpfsClient.add(JSON.stringify(metadata));

        return {
            ipfsUrl: baseUrl(ipfsResult.path, INFURA_IPFS_BASE_URL, 'ipfs'),
            data: metadata
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}


module.exports = {
    infuraIpfsClient,
    uploadOnIpfsServer
};