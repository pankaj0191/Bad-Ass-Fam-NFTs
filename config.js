import NFTMinter from "./artifacts/contracts/NFT-Minter.sol/NFTMintor.json"

export default {
    "NFTMinter" : {
        "address" : import.meta.env.VITE_NFT_ADDRESS,
        "abi" : NFTMinter.abi
    }
}