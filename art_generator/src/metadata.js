const fs = require("fs");
// const console = require("console");

const IMAGE_BASE_URL = process.env.VITE_IPFS_BASE_URL;
// const { create, globSource, urlSource } = require('ipfs-http-client')
// const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

const { description, baseImageUri, baseDirectory } = require("../config");

const outputDir = `${baseDirectory}output/`;

// write metadata locally to json files
const writeMetaData = metadataList => {
  fs.writeFileSync(outputDir + "_metadata.json", JSON.stringify(metadataList));
};

// add metadata for individual nft edition
const generateMetadata = (dna, edition, attributesList, path) => {
  let dateTime = Date.now();
  let tempMetadata = {
    dna: dna.join(""),
    name: `#${edition}`,
    description: description,
    image: path || baseImageUri,
    edition: edition,
    date: dateTime,
    attributes: attributesList
  };
  return tempMetadata;
};

// upload metadata
const uploadMetadata = async (
  imageCID,
  editionSize,
  edition,
  imageDataArray
) => {
  let id = edition.toString();
  let filename = id + ".json";

  // let filetype = "base64";
  imageDataArray.filePath = `${IMAGE_BASE_URL}${imageCID}`;

  // do something else here after firstFunction completes
  let nftMetadata = generateMetadata(
    imageDataArray.newDna,
    imageDataArray.editionCount,
    imageDataArray.attributesList,
    imageDataArray.filePath
  );
  // save locally as file
  fs.writeFileSync(
    `${outputDir}metadata/${filename}`,
    JSON.stringify(nftMetadata)
  );
  return nftMetadata;
};

// compile metadata (reads output folder images)
const compileMetadata = async (
  editionCount,
  editionSize,
  imageDataArray
) => {
  const ipfsArray = [];
  const promiseArray = [];
  const metadataList = []; // holds metadata for all NFTs (could be a session store of data)


  // const addedFiles = []
  // const ipfsOptions = {};  
  // for await (const file of ipfsClient.addAll(
  //   globSource(`${outputDir}images`, '**/*', {
  //     hidden: true,
  //   }),
  //   { ...ipfsOptions, fileImportConcurrency: 50 }
  // )) {
  //   addedFiles.push({
  //     cid: file.cid.toString(),
  //     path: file.path,
  //     size: file.size,
  //   })
  // }



  for (let i = 1; i < editionCount; i++) {
    let id = i.toString();
    let paddedHex = (
      "0000000000000000000000000000000000000000000000000000000000000000" + id
    ).slice(-64);

    // // reads output folder for images and adds to IPFS object metadata array (within promise array)
    // promiseArray.push(
    //   new Promise((res, rej) => {
    //     fs.readFile(`${outputDir}images/${id}.png`, (err, data) => {
    //       if (err) rej();
    //       ipfsArray.push({
    //         edition: id,
    //         path: `images/${paddedHex}.png`,
    //         content: data
    //       });
    //       res();
    //     });
    //   })
    // );
    let imageCID = paddedHex;
    metadataList.push(uploadMetadata(imageCID, editionSize, i, imageDataArray[i - 1]));
  }
  writeMetaData(metadataList);

  // // once all promises then upload IPFS object metadata array
  // Promise.all(promiseArray).then(() => {
  //   const metadataList = []; // holds metadata for all NFTs (could be a session store of data)

  //   ipfsArray.forEach(async (data, key) => {
  //     // const ipfsResult = await ipfsClient.add(data.content, {
  //     //   progress: (prog) => {
  //     //     // console.log(`received progress for #${data.edition}: ${prog}`
  //     //   },
  //     // }).then((result) => result).catch(err => {
  //     //   console.error(err)
  //     //   return false;
  //     // });
  //     // // console.log("IMAGE FILE PATHS:", ipfsResult);
  //     // let imageCID = ipfsResult.path;
  //     // // console.log("IMAGE CID:", imageCID);
  //     // // pass folder CID to meta data
  //     let imageCID = editionSize;
  //     metadataList.push(uploadMetadata(imageCID, editionSize, key + 1, imageDataArray[key]));
  //   });
  //   writeMetaData(metadataList);
  // });
};

module.exports = {
  generateMetadata,
  writeMetaData,
  uploadMetadata,
  compileMetadata
};
