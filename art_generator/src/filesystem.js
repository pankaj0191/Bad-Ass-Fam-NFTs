const fs = require("fs");

// import canvas
const {
  signImage,
  drawBackground,
  loadLayerImg,
  drawElement
} = require("./canvas");


// import dna
const { constructLayerToDna, createUniqueDna } = require("./dna");

// import rarity
const { createDnaListByRarity, getRarity } = require("./rarity");

// import config
const { baseDirectory } = require('../config');
const outputDir = `${baseDirectory}output/`;

const constructLoadedElements = (
  layers,
  editionCount,
  editionSize,
  rarityWeights,
) => {
  let dna = {
    loadedElements: [],
    newDna: null
  };

  // holds which dna has already been used during generation and prepares dnaList object
  const dnaListByRarity = createDnaListByRarity(rarityWeights);
  // get rarity from to config to create NFT as
  let rarity = getRarity(editionCount, editionSize);
  if(typeof dnaListByRarity[rarity] !== "object" ) return false;

  // create unique Dna
  const newCreatedDna = createUniqueDna(layers, rarity, rarityWeights, dnaListByRarity, editionCount, editionSize);
  dna.newDna = newCreatedDna;
  dnaListByRarity[rarity].push(newCreatedDna);
  // propagate information about required layer contained within config into a mapping object
  // = prepare for drawing
  let results = constructLayerToDna(newCreatedDna, layers, rarity);

  // load all images to be used by canvas
  results.forEach(layer => {
    dna.loadedElements.push(loadLayerImg(layer));
  });
  
  return dna;
};

// create image files and return back image object array
const createFile = async (
  canvas,
  ctx,
  layers,
  width,
  height,
  editionCount,
  editionSize,
  rarityWeights,
  imageDataArray,
  rarityLayerUsed
) => {
  const dna = constructLoadedElements(
    layers,
    editionCount,
    editionSize,
    rarityWeights,
    rarityLayerUsed
  );
  if(!dna) return;

  let attributesList = [];

  await Promise.all(dna.loadedElements).then(elementArray => {
    // elementArray.forEach(ele => {
    //   console.log(ele.layer)

    // })
    // create empty image
    ctx.clearRect(0, 0, width, height);
    // draw a random background color
    drawBackground(ctx, width, height);
    // store information about each layer to add it as meta information
    attributesList = [];
    // draw each layer
    elementArray.forEach(element => {
      drawElement(ctx, element);
      let selectedElement = element.layer.selectedElement;
      attributesList.push({
        trait_type: selectedElement.type,
        value: selectedElement.name,
        rarity: selectedElement.rarity,
      });
    });
    // // add an image signature as the edition count to the top left of the image
    // signImage(ctx, `#${editionCount}`);
    // write the image to the output directory
  });

  // const base64ImgData = canvas.toBuffer();
  // const base64 = base64ImgData.toString("base64");

  let filename = editionCount.toString() + ".png";
  let filetype = "image/png";

  // save locally as file
  fs.writeFileSync(`${outputDir}images/${filename}`, canvas.toBuffer(filetype));

  console.log(`Created #${editionCount.toString()}`);

  imageDataArray[editionCount] = {
    editionCount: editionCount,
    newDna: dna.newDna,
    attributesList: attributesList
  };
  
  if(editionCount == editionSize) {
    saveLayerUsedData(layers);
  }
  return imageDataArray;
};

const saveLayerUsedData = (layers) => {
  var layerUsedObject = {};
  layers.forEach(layer => {
    var keys = Object.keys(layer.layerUsed);
    keys.forEach(key => {
      layer.layerUsed[key]?.forEach(lay => {
        if(typeof layerUsedObject[lay.type] === "undefined") {
          layerUsedObject[lay.type] = {};
        }
        const layerName = layerUsedObject[lay.type][lay.rarity] || false;
        if(!layerName) {
          layerUsedObject[lay.type][lay.rarity] = [];
        }
        layerUsedObject[lay.type][lay.rarity].push({
          count: lay.count,
          path: lay.path,
          name: lay.name,
          usedInArtEdition: lay.editions
        });
      });
    })
  })
  
  fs.writeFileSync(
    `${outputDir}other_data/layers_used.json`,
    JSON.stringify(layerUsedObject)
  );
}

// upload to database
const saveToDb = async (metaHash, imageHash, editionSize) => {
  // for (let i = 1; i < editionSize + 1; i++) {
  //   let id = i.toString();
  //   let paddedHex = (
  //     "0000000000000000000000000000000000000000000000000000000000000000" + id
  //   ).slice(-64);
  //   let url = `https://ipfs.moralis.io:2053/ipfs/${metaHash}/metadata/${paddedHex}.json`;
  //   let options = { json: true };

  //   // request(url, options, (error, res, body) => {
  //   //   if (error) {
  //   //     return console.log(error);
  //   //   }

  //   //   if (!error && res.statusCode == 200) {
  //   //     // Save file reference to Moralis
  //   //     // const FileDatabase = new Moralis.Object("Metadata");
  //   //     // FileDatabase.set("edition", body.edition);
  //   //     // FileDatabase.set("name", body.name);
  //   //     // FileDatabase.set("dna", body.dna);
  //   //     // FileDatabase.set("image", body.image);
  //   //     // FileDatabase.set("attributes", body.attributes);
  //   //     // FileDatabase.set("meta_hash", metaHash);
  //   //     // FileDatabase.set("image_hash", imageHash);
  //   //     // FileDatabase.save();
  //   //   }
  //   // });
  // }
};

module.exports = {
  createFile,
  saveToDb
};
