/*******************************************************************
 * UTILITY FUNCTIONS
 * - scroll to BEGIN COLLECTION CONFIG to provide the config values
 ******************************************************************/
const fs = require("fs");
const dir = __dirname;

// load helpers file
const { baseUrl } = require('./src/helpers');

const myArgs = process.argv.slice(2) || [];

/**************************************************************
 * BEGIN COLLECTION CONFIG
 *************************************************************/

// image width in pixels
const width = 1000;
// image height in pixels
const height = 1000;
// description for NFT in metadata file
const description = "Bad Ass Fam";
// Alias for NFT in the image
const alias = "BAF";
// base url in case no unique metadata file i.e IPFS
const baseImageUri = baseUrl(process.env.VITE_IPFS_BASE_URL);
// id for edition to start from
const startEditionFrom = 1;
// amount of NFTs to generate in edition
const edition = myArgs[0];
const editionSize = typeof edition !== 'undefined' && typeof edition !== 'number' ? Number(edition) : 10;
// prefix to add to edition dna ids (to distinguish dna counts from different generation processes for the same collection)
const editionDnaPrefix = 0;

const baseDirectory = baseUrl(process.env.ART_GENERATOR_DIR);


// adds a rarity to the configuration. This is expected to correspond with a directory containing the rarity for each defined layer
// @param _id - id of the rarity
// @param _from - number in the edition to start this rarity from
// @param _to - number in the edition to generate this rarity to
// @return a rarity object used to dynamically generate the NFTs
const addRarity = (_id, _from, _to, repeat = 0) => {
  const _rarityWeight = {
    value: _id,
    from: _from,
    to: _to,
    layerPercent: {},
    repeat: repeat
  };
  return _rarityWeight;
};

// get the name without last 4 characters -> slice .png from the name
const cleanName = (_str) => {
  let name = _str.slice(0, -4);
  return name;
};

// reads the filenames of a given folder and returns it with its name and path
const getElements = (_path, _elementCount) => {
  if (fs.existsSync(_path)) {
    return fs
      .readdirSync(_path)
      .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
      .map((i) => {
        return {
          id: _elementCount,
          name: cleanName(i),
          path: `${_path}/${i}`,
        };
      });
  }
  return [];
};

//capitalize all words of a string. 
function capitalizeWords(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

// adds a layer to the configuration. The layer will hold information on all the defined parts and
// where they should be rendered in the image
// @param _id - id of the layer
// @param _position - on which x/y value to render this part
// @param _size - of the image
// @return a layer object used to dynamically generate the NFTs
const addLayer = (_id, _repeater, _position, _size) => {
  if (!_id) {
    console.log("error adding layer, parameters id required");
    return null;
  }
  if (!_position) {
    _position = { x: 0, y: 0 };
  }
  if (!_repeater) {
    _repeater = {};
  }
  if (!_size) {
    _size = { width: width, height: height };
  }
  // add two different dimension for elements:
  // - all elements with their path information
  // - only the ids mapped to their rarity
  let elements = [];
  let layerUsed = {};
  let elementCount = 0;
  let elementIdsForRarity = {};
  rarityWeights.forEach((rarityWeight) => {
    let elementsForRarity = getElements(`${baseDirectory}input/${_id}/${rarityWeight.value}`);
    if (elementsForRarity.length === 0) {
      return;
    } else {
      elementIdsForRarity[rarityWeight.value] = [];
      elementsForRarity.forEach((_elementForRarity) => {
        _elementForRarity.id = `${editionDnaPrefix}${elementCount}`;
        _elementForRarity.rarity = rarityWeight.value;
        _elementForRarity.type = capitalizeWords(_id);
        _elementForRarity.name = capitalizeWords(_elementForRarity.name);
        elements.push(_elementForRarity);
        elementIdsForRarity[rarityWeight.value].push(_elementForRarity.id);
        elementCount++;
      });
      layerUsed[rarityWeight.value] = [];
      // elements[rarityWeight.value] = elementsForRarity;
    }
  });

  if (elements.length) {
    return {
      id: _id,
      position: _position,
      size: _size,
      elements,
      repeater: generateRandomEditionNumber(_repeater),
      elementIdsForRarity,
      layerUsed
    };
  }
  return false;
};

const generateRandomEditionNumber = (repeater) => {
  const repeaterIn = parseInt(repeater.in) > 0 ? parseInt(repeater.in) : false;
  const repeaterLength = parseInt(repeater.count) > 0 ? parseInt(repeater.count) : false;
  const repeaterUpTo = parseInt(repeater.upTo) > 0 ? parseInt(repeater.upTo) : 0;
  if (!repeaterIn || !repeaterLength) {
    return [];
  }
  const length = 10000;
  const reapeatLength = parseInt(length / repeater.in);
  const layerIterations = [];

  var min = 1;
  var max = repeater.in;
  var iArray = Array.from(Array(reapeatLength).keys()).map(value => (value + 1) * repeaterIn);
  if (repeaterUpTo) {
    iArray = iArray.filter(value => value < repeaterUpTo);
    iArray.push(repeaterUpTo);
  }
  const jArray = Array.from(Array(repeater.count).keys()).map(value => value + 1);

  iArray.forEach(i => {
    max = i;
    jArray.forEach((j) => {
      const randValue = parseInt(randomNumber(min, max, layerIterations, repeaterUpTo));
      layerIterations.push(randValue);
    });
    min = max + 1;
  });
  return layerIterations;
}

function randomNumber(min, max, checkArray = [], upTo = 0) {
  upTo = parseInt(upTo) > 0 ? parseInt(upTo) : 0;
  checkArray = typeof checkArray == "object" ? checkArray : [];
  var randVal = Math.random() * (max - min) + min;
  if (checkArray.includes(randVal) || (upTo > 0 && randVal > upTo)) {
    randVal = randomNumber(min, max, checkArray, upTo);
  }
  return randVal;
}

// adds layer-specific percentages to use one vs another rarity
// @param _rarityId - the id of the rarity to specifiy
// @param _layerId - the id of the layer to specifiy
// @param _percentages - an object defining the rarities and the percentage with which a given rarity for this layer should be used
const addRarityPercentForLayer = (_percentages) => {
  if (!_percentages) {
    _percentages = { super_rare: 10, rare: 30, original: 60 };
  }

  layers.forEach((_layer) => {
    let _rarityFound = false;
    let _percentArray = [];
    rarityWeights.forEach((_rarityWeight) => {
      const _rarityCheck = _layer.elementIdsForRarity[_rarityWeight.value];
      if (typeof _rarityCheck === 'object' && _rarityCheck.length) {
        const _rarityId = _rarityWeight.value;
        _percentArray.push({
          id: _rarityId,
          layer_element_ids: _rarityCheck,
          percent: _percentages[_rarityId] || 100,
        });
      }
      _rarityWeight.layerPercent[_layer.id] = _percentArray;
      _rarityFound = true;
    })
    if (!_rarityFound) {
      console.log(
        `rarity ${_rarityId} not found, failed to add percentage information`
      );
    }
  });
  return rarityWeights;
};
// create required weights
// for each weight, call 'addRarity' with the id and from which to which element this rarity should be applied
let rarityWeights = [
  // addRarity("super_rare", 1, editionSize),
  // addRarity("rare", 1, 1),
  addRarity("original", 1, editionSize),
];

// create required layers
// for each layer, call 'addLayer' with the id and optionally the positioning and size
// the id would be the name of the folder in your input directory, e.g. 'ball' for ./input/ball
const layers = [
  addLayer("background", null, { x: 0, y: 0 }, { width: width, height: height }),
  addLayer("skin"),
  addLayer("shadow", { count: 1, in: 100, upTo: editionSize }),
  addLayer("tattoo", { count: 1, in: 200, upTo: editionSize }),
  addLayer("Dress"),
  addLayer("Dress+", { count: 1, in: 200, upTo: editionSize }),
  addLayer("Accessories", { count: 1, in: 400, upTo: editionSize }),
  addLayer("lip"),
  addLayer("Eyes"),
  addLayer("Eyes+", { count: 1, in: 50, upTo: editionSize }),
  addLayer("earing", { count: 1, in: 400, upTo: editionSize }),
  addLayer("Hand", { count: 1, in: 50, upTo: editionSize }),
  addLayer("Hair"),
  addLayer("Animal"),
].filter(layer => layer);


// provide any specific percentages that are required for a given layer and rarity level
// all provided options are used based on their percentage values to decide which layer to select from
addRarityPercentForLayer({ super_rare: 20, original: 80 });

module.exports = {
  layers,
  width,
  height,
  description,
  alias,
  baseDirectory,
  baseImageUri,
  editionSize,
  startEditionFrom,
  rarityWeights,
};
