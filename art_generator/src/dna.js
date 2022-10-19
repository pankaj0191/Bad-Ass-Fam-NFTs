const { getRandomRarity } = require("./rarity");

// check the configured layer to find information required for rendering the layer
// this maps the layer information to the generated dna and prepares it for
// drawing on a canvas
const constructLayerToDna = (_dna = [], _layers = [], _rarity) => {
  let mappedDnaToLayers = _layers.map((layer, index) => {
    let selectedElement = layer.elements.find(
      element => element.id === _dna[index]
    );
    selectedElement = selectedElement || false;
    if (!selectedElement) return false;
    getUsedLayerData(layer);
    return {
      location: layer.location,
      position: layer.position,
      size: layer.size,
      selectedElement: { ...selectedElement, rarity: _rarity }
    };
  });
  return mappedDnaToLayers.filter(dnaLayer => dnaLayer);
};

const getUsedLayerData = (layer) => {
  var keys = Object.keys(layer.elementIdsForRarity);
  keys.forEach(key => {
    if(layer.layerUsed[key]){
      layer.layerUsed[key] = layer.layerUsed[key]?.map(layerUsed => {
        let data = layer.elements.find(
          element => element.id === layerUsed.id
        );
        return {
          ...layerUsed,
          ...data,
        }
      })
    }
  });
}

// check if the given dna is contained within the given dnaList
// return true if it is, indicating that this dna is already in use and should be recalculated
const isDnaUnique = (dnaList = [], dna = []) => {
  let foundDna = dnaList.find(i => i.join("") === dna.filter(value => value).join(""));
  return foundDna == undefined ? true : false;
};

// create a dna based on the available layers for the given rarity
// use a random part for each layer
const createDna = (layers, rarity, rarityWeights, _currentEdition, _totalEditions, newDna = false) => {
  let randNum = [];
  let rarityWeight = rarityWeights.find(rw => rw.value === rarity);
  layers.forEach(layer => {
    const repeater = layer.repeater || [];
    var layerNum = "";
    const rarityIds = layer.elementIdsForRarity[rarity] || [];
    if (!rarityIds.length) {
      return;
    }
    
    if (repeater.length) {
      if (repeater.includes(_currentEdition)) {
        var num = Math.floor(Math.random() * rarityIds.length);
        layerNum = rarityIds[num];
        if (rarityWeight && rarityWeight.layerPercent[layer.id]) {
          layerNum = checkRarityRepeat(layer, rarityWeight, rarityWeights, _currentEdition, newDna);
        }
      }
    } else {
      var num = Math.floor(Math.random() * rarityIds.length);
      layerNum = rarityIds[num];
      if (rarityWeight && rarityWeight.layerPercent[layer.id]) {
        layerNum = checkRarityRepeat(layer, rarityWeight, rarityWeights, _currentEdition, newDna);
      }
    }
    randNum.push(layerNum);
  });
  return randNum;
};

const createUniqueDna = (layers, rarity, rarityWeights, dnaListByRarity, editionCount, editionSize) => {
  // calculate the NFT dna by getting a random part for each layer/feature
  // based on the ones available for the given rarity to use during generation
  let newDna = createDna(layers, rarity, rarityWeights, editionCount, editionSize);
  while (!isDnaUnique(dnaListByRarity[rarity], newDna)) {
    // recalculate dna as this has been used before.
    console.log("found duplicate DNA " + newDna.join("-") + ", recalculate...");
    newDna = createDna(layers, rarity, rarityWeights, editionCount, editionSize, newDna);
  }
  
  return newDna;
};

const checkRarityRepeat = (layer, rarityWeight, rarityWeights, _currentEdition, newDna = false) => {
  // if there is a layerPercent defined, we want to identify which dna to actually use here (instead of only picking from the same rarity)
  let rarityForLayer = getRandomRarity(rarityWeight.layerPercent[layer.id]);

  // Remove prev Dna if isDnaUnique fuction return false
  if (typeof newDna === "boolean" && newDna !== false) {
    let layerNda = layer.layerUsed[rarityForLayer];
    layer.layerUsed[rarityForLayer] = layerNda.filter(function (el) {
      return !newDna.includes(el.id);
    });
  }
  num = Math.floor(
    Math.random() * layer.elementIdsForRarity[rarityForLayer].length
  );
  let layerNum = layer.elementIdsForRarity[rarityForLayer][num];
  let currentRarityWeight = rarityWeights.find(rw => rw.value == rarityForLayer);
  let repeatLayerCount = currentRarityWeight.repeat || 0;
  let existLayer = layer.layerUsed[rarityForLayer]?.find((i) => i.id == layerNum) || {
    id: layerNum,
    count: 0,
    path: "",
    editions: []
  };

  // Check Repeat Count of the layer
  if (repeatLayerCount > 0 && repeatLayerCount <= existLayer.count) {
    layerNum = checkRarityRepeat(layer, rarityWeight, rarityWeights, _currentEdition, newDna);
  }
  let layersUsed = layer.layerUsed[rarityForLayer] || [];
  // Remove unique layer used
  layersUsed = layersUsed.filter(i => i.id != layerNum);
  // Push new layer used
  existLayer.editions.push(_currentEdition)
  layersUsed.push({ 
    ...existLayer, 
    count: existLayer.count + 1, 
  });
  // add layer ids used in the layer
  layer.layerUsed[rarityForLayer] = layersUsed;

  return layerNum;
}

module.exports = {
  constructLayerToDna,
  isDnaUnique,
  createDna,
  createUniqueDna
};
