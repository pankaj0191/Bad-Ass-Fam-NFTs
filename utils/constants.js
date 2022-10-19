import EthereumNetworkChains from '../data/evmChainLists.json';
import NFTMintor from '../artifacts/contracts/NFT-Minter.sol/NFTMintor.json';

export const NETWORKCHAINS = EthereumNetworkChains;

export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT || "";

export const WALLET_PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY || "";

export const NFTMINTOR_ABI = NFTMintor.abi || [];
export const NFTMINTOR_ADDRESS = import.meta.env.VITE_NFT_ADDRESS || "";
