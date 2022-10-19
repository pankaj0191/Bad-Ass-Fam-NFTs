// import dependencies
const console = require("console");
const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

// canvas for image compile
const { createCanvas } = require("canvas");
const fs = require("fs");

// import config
const {
  layers,
  width,
  height,
  editionSize,
  startEditionFrom,
  rarityWeights,
  baseDirectory
} = require("./config");

// import metadata
const { compileMetadata } = require("./src/metadata");

// import for saving files
const { createFile } = require("./src/filesystem");

// setup canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Create generative art by using the canvas api
const startCreating = async () => {
  console.log("##################");
  console.log("# Generative Art #");
  console.log("# - Generating your NFT collection");
  console.log("##################");

  ["images", "metadata", "other_data"].forEach(directory => {
    const outputDir = `${baseDirectory}output/${directory}`;
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  });

  // image data collection
  let imageDataArray = [];

  // create NFTs from startEditionFrom to editionSize
  let editionCount = startEditionFrom;

  while (editionCount <= editionSize) {
    console.log("-----------------");
    console.log("Creating %d of %d", editionCount, editionSize);

    const handleFinal = async () => {
      // create image files and return object array of created images
      const response = await createFile(
        canvas,
        ctx,
        layers,
        width,
        height,
        editionCount,
        editionSize,
        rarityWeights,
        imageDataArray
      );
      if(!response){
        return;
      }
      [...imageDataArray] = response;
    };
    await handleFinal();
    // iterate
    editionCount++;
  }
  imageDataArray = imageDataArray.filter(imageDataArray => imageDataArray);
  await compileMetadata(
    editionCount,
    editionSize,
    imageDataArray
  );

  console.log();
  console.log("#########################################");
  console.log("Welcome to Bad Ass Fam - Meet the Survivors");
  console.log("#########################################");
  console.log();
};

// Initiate code
startCreating();

// // create folder on ipfs through infura api
// import { create } from 'ipfs-http-client'
// const auth = 'Basic' + Buffer.from('projectId' + ':' + 'secret').toString('base64');
// const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth } });
// let result = await ipfs.files.mkdir("/myfolder");
