var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { r as react, R as React, u as useNavigate, j as jsxs, a as jsx, T as ToastContainer, b as Toast, W as Web3Modal, c as Web3Provider, J as JsonRpcProvider, C as Contract, d as Wallet, F as Fragment, l as lib, B as BiCopy, O as Overlay, e as Tooltip, h as hooks, f as useLocation, N as Navbar, g as Container, L as Link, i as FaBars, k as Nav, D as Dropdown, m as Row, n as Col, o as FaDiscord, p as FaTwitter, q as FaInstagramSquare, s as BsArrowLeftCircle, t as BsArrowRightCircle, S as Swiper, E as EffectCube, P as Pagination, v as Navigation, A as Autoplay, w as SwiperSlide, x as FaEthereum, y as Button, z as Form, G as parseEther, H as axios, I as formatEther, K as Popup, M as Accordion, _ as _default, Q as Card, U as Routes$1, V as Route, X as AiOutlinePlusCircle, Y as MdOutlineCancel, Z as isAddress, $ as Wt, a0 as AOS, a1 as MouseParticles, a2 as ReactDOM, a3 as BrowserRouter } from "./vendor.4da8c1d4.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var index = "";
var App$1 = "";
var bootstrap_min = "";
var style = "";
var aos = "";
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = react.exports.useState(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      if (typeof window !== "undefined") {
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
function UseStateCallback(initial, callback = "") {
  const [state, setState] = react.exports.useState(initial);
  const cbRef = react.exports.useRef(null);
  react.exports.useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);
  const setValue = (value, stateAction = false) => {
    var newState = state;
    if (callback instanceof Function) {
      newState = callback(state, value, {
        action: "custom_callback",
        stateAction
      });
    } else if (value instanceof Function) {
      newState = value(state, value, {
        action: "set_state_callback",
        stateAction
      });
    } else {
      newState = value;
    }
    setState(newState);
  };
  return [state, setValue];
}
var EthereumNetworkChains = [
  {
    name: "Ethereum Main Network (Mainnet)",
    hex: "0x1",
    decimal: 1,
    id: "mainnet"
  },
  {
    name: "Ropsten Test Network",
    hex: "0x3",
    decimal: 3,
    id: "ropsten"
  },
  {
    name: "Rinkeby Test Network",
    hex: "0x4",
    decimal: 4,
    id: "rinkeby"
  },
  {
    name: "Goerli Test Network",
    hex: "0x5",
    decimal: 5,
    id: "goerli"
  },
  {
    name: "Kovan Test Network",
    hex: "0x2a",
    decimal: 42,
    id: "kovan"
  }
];
const _format = "hh-sol-artifact-1";
const contractName = "NFTMintor";
const sourceName = "contracts/NFT-Minter.sol";
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string"
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "GIVEAWAY_MAX_PER_USER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "Max_GiveAway",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "Whitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getPublicCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "giftedQty",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address"
      },
      {
        internalType: "bool",
        name: "isPreSale",
        type: "bool"
      }
    ],
    name: "isAddressWhiteListed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isPreSalesActivated",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isPublicSalesActivated",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxMintAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "preSaleSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "preSalesEndTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "preSalesStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pre_Sale_Cost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "publicSaleStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "publicSaleSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "public_Sale_Cost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address"
      },
      {
        internalType: "bool",
        name: "isPreSale",
        type: "bool"
      }
    ],
    name: "removeWhiteListedUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenUri",
        type: "string"
      }
    ],
    name: "requestGiveaway",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mintCount",
        type: "uint256"
      },
      {
        internalType: "string[]",
        name: "tokenUrls",
        type: "string[]"
      }
    ],
    name: "requestPreSale",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mintCount",
        type: "uint256"
      },
      {
        internalType: "string[]",
        name: "tokenUrls",
        type: "string[]"
      }
    ],
    name: "requestPublicSale",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256"
      }
    ],
    name: "setPreSalesTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256"
      }
    ],
    name: "setPublicSalesTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "params",
        type: "address[]"
      },
      {
        internalType: "bool",
        name: "isPreSale",
        type: "bool"
      }
    ],
    name: "setWhiteListed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newmaxMintAmount",
        type: "uint256"
      }
    ],
    name: "setmaxMintAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "walletOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];
const bytecode = "0x608060405266d529ae9e860000600f5566b1a2bc2ec50000601055611e4d6011556103e8601255601254601154620000389190620003a2565b601355600a6014556001601555600a6016556000601d553480156200005c57600080fd5b5060405162005c9338038062005c938339818101604052810190620000829190620002d0565b818181600090805190602001906200009c929190620001ae565b508060019080519060200190620000b5929190620001ae565b505050620000d8620000cc620000e060201b60201c565b620000e860201b60201c565b505062000527565b600033905090565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001bc906200041d565b90600052602060002090601f016020900481019282620001e057600085556200022c565b82601f10620001fb57805160ff19168380011785556200022c565b828001600101855582156200022c579182015b828111156200022b5782518255916020019190600101906200020e565b5b5090506200023b91906200023f565b5090565b5b808211156200025a57600081600090555060010162000240565b5090565b6000620002756200026f846200036c565b62000343565b9050828152602081018484840111156200028e57600080fd5b6200029b848285620003e7565b509392505050565b600082601f830112620002b557600080fd5b8151620002c78482602086016200025e565b91505092915050565b60008060408385031215620002e457600080fd5b600083015167ffffffffffffffff811115620002ff57600080fd5b6200030d85828601620002a3565b925050602083015167ffffffffffffffff8111156200032b57600080fd5b6200033985828601620002a3565b9150509250929050565b60006200034f62000362565b90506200035d828262000453565b919050565b6000604051905090565b600067ffffffffffffffff8211156200038a5762000389620004e7565b5b620003958262000516565b9050602081019050919050565b6000620003af82620003dd565b9150620003bc83620003dd565b925082821015620003d257620003d162000489565b5b828203905092915050565b6000819050919050565b60005b8381101562000407578082015181840152602081019050620003ea565b8381111562000417576000848401525b50505050565b600060028204905060018216806200043657607f821691505b602082108114156200044d576200044c620004b8565b5b50919050565b6200045e8262000516565b810181811067ffffffffffffffff8211171562000480576200047f620004e7565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61575c80620005376000396000f3fe6080604052600436106102885760003560e01c806378f5c4d81161015a578063b3e8ff73116100c1578063d05991b31161007a578063d05991b3146109cc578063d5abeb01146109f7578063e985e9c514610a22578063ed39039b14610a5f578063f2fde38b14610a88578063f72bd13014610ab157610288565b8063b3e8ff73146108ba578063b7329d2b146108e5578063b88d4fde14610910578063bd34fc5714610939578063c87b56dd14610964578063cbfd14a2146109a157610288565b80639893b946116101135780639893b946146107ac578063a01f9ea0146107d5578063a22cb465146107fe578063a78a673f14610827578063aab7954e14610852578063ae4384f11461088f57610288565b806378f5c4d81461069a5780637f00c7a6146106c55780637ff6f346146106ee5780638da5cb5b146107195780638eb504621461074457806395d89b411461078157610288565b80632f745c59116101fe57806360869d9b116101b757806360869d9b1461058a5780636352211e146105b357806365de3774146105f05780636bb7b1d91461061b57806370a0823114610646578063715018a61461068357610288565b80632f745c5914610475578063397d0c0c146104b25780633ccfd60b146104dd57806342842e0e146104e7578063438b6300146105105780634f6ccce71461054d57610288565b806318160ddd1161025057806318160ddd14610386578063239c70ae146103b157806323b872dd146103dc57806329110dfa146104055780632bfd78b41461042e5780632e055bcc1461044a57610288565b806301ffc9a71461028d57806306fdde03146102ca578063081812fc146102f5578063095ea7b31461033257806312065fe01461035b575b600080fd5b34801561029957600080fd5b506102b460048036038101906102af9190613d89565b610acd565b6040516102c19190614560565b60405180910390f35b3480156102d657600080fd5b506102df610b47565b6040516102ec919061457b565b60405180910390f35b34801561030157600080fd5b5061031c60048036038101906103179190613e1c565b610bd9565b60405161032991906144d7565b60405180910390f35b34801561033e57600080fd5b5061035960048036038101906103549190613cf9565b610c5e565b005b34801561036757600080fd5b50610370610d76565b60405161037d91906149dd565b60405180910390f35b34801561039257600080fd5b5061039b610dfa565b6040516103a891906149dd565b60405180910390f35b3480156103bd57600080fd5b506103c6610e07565b6040516103d391906149dd565b60405180910390f35b3480156103e857600080fd5b5061040360048036038101906103fe9190613bf3565b610e0d565b005b34801561041157600080fd5b5061042c60048036038101906104279190613cbd565b610e6d565b005b61044860048036038101906104439190613e45565b610fa9565b005b34801561045657600080fd5b5061045f611304565b60405161046c91906149dd565b60405180910390f35b34801561048157600080fd5b5061049c60048036038101906104979190613cf9565b61130a565b6040516104a991906149dd565b60405180910390f35b3480156104be57600080fd5b506104c76113af565b6040516104d491906149dd565b60405180910390f35b6104e56113b5565b005b3480156104f357600080fd5b5061050e60048036038101906105099190613bf3565b6114b1565b005b34801561051c57600080fd5b5061053760048036038101906105329190613b8e565b6114d1565b604051610544919061453e565b60405180910390f35b34801561055957600080fd5b50610574600480360381019061056f9190613e1c565b6115cb565b60405161058191906149dd565b60405180910390f35b34801561059657600080fd5b506105b160048036038101906105ac9190613e1c565b611662565b005b3480156105bf57600080fd5b506105da60048036038101906105d59190613e1c565b6116e8565b6040516105e791906144d7565b60405180910390f35b3480156105fc57600080fd5b5061060561179a565b60405161061291906149dd565b60405180910390f35b34801561062757600080fd5b506106306117a0565b60405161063d91906149dd565b60405180910390f35b34801561065257600080fd5b5061066d60048036038101906106689190613b8e565b6117a6565b60405161067a91906149dd565b60405180910390f35b34801561068f57600080fd5b5061069861185e565b005b3480156106a657600080fd5b506106af6118e6565b6040516106bc91906149dd565b60405180910390f35b3480156106d157600080fd5b506106ec60048036038101906106e79190613e1c565b6118ec565b005b3480156106fa57600080fd5b50610703611972565b60405161071091906149dd565b60405180910390f35b34801561072557600080fd5b5061072e61197c565b60405161073b91906144d7565b60405180910390f35b34801561075057600080fd5b5061076b60048036038101906107669190613cbd565b6119a6565b6040516107789190614560565b60405180910390f35b34801561078d57600080fd5b50610796611a74565b6040516107a3919061457b565b60405180910390f35b3480156107b857600080fd5b506107d360048036038101906107ce9190613d35565b611b06565b005b3480156107e157600080fd5b506107fc60048036038101906107f79190613ddb565b611d26565b005b34801561080a57600080fd5b5061082560048036038101906108209190613cbd565b611f65565b005b34801561083357600080fd5b5061083c611f7b565b60405161084991906149dd565b60405180910390f35b34801561085e57600080fd5b5061087960048036038101906108749190613b8e565b611f81565b6040516108869190614560565b60405180910390f35b34801561089b57600080fd5b506108a4611fa1565b6040516108b19190614560565b60405180910390f35b3480156108c657600080fd5b506108cf611fbb565b6040516108dc91906149dd565b60405180910390f35b3480156108f157600080fd5b506108fa611fc1565b6040516109079190614560565b60405180910390f35b34801561091c57600080fd5b5061093760048036038101906109329190613c42565b611ff7565b005b34801561094557600080fd5b5061094e612059565b60405161095b91906149dd565b60405180910390f35b34801561097057600080fd5b5061098b60048036038101906109869190613e1c565b61205f565b604051610998919061457b565b60405180910390f35b3480156109ad57600080fd5b506109b661214c565b6040516109c391906149dd565b60405180910390f35b3480156109d857600080fd5b506109e1612152565b6040516109ee91906149dd565b60405180910390f35b348015610a0357600080fd5b50610a0c612158565b604051610a1991906149dd565b60405180910390f35b348015610a2e57600080fd5b50610a496004803603810190610a449190613bb7565b61215e565b604051610a569190614560565b60405180910390f35b348015610a6b57600080fd5b50610a866004803603810190610a819190613e99565b6121f2565b005b348015610a9457600080fd5b50610aaf6004803603810190610aaa9190613b8e565b6122d7565b005b610acb6004803603810190610ac69190613e45565b6123cf565b005b60007f780e9d63000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610b405750610b3f8261269e565b5b9050919050565b606060008054610b5690614ced565b80601f0160208091040260200160405190810160405280929190818152602001828054610b8290614ced565b8015610bcf5780601f10610ba457610100808354040283529160200191610bcf565b820191906000526020600020905b815481529060010190602001808311610bb257829003601f168201915b5050505050905090565b6000610be482612780565b610c23576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1a9061487d565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000610c69826116e8565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610cda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd19061495d565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610cf96127ec565b73ffffffffffffffffffffffffffffffffffffffff161480610d285750610d2781610d226127ec565b61215e565b5b610d67576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d5e906147dd565b60405180910390fd5b610d7183836127f4565b505050565b6000610d806127ec565b73ffffffffffffffffffffffffffffffffffffffff16610d9e61197c565b73ffffffffffffffffffffffffffffffffffffffff1614610df4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610deb906148dd565b60405180910390fd5b47905090565b6000600880549050905090565b60165481565b610e1e610e186127ec565b826128ad565b610e5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e549061497d565b60405180910390fd5b610e6883838361298b565b505050565b610e756127ec565b73ffffffffffffffffffffffffffffffffffffffff16610e9361197c565b73ffffffffffffffffffffffffffffffffffffffff1614610ee9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee0906148dd565b60405180910390fd5b8015610f4c576000601a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610fa5565b6000601960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5050565b610fb1611fc1565b610ff0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fe79061459d565b60405180910390fd5b60125482610ffc610dfa565b6110069190614b53565b1115611047576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161103e906146fd565b60405180910390fd5b601a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166110d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ca906149bd565b60405180910390fd5b60115482601c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546111219190614b53565b1115611162576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111599061475d565b60405180910390fd5b61117782601054612bf290919063ffffffff16565b34146111b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111af9061483d565b60405180910390fd5b60005b828110156112ff5760008282815181106111fe577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015190506000815111156112eb5761125b83838151811061124e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151612c08565b6001601c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a79190614b53565b601c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5080806112f790614d50565b9150506111bb565b505050565b60125481565b6000611315836117a6565b8210611356576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161134d9061461d565b60405180910390fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b600c5481565b6113bd6127ec565b73ffffffffffffffffffffffffffffffffffffffff166113db61197c565b73ffffffffffffffffffffffffffffffffffffffff1614611431576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611428906148dd565b60405180910390fd5b600061143b61197c565b73ffffffffffffffffffffffffffffffffffffffff164760405161145e906144c2565b60006040518083038185875af1925050503d806000811461149b576040519150601f19603f3d011682016040523d82523d6000602084013e6114a0565b606091505b50509050806114ae57600080fd5b50565b6114cc83838360405180602001604052806000815250611ff7565b505050565b606060006114de836117a6565b905060008167ffffffffffffffff811115611522577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156115505781602001602082028036833780820191505090505b50905060005b828110156115c057611568858261130a565b8282815181106115a1577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080806115b890614d50565b915050611556565b508092505050919050565b60006115d5610dfa565b8210611616576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161160d9061499d565b60405180910390fd5b60088281548110611650577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002001549050919050565b61166a6127ec565b73ffffffffffffffffffffffffffffffffffffffff1661168861197c565b73ffffffffffffffffffffffffffffffffffffffff16146116de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116d5906148dd565b60405180910390fd5b80600b8190555050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611791576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117889061481d565b60405180910390fd5b80915050919050565b60105481565b600b5481565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611817576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161180e906147fd565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6118666127ec565b73ffffffffffffffffffffffffffffffffffffffff1661188461197c565b73ffffffffffffffffffffffffffffffffffffffff16146118da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118d1906148dd565b60405180910390fd5b6118e46000612c38565b565b600f5481565b6118f46127ec565b73ffffffffffffffffffffffffffffffffffffffff1661191261197c565b73ffffffffffffffffffffffffffffffffffffffff1614611968576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161195f906148dd565b60405180910390fd5b8060168190555050565b6000600f54905090565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008115611a1057601a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611a06576000611a09565b60015b9050611a6e565b601960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611a68576000611a6b565b60015b90505b92915050565b606060018054611a8390614ced565b80601f0160208091040260200160405190810160405280929190818152602001828054611aaf90614ced565b8015611afc5780601f10611ad157610100808354040283529160200191611afc565b820191906000526020600020905b815481529060010190602001808311611adf57829003601f168201915b5050505050905090565b611b0e6127ec565b73ffffffffffffffffffffffffffffffffffffffff16611b2c61197c565b73ffffffffffffffffffffffffffffffffffffffff1614611b82576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b79906148dd565b60405180910390fd5b6000825111611bc6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bbd906145dd565b60405180910390fd5b60005b8251811015611d21578115611c75576001601a6000858481518110611c17577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611d0e565b600160196000858481518110611cb4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b8080611d1990614d50565b915050611bc9565b505050565b601454611d31610dfa565b10611d71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d68906147bd565b60405180910390fd5b601960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611dfd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611df49061465d565b60405180910390fd5b601554601860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410611e80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e779061477d565b60405180910390fd5b60008190506000815111611ec9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ec09061493d565b60405180910390fd5b611ed282612c08565b6001601860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611f1e9190614b53565b601860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b611f77611f706127ec565b8383612cfe565b5050565b600d5481565b60196020528060005260406000206000915054906101000a900460ff1681565b600080600b54118015611fb65750600b544210155b905090565b60155481565b600080600c54118015611fd657506000600d54115b8015611fe45750600c544210155b8015611ff25750600d544211155b905090565b6120086120026127ec565b836128ad565b612047576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161203e9061497d565b60405180910390fd5b61205384848484612e6b565b50505050565b601d5481565b606061206a82612780565b6120a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120a0906148fd565b60405180910390fd5b6017600083815260200190815260200160002080546120c790614ced565b80601f01602080910402602001604051908101604052809291908181526020018280546120f390614ced565b80156121405780601f1061211557610100808354040283529160200191612140565b820191906000526020600020905b81548152906001019060200180831161212357829003601f168201915b50505050509050919050565b60135481565b60145481565b60115481565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6121fa6127ec565b73ffffffffffffffffffffffffffffffffffffffff1661221861197c565b73ffffffffffffffffffffffffffffffffffffffff161461226e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612265906148dd565b60405180910390fd5b818110156122b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122a8906145bd565b60405180910390fd5b81600c8190555080600d81905550610e10816122cd9190614b53565b600b819055505050565b6122df6127ec565b73ffffffffffffffffffffffffffffffffffffffff166122fd61197c565b73ffffffffffffffffffffffffffffffffffffffff1614612353576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161234a906148dd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156123c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016123ba9061467d565b60405180910390fd5b6123cc81612c38565b50565b6123d7611fa1565b612416576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161240d906146dd565b60405180910390fd5b60135482612422610dfa565b61242c9190614b53565b111561246d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124649061491d565b60405180910390fd5b60165482601b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546124bb9190614b53565b11156124fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124f3906145fd565b60405180910390fd5b61251182600f54612bf290919063ffffffff16565b3414612552576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612549906148bd565b60405180910390fd5b60005b82811015612699576000828281518110612598577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101519050600081511115612685576125f58383815181106125e8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151612c08565b6001601b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546126419190614b53565b601b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b50808061269190614d50565b915050612555565b505050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061276957507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80612779575061277882612ec7565b5b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16612867836116e8565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006128b882612780565b6128f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128ee9061479d565b60405180910390fd5b6000612902836116e8565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061297157508373ffffffffffffffffffffffffffffffffffffffff1661295984610bd9565b73ffffffffffffffffffffffffffffffffffffffff16145b806129825750612981818561215e565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff166129ab826116e8565b73ffffffffffffffffffffffffffffffffffffffff1614612a01576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016129f89061469d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415612a71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612a689061471d565b60405180910390fd5b612a7c838383612f31565b612a876000826127f4565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254612ad79190614c03565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254612b2e9190614b53565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4612bed838383613045565b505050565b60008183612c009190614ba9565b905092915050565b612c12600e61304a565b6000612c1e600e613060565b9050612c2a338261306e565b612c34818361308c565b5050565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415612d6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d649061473d565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051612e5e9190614560565b60405180910390a3505050565b612e7684848461298b565b612e8284848484613100565b612ec1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612eb89061463d565b60405180910390fd5b50505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b612f3c838383613297565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415612f7f57612f7a8161329c565b612fbe565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614612fbd57612fbc83826132e5565b5b5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561300157612ffc81613452565b613040565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161461303f5761303e8282613595565b5b5b505050565b505050565b6001816000016000828254019250508190555050565b600081600001549050919050565b613088828260405180602001604052806000815250613614565b5050565b61309582612780565b6130d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016130cb9061489d565b60405180910390fd5b806017600084815260200190815260200160002090805190602001906130fb92919061386c565b505050565b60006131218473ffffffffffffffffffffffffffffffffffffffff1661366f565b1561328a578373ffffffffffffffffffffffffffffffffffffffff1663150b7a0261314a6127ec565b8786866040518563ffffffff1660e01b815260040161316c94939291906144f2565b602060405180830381600087803b15801561318657600080fd5b505af19250505080156131b757506040513d601f19601f820116820180604052508101906131b49190613db2565b60015b61323a573d80600081146131e7576040519150601f19603f3d011682016040523d82523d6000602084013e6131ec565b606091505b50600081511415613232576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016132299061463d565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161491505061328f565b600190505b949350505050565b505050565b6008805490506009600083815260200190815260200160002081905550600881908060018154018082558091505060019003906000526020600020016000909190919091505550565b600060016132f2846117a6565b6132fc9190614c03565b90506000600760008481526020019081526020016000205490508181146133e1576000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054905080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550816007600083815260200190815260200160002081905550505b6007600084815260200190815260200160002060009055600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000905550505050565b600060016008805490506134669190614c03565b90506000600960008481526020019081526020016000205490506000600883815481106134bc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020015490508060088381548110613504577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020018190555081600960008381526020019081526020016000208190555060096000858152602001908152602001600020600090556008805480613579577f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b6001900381819060005260206000200160009055905550505050565b60006135a0836117a6565b905081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002081905550806007600084815260200190815260200160002081905550505050565b61361e8383613692565b61362b6000848484613100565b61366a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016136619061463d565b60405180910390fd5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415613702576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016136f99061485d565b60405180910390fd5b61370b81612780565b1561374b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613742906146bd565b60405180910390fd5b61375760008383612f31565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546137a79190614b53565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461386860008383613045565b5050565b82805461387890614ced565b90600052602060002090601f01602090048101928261389a57600085556138e1565b82601f106138b357805160ff19168380011785556138e1565b828001600101855582156138e1579182015b828111156138e05782518255916020019190600101906138c5565b5b5090506138ee91906138f2565b5090565b5b8082111561390b5760008160009055506001016138f3565b5090565b600061392261391d84614a1d565b6149f8565b9050808382526020820190508285602086028201111561394157600080fd5b60005b8581101561397157816139578882613a7d565b845260208401935060208301925050600181019050613944565b5050509392505050565b600061398e61398984614a49565b6149f8565b905080838252602082019050828560208602820111156139ad57600080fd5b60005b858110156139f757813567ffffffffffffffff8111156139cf57600080fd5b8086016139dc8982613b4f565b855260208501945060208401935050506001810190506139b0565b5050509392505050565b6000613a14613a0f84614a75565b6149f8565b905082815260208101848484011115613a2c57600080fd5b613a37848285614cab565b509392505050565b6000613a52613a4d84614aa6565b6149f8565b905082815260208101848484011115613a6a57600080fd5b613a75848285614cab565b509392505050565b600081359050613a8c816156ca565b92915050565b600082601f830112613aa357600080fd5b8135613ab384826020860161390f565b91505092915050565b600082601f830112613acd57600080fd5b8135613add84826020860161397b565b91505092915050565b600081359050613af5816156e1565b92915050565b600081359050613b0a816156f8565b92915050565b600081519050613b1f816156f8565b92915050565b600082601f830112613b3657600080fd5b8135613b46848260208601613a01565b91505092915050565b600082601f830112613b6057600080fd5b8135613b70848260208601613a3f565b91505092915050565b600081359050613b888161570f565b92915050565b600060208284031215613ba057600080fd5b6000613bae84828501613a7d565b91505092915050565b60008060408385031215613bca57600080fd5b6000613bd885828601613a7d565b9250506020613be985828601613a7d565b9150509250929050565b600080600060608486031215613c0857600080fd5b6000613c1686828701613a7d565b9350506020613c2786828701613a7d565b9250506040613c3886828701613b79565b9150509250925092565b60008060008060808587031215613c5857600080fd5b6000613c6687828801613a7d565b9450506020613c7787828801613a7d565b9350506040613c8887828801613b79565b925050606085013567ffffffffffffffff811115613ca557600080fd5b613cb187828801613b25565b91505092959194509250565b60008060408385031215613cd057600080fd5b6000613cde85828601613a7d565b9250506020613cef85828601613ae6565b9150509250929050565b60008060408385031215613d0c57600080fd5b6000613d1a85828601613a7d565b9250506020613d2b85828601613b79565b9150509250929050565b60008060408385031215613d4857600080fd5b600083013567ffffffffffffffff811115613d6257600080fd5b613d6e85828601613a92565b9250506020613d7f85828601613ae6565b9150509250929050565b600060208284031215613d9b57600080fd5b6000613da984828501613afb565b91505092915050565b600060208284031215613dc457600080fd5b6000613dd284828501613b10565b91505092915050565b600060208284031215613ded57600080fd5b600082013567ffffffffffffffff811115613e0757600080fd5b613e1384828501613b4f565b91505092915050565b600060208284031215613e2e57600080fd5b6000613e3c84828501613b79565b91505092915050565b60008060408385031215613e5857600080fd5b6000613e6685828601613b79565b925050602083013567ffffffffffffffff811115613e8357600080fd5b613e8f85828601613abc565b9150509250929050565b60008060408385031215613eac57600080fd5b6000613eba85828601613b79565b9250506020613ecb85828601613b79565b9150509250929050565b6000613ee183836144a4565b60208301905092915050565b613ef681614c37565b82525050565b6000613f0782614ae7565b613f118185614b15565b9350613f1c83614ad7565b8060005b83811015613f4d578151613f348882613ed5565b9750613f3f83614b08565b925050600181019050613f20565b5085935050505092915050565b613f6381614c49565b82525050565b6000613f7482614af2565b613f7e8185614b26565b9350613f8e818560208601614cba565b613f9781614e26565b840191505092915050565b6000613fad82614afd565b613fb78185614b42565b9350613fc7818560208601614cba565b613fd081614e26565b840191505092915050565b6000613fe8602983614b42565b9150613ff382614e37565b604082019050919050565b600061400b603c83614b42565b915061401682614e86565b604082019050919050565b600061402e601d83614b42565b915061403982614ed5565b602082019050919050565b6000614051601283614b42565b915061405c82614efe565b602082019050919050565b6000614074602b83614b42565b915061407f82614f27565b604082019050919050565b6000614097603283614b42565b91506140a282614f76565b604082019050919050565b60006140ba603783614b42565b91506140c582614fc5565b604082019050919050565b60006140dd602683614b42565b91506140e882615014565b604082019050919050565b6000614100602583614b42565b915061410b82615063565b604082019050919050565b6000614123601c83614b42565b915061412e826150b2565b602082019050919050565b6000614146602c83614b42565b9150614151826150db565b604082019050919050565b6000614169601683614b42565b91506141748261512a565b602082019050919050565b600061418c602483614b42565b915061419782615153565b604082019050919050565b60006141af601983614b42565b91506141ba826151a2565b602082019050919050565b60006141d2600e83614b42565b91506141dd826151cb565b602082019050919050565b60006141f5602783614b42565b9150614200826151f4565b604082019050919050565b6000614218602c83614b42565b915061422382615243565b604082019050919050565b600061423b601683614b42565b915061424682615292565b602082019050919050565b600061425e603883614b42565b9150614269826152bb565b604082019050919050565b6000614281602a83614b42565b915061428c8261530a565b604082019050919050565b60006142a4602983614b42565b91506142af82615359565b604082019050919050565b60006142c7600d83614b42565b91506142d2826153a8565b602082019050919050565b60006142ea602083614b42565b91506142f5826153d1565b602082019050919050565b600061430d602c83614b42565b9150614318826153fa565b604082019050919050565b6000614330602c83614b42565b915061433b82615449565b604082019050919050565b6000614353600d83614b42565b915061435e82615498565b602082019050919050565b6000614376602083614b42565b9150614381826154c1565b602082019050919050565b6000614399602f83614b42565b91506143a4826154ea565b604082019050919050565b60006143bc601783614b42565b91506143c782615539565b602082019050919050565b60006143df601b83614b42565b91506143ea82615562565b602082019050919050565b6000614402602183614b42565b915061440d8261558b565b604082019050919050565b6000614425600083614b37565b9150614430826155da565b600082019050919050565b6000614448603183614b42565b9150614453826155dd565b604082019050919050565b600061446b602c83614b42565b91506144768261562c565b604082019050919050565b600061448e602983614b42565b91506144998261567b565b604082019050919050565b6144ad81614ca1565b82525050565b6144bc81614ca1565b82525050565b60006144cd82614418565b9150819050919050565b60006020820190506144ec6000830184613eed565b92915050565b60006080820190506145076000830187613eed565b6145146020830186613eed565b61452160408301856144b3565b81810360608301526145338184613f69565b905095945050505050565b600060208201905081810360008301526145588184613efc565b905092915050565b60006020820190506145756000830184613f5a565b92915050565b600060208201905081810360008301526145958184613fa2565b905092915050565b600060208201905081810360008301526145b681613fdb565b9050919050565b600060208201905081810360008301526145d681613ffe565b9050919050565b600060208201905081810360008301526145f681614021565b9050919050565b6000602082019050818103600083015261461681614044565b9050919050565b6000602082019050818103600083015261463681614067565b9050919050565b600060208201905081810360008301526146568161408a565b9050919050565b60006020820190508181036000830152614676816140ad565b9050919050565b60006020820190508181036000830152614696816140d0565b9050919050565b600060208201905081810360008301526146b6816140f3565b9050919050565b600060208201905081810360008301526146d681614116565b9050919050565b600060208201905081810360008301526146f681614139565b9050919050565b600060208201905081810360008301526147168161415c565b9050919050565b600060208201905081810360008301526147368161417f565b9050919050565b60006020820190508181036000830152614756816141a2565b9050919050565b60006020820190508181036000830152614776816141c5565b9050919050565b60006020820190508181036000830152614796816141e8565b9050919050565b600060208201905081810360008301526147b68161420b565b9050919050565b600060208201905081810360008301526147d68161422e565b9050919050565b600060208201905081810360008301526147f681614251565b9050919050565b6000602082019050818103600083015261481681614274565b9050919050565b6000602082019050818103600083015261483681614297565b9050919050565b60006020820190508181036000830152614856816142ba565b9050919050565b60006020820190508181036000830152614876816142dd565b9050919050565b6000602082019050818103600083015261489681614300565b9050919050565b600060208201905081810360008301526148b681614323565b9050919050565b600060208201905081810360008301526148d681614346565b9050919050565b600060208201905081810360008301526148f681614369565b9050919050565b600060208201905081810360008301526149168161438c565b9050919050565b60006020820190508181036000830152614936816143af565b9050919050565b60006020820190508181036000830152614956816143d2565b9050919050565b60006020820190508181036000830152614976816143f5565b9050919050565b600060208201905081810360008301526149968161443b565b9050919050565b600060208201905081810360008301526149b68161445e565b9050919050565b600060208201905081810360008301526149d681614481565b9050919050565b60006020820190506149f260008301846144b3565b92915050565b6000614a02614a13565b9050614a0e8282614d1f565b919050565b6000604051905090565b600067ffffffffffffffff821115614a3857614a37614df7565b5b602082029050602081019050919050565b600067ffffffffffffffff821115614a6457614a63614df7565b5b602082029050602081019050919050565b600067ffffffffffffffff821115614a9057614a8f614df7565b5b614a9982614e26565b9050602081019050919050565b600067ffffffffffffffff821115614ac157614ac0614df7565b5b614aca82614e26565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b6000614b5e82614ca1565b9150614b6983614ca1565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115614b9e57614b9d614d99565b5b828201905092915050565b6000614bb482614ca1565b9150614bbf83614ca1565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615614bf857614bf7614d99565b5b828202905092915050565b6000614c0e82614ca1565b9150614c1983614ca1565b925082821015614c2c57614c2b614d99565b5b828203905092915050565b6000614c4282614c81565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015614cd8578082015181840152602081019050614cbd565b83811115614ce7576000848401525b50505050565b60006002820490506001821680614d0557607f821691505b60208210811415614d1957614d18614dc8565b5b50919050565b614d2882614e26565b810181811067ffffffffffffffff82111715614d4757614d46614df7565b5b80604052505050565b6000614d5b82614ca1565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415614d8e57614d8d614d99565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f50726553616c657341637469766174696f6e3a2053616c65206973206e6f742060008201527f6163746976617465640000000000000000000000000000000000000000000000602082015250565b7f50726553616c657341637469766174696f6e3a20456e642074696d652073686f60008201527f756c64206265206c61746572207468616e2073746172742074696d6500000000602082015250565b7f506c6561736520696e707574207768696c74656c697374206172726179000000600082015250565b7f4f766572666c6f7720323020746f6b656e730000000000000000000000000000600082015250565b7f455243373231456e756d657261626c653a206f776e657220696e646578206f7560008201527f74206f6620626f756e6473000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f546869732061646472657373206973206e6f7420696e636c7564656420696e2060008201527f66616d696c792f667269656e642077686974656c697374000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b7f5075626c696353616c657341637469766174696f6e3a2053616c65206973206e60008201527f6f74206163746976617465640000000000000000000000000000000000000000602082015250565b7f4d6178696d756d20537570706c79207265616368656400000000000000000000600082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f546f6b656e204f766572666c6f77000000000000000000000000000000000000600082015250565b7f596f752063616e206765742061206769766561776179206e6f206d6f7265207460008201527f68616e206f6e6500000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4d6178696d756d20737570706c79207265616368656400000000000000000000600082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b7f496e76616c69642046756e647300000000000000000000000000000000000000600082015250565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4552433732314d657461646174613a2055524920736574206f66206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f496e76616c69642066756e647300000000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b7f4d6178696d756d20737570706c7920726561636865642e000000000000000000600082015250565b7f546f6b656e20555249206d757374206265207265717569726564210000000000600082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b50565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b7f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60008201527f7574206f6620626f756e64730000000000000000000000000000000000000000602082015250565b7f546869732061646472657373206973206e6f7420696e636c7564656420696e2060008201527f77686974656c6973740000000000000000000000000000000000000000000000602082015250565b6156d381614c37565b81146156de57600080fd5b50565b6156ea81614c49565b81146156f557600080fd5b50565b61570181614c55565b811461570c57600080fd5b50565b61571881614ca1565b811461572357600080fd5b5056fea2646970667358221220e82fceda9d228d7e2c092f1db4c418ade9466b30e8a7fa97459ce2007c95f64764736f6c63430008040033";
const deployedBytecode = "0x6080604052600436106102885760003560e01c806378f5c4d81161015a578063b3e8ff73116100c1578063d05991b31161007a578063d05991b3146109cc578063d5abeb01146109f7578063e985e9c514610a22578063ed39039b14610a5f578063f2fde38b14610a88578063f72bd13014610ab157610288565b8063b3e8ff73146108ba578063b7329d2b146108e5578063b88d4fde14610910578063bd34fc5714610939578063c87b56dd14610964578063cbfd14a2146109a157610288565b80639893b946116101135780639893b946146107ac578063a01f9ea0146107d5578063a22cb465146107fe578063a78a673f14610827578063aab7954e14610852578063ae4384f11461088f57610288565b806378f5c4d81461069a5780637f00c7a6146106c55780637ff6f346146106ee5780638da5cb5b146107195780638eb504621461074457806395d89b411461078157610288565b80632f745c59116101fe57806360869d9b116101b757806360869d9b1461058a5780636352211e146105b357806365de3774146105f05780636bb7b1d91461061b57806370a0823114610646578063715018a61461068357610288565b80632f745c5914610475578063397d0c0c146104b25780633ccfd60b146104dd57806342842e0e146104e7578063438b6300146105105780634f6ccce71461054d57610288565b806318160ddd1161025057806318160ddd14610386578063239c70ae146103b157806323b872dd146103dc57806329110dfa146104055780632bfd78b41461042e5780632e055bcc1461044a57610288565b806301ffc9a71461028d57806306fdde03146102ca578063081812fc146102f5578063095ea7b31461033257806312065fe01461035b575b600080fd5b34801561029957600080fd5b506102b460048036038101906102af9190613d89565b610acd565b6040516102c19190614560565b60405180910390f35b3480156102d657600080fd5b506102df610b47565b6040516102ec919061457b565b60405180910390f35b34801561030157600080fd5b5061031c60048036038101906103179190613e1c565b610bd9565b60405161032991906144d7565b60405180910390f35b34801561033e57600080fd5b5061035960048036038101906103549190613cf9565b610c5e565b005b34801561036757600080fd5b50610370610d76565b60405161037d91906149dd565b60405180910390f35b34801561039257600080fd5b5061039b610dfa565b6040516103a891906149dd565b60405180910390f35b3480156103bd57600080fd5b506103c6610e07565b6040516103d391906149dd565b60405180910390f35b3480156103e857600080fd5b5061040360048036038101906103fe9190613bf3565b610e0d565b005b34801561041157600080fd5b5061042c60048036038101906104279190613cbd565b610e6d565b005b61044860048036038101906104439190613e45565b610fa9565b005b34801561045657600080fd5b5061045f611304565b60405161046c91906149dd565b60405180910390f35b34801561048157600080fd5b5061049c60048036038101906104979190613cf9565b61130a565b6040516104a991906149dd565b60405180910390f35b3480156104be57600080fd5b506104c76113af565b6040516104d491906149dd565b60405180910390f35b6104e56113b5565b005b3480156104f357600080fd5b5061050e60048036038101906105099190613bf3565b6114b1565b005b34801561051c57600080fd5b5061053760048036038101906105329190613b8e565b6114d1565b604051610544919061453e565b60405180910390f35b34801561055957600080fd5b50610574600480360381019061056f9190613e1c565b6115cb565b60405161058191906149dd565b60405180910390f35b34801561059657600080fd5b506105b160048036038101906105ac9190613e1c565b611662565b005b3480156105bf57600080fd5b506105da60048036038101906105d59190613e1c565b6116e8565b6040516105e791906144d7565b60405180910390f35b3480156105fc57600080fd5b5061060561179a565b60405161061291906149dd565b60405180910390f35b34801561062757600080fd5b506106306117a0565b60405161063d91906149dd565b60405180910390f35b34801561065257600080fd5b5061066d60048036038101906106689190613b8e565b6117a6565b60405161067a91906149dd565b60405180910390f35b34801561068f57600080fd5b5061069861185e565b005b3480156106a657600080fd5b506106af6118e6565b6040516106bc91906149dd565b60405180910390f35b3480156106d157600080fd5b506106ec60048036038101906106e79190613e1c565b6118ec565b005b3480156106fa57600080fd5b50610703611972565b60405161071091906149dd565b60405180910390f35b34801561072557600080fd5b5061072e61197c565b60405161073b91906144d7565b60405180910390f35b34801561075057600080fd5b5061076b60048036038101906107669190613cbd565b6119a6565b6040516107789190614560565b60405180910390f35b34801561078d57600080fd5b50610796611a74565b6040516107a3919061457b565b60405180910390f35b3480156107b857600080fd5b506107d360048036038101906107ce9190613d35565b611b06565b005b3480156107e157600080fd5b506107fc60048036038101906107f79190613ddb565b611d26565b005b34801561080a57600080fd5b5061082560048036038101906108209190613cbd565b611f65565b005b34801561083357600080fd5b5061083c611f7b565b60405161084991906149dd565b60405180910390f35b34801561085e57600080fd5b5061087960048036038101906108749190613b8e565b611f81565b6040516108869190614560565b60405180910390f35b34801561089b57600080fd5b506108a4611fa1565b6040516108b19190614560565b60405180910390f35b3480156108c657600080fd5b506108cf611fbb565b6040516108dc91906149dd565b60405180910390f35b3480156108f157600080fd5b506108fa611fc1565b6040516109079190614560565b60405180910390f35b34801561091c57600080fd5b5061093760048036038101906109329190613c42565b611ff7565b005b34801561094557600080fd5b5061094e612059565b60405161095b91906149dd565b60405180910390f35b34801561097057600080fd5b5061098b60048036038101906109869190613e1c565b61205f565b604051610998919061457b565b60405180910390f35b3480156109ad57600080fd5b506109b661214c565b6040516109c391906149dd565b60405180910390f35b3480156109d857600080fd5b506109e1612152565b6040516109ee91906149dd565b60405180910390f35b348015610a0357600080fd5b50610a0c612158565b604051610a1991906149dd565b60405180910390f35b348015610a2e57600080fd5b50610a496004803603810190610a449190613bb7565b61215e565b604051610a569190614560565b60405180910390f35b348015610a6b57600080fd5b50610a866004803603810190610a819190613e99565b6121f2565b005b348015610a9457600080fd5b50610aaf6004803603810190610aaa9190613b8e565b6122d7565b005b610acb6004803603810190610ac69190613e45565b6123cf565b005b60007f780e9d63000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610b405750610b3f8261269e565b5b9050919050565b606060008054610b5690614ced565b80601f0160208091040260200160405190810160405280929190818152602001828054610b8290614ced565b8015610bcf5780601f10610ba457610100808354040283529160200191610bcf565b820191906000526020600020905b815481529060010190602001808311610bb257829003601f168201915b5050505050905090565b6000610be482612780565b610c23576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1a9061487d565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000610c69826116e8565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610cda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd19061495d565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610cf96127ec565b73ffffffffffffffffffffffffffffffffffffffff161480610d285750610d2781610d226127ec565b61215e565b5b610d67576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d5e906147dd565b60405180910390fd5b610d7183836127f4565b505050565b6000610d806127ec565b73ffffffffffffffffffffffffffffffffffffffff16610d9e61197c565b73ffffffffffffffffffffffffffffffffffffffff1614610df4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610deb906148dd565b60405180910390fd5b47905090565b6000600880549050905090565b60165481565b610e1e610e186127ec565b826128ad565b610e5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e549061497d565b60405180910390fd5b610e6883838361298b565b505050565b610e756127ec565b73ffffffffffffffffffffffffffffffffffffffff16610e9361197c565b73ffffffffffffffffffffffffffffffffffffffff1614610ee9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee0906148dd565b60405180910390fd5b8015610f4c576000601a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610fa5565b6000601960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5050565b610fb1611fc1565b610ff0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fe79061459d565b60405180910390fd5b60125482610ffc610dfa565b6110069190614b53565b1115611047576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161103e906146fd565b60405180910390fd5b601a60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166110d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ca906149bd565b60405180910390fd5b60115482601c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546111219190614b53565b1115611162576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111599061475d565b60405180910390fd5b61117782601054612bf290919063ffffffff16565b34146111b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111af9061483d565b60405180910390fd5b60005b828110156112ff5760008282815181106111fe577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015190506000815111156112eb5761125b83838151811061124e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151612c08565b6001601c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112a79190614b53565b601c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5080806112f790614d50565b9150506111bb565b505050565b60125481565b6000611315836117a6565b8210611356576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161134d9061461d565b60405180910390fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b600c5481565b6113bd6127ec565b73ffffffffffffffffffffffffffffffffffffffff166113db61197c565b73ffffffffffffffffffffffffffffffffffffffff1614611431576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611428906148dd565b60405180910390fd5b600061143b61197c565b73ffffffffffffffffffffffffffffffffffffffff164760405161145e906144c2565b60006040518083038185875af1925050503d806000811461149b576040519150601f19603f3d011682016040523d82523d6000602084013e6114a0565b606091505b50509050806114ae57600080fd5b50565b6114cc83838360405180602001604052806000815250611ff7565b505050565b606060006114de836117a6565b905060008167ffffffffffffffff811115611522577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156115505781602001602082028036833780820191505090505b50905060005b828110156115c057611568858261130a565b8282815181106115a1577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080806115b890614d50565b915050611556565b508092505050919050565b60006115d5610dfa565b8210611616576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161160d9061499d565b60405180910390fd5b60088281548110611650577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002001549050919050565b61166a6127ec565b73ffffffffffffffffffffffffffffffffffffffff1661168861197c565b73ffffffffffffffffffffffffffffffffffffffff16146116de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116d5906148dd565b60405180910390fd5b80600b8190555050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611791576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117889061481d565b60405180910390fd5b80915050919050565b60105481565b600b5481565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611817576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161180e906147fd565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6118666127ec565b73ffffffffffffffffffffffffffffffffffffffff1661188461197c565b73ffffffffffffffffffffffffffffffffffffffff16146118da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118d1906148dd565b60405180910390fd5b6118e46000612c38565b565b600f5481565b6118f46127ec565b73ffffffffffffffffffffffffffffffffffffffff1661191261197c565b73ffffffffffffffffffffffffffffffffffffffff1614611968576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161195f906148dd565b60405180910390fd5b8060168190555050565b6000600f54905090565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008115611a1057601a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611a06576000611a09565b60015b9050611a6e565b601960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611a68576000611a6b565b60015b90505b92915050565b606060018054611a8390614ced565b80601f0160208091040260200160405190810160405280929190818152602001828054611aaf90614ced565b8015611afc5780601f10611ad157610100808354040283529160200191611afc565b820191906000526020600020905b815481529060010190602001808311611adf57829003601f168201915b5050505050905090565b611b0e6127ec565b73ffffffffffffffffffffffffffffffffffffffff16611b2c61197c565b73ffffffffffffffffffffffffffffffffffffffff1614611b82576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b79906148dd565b60405180910390fd5b6000825111611bc6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bbd906145dd565b60405180910390fd5b60005b8251811015611d21578115611c75576001601a6000858481518110611c17577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611d0e565b600160196000858481518110611cb4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b8080611d1990614d50565b915050611bc9565b505050565b601454611d31610dfa565b10611d71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d68906147bd565b60405180910390fd5b601960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611dfd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611df49061465d565b60405180910390fd5b601554601860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410611e80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e779061477d565b60405180910390fd5b60008190506000815111611ec9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ec09061493d565b60405180910390fd5b611ed282612c08565b6001601860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611f1e9190614b53565b601860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b611f77611f706127ec565b8383612cfe565b5050565b600d5481565b60196020528060005260406000206000915054906101000a900460ff1681565b600080600b54118015611fb65750600b544210155b905090565b60155481565b600080600c54118015611fd657506000600d54115b8015611fe45750600c544210155b8015611ff25750600d544211155b905090565b6120086120026127ec565b836128ad565b612047576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161203e9061497d565b60405180910390fd5b61205384848484612e6b565b50505050565b601d5481565b606061206a82612780565b6120a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120a0906148fd565b60405180910390fd5b6017600083815260200190815260200160002080546120c790614ced565b80601f01602080910402602001604051908101604052809291908181526020018280546120f390614ced565b80156121405780601f1061211557610100808354040283529160200191612140565b820191906000526020600020905b81548152906001019060200180831161212357829003601f168201915b50505050509050919050565b60135481565b60145481565b60115481565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6121fa6127ec565b73ffffffffffffffffffffffffffffffffffffffff1661221861197c565b73ffffffffffffffffffffffffffffffffffffffff161461226e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612265906148dd565b60405180910390fd5b818110156122b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122a8906145bd565b60405180910390fd5b81600c8190555080600d81905550610e10816122cd9190614b53565b600b819055505050565b6122df6127ec565b73ffffffffffffffffffffffffffffffffffffffff166122fd61197c565b73ffffffffffffffffffffffffffffffffffffffff1614612353576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161234a906148dd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156123c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016123ba9061467d565b60405180910390fd5b6123cc81612c38565b50565b6123d7611fa1565b612416576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161240d906146dd565b60405180910390fd5b60135482612422610dfa565b61242c9190614b53565b111561246d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124649061491d565b60405180910390fd5b60165482601b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546124bb9190614b53565b11156124fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124f3906145fd565b60405180910390fd5b61251182600f54612bf290919063ffffffff16565b3414612552576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612549906148bd565b60405180910390fd5b60005b82811015612699576000828281518110612598577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101519050600081511115612685576125f58383815181106125e8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151612c08565b6001601b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546126419190614b53565b601b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b50808061269190614d50565b915050612555565b505050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061276957507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80612779575061277882612ec7565b5b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16612867836116e8565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006128b882612780565b6128f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128ee9061479d565b60405180910390fd5b6000612902836116e8565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061297157508373ffffffffffffffffffffffffffffffffffffffff1661295984610bd9565b73ffffffffffffffffffffffffffffffffffffffff16145b806129825750612981818561215e565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff166129ab826116e8565b73ffffffffffffffffffffffffffffffffffffffff1614612a01576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016129f89061469d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415612a71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612a689061471d565b60405180910390fd5b612a7c838383612f31565b612a876000826127f4565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254612ad79190614c03565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254612b2e9190614b53565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4612bed838383613045565b505050565b60008183612c009190614ba9565b905092915050565b612c12600e61304a565b6000612c1e600e613060565b9050612c2a338261306e565b612c34818361308c565b5050565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415612d6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d649061473d565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051612e5e9190614560565b60405180910390a3505050565b612e7684848461298b565b612e8284848484613100565b612ec1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612eb89061463d565b60405180910390fd5b50505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b612f3c838383613297565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415612f7f57612f7a8161329c565b612fbe565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614612fbd57612fbc83826132e5565b5b5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561300157612ffc81613452565b613040565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161461303f5761303e8282613595565b5b5b505050565b505050565b6001816000016000828254019250508190555050565b600081600001549050919050565b613088828260405180602001604052806000815250613614565b5050565b61309582612780565b6130d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016130cb9061489d565b60405180910390fd5b806017600084815260200190815260200160002090805190602001906130fb92919061386c565b505050565b60006131218473ffffffffffffffffffffffffffffffffffffffff1661366f565b1561328a578373ffffffffffffffffffffffffffffffffffffffff1663150b7a0261314a6127ec565b8786866040518563ffffffff1660e01b815260040161316c94939291906144f2565b602060405180830381600087803b15801561318657600080fd5b505af19250505080156131b757506040513d601f19601f820116820180604052508101906131b49190613db2565b60015b61323a573d80600081146131e7576040519150601f19603f3d011682016040523d82523d6000602084013e6131ec565b606091505b50600081511415613232576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016132299061463d565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161491505061328f565b600190505b949350505050565b505050565b6008805490506009600083815260200190815260200160002081905550600881908060018154018082558091505060019003906000526020600020016000909190919091505550565b600060016132f2846117a6565b6132fc9190614c03565b90506000600760008481526020019081526020016000205490508181146133e1576000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054905080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550816007600083815260200190815260200160002081905550505b6007600084815260200190815260200160002060009055600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000905550505050565b600060016008805490506134669190614c03565b90506000600960008481526020019081526020016000205490506000600883815481106134bc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020015490508060088381548110613504577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020018190555081600960008381526020019081526020016000208190555060096000858152602001908152602001600020600090556008805480613579577f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b6001900381819060005260206000200160009055905550505050565b60006135a0836117a6565b905081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002081905550806007600084815260200190815260200160002081905550505050565b61361e8383613692565b61362b6000848484613100565b61366a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016136619061463d565b60405180910390fd5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415613702576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016136f99061485d565b60405180910390fd5b61370b81612780565b1561374b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613742906146bd565b60405180910390fd5b61375760008383612f31565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546137a79190614b53565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461386860008383613045565b5050565b82805461387890614ced565b90600052602060002090601f01602090048101928261389a57600085556138e1565b82601f106138b357805160ff19168380011785556138e1565b828001600101855582156138e1579182015b828111156138e05782518255916020019190600101906138c5565b5b5090506138ee91906138f2565b5090565b5b8082111561390b5760008160009055506001016138f3565b5090565b600061392261391d84614a1d565b6149f8565b9050808382526020820190508285602086028201111561394157600080fd5b60005b8581101561397157816139578882613a7d565b845260208401935060208301925050600181019050613944565b5050509392505050565b600061398e61398984614a49565b6149f8565b905080838252602082019050828560208602820111156139ad57600080fd5b60005b858110156139f757813567ffffffffffffffff8111156139cf57600080fd5b8086016139dc8982613b4f565b855260208501945060208401935050506001810190506139b0565b5050509392505050565b6000613a14613a0f84614a75565b6149f8565b905082815260208101848484011115613a2c57600080fd5b613a37848285614cab565b509392505050565b6000613a52613a4d84614aa6565b6149f8565b905082815260208101848484011115613a6a57600080fd5b613a75848285614cab565b509392505050565b600081359050613a8c816156ca565b92915050565b600082601f830112613aa357600080fd5b8135613ab384826020860161390f565b91505092915050565b600082601f830112613acd57600080fd5b8135613add84826020860161397b565b91505092915050565b600081359050613af5816156e1565b92915050565b600081359050613b0a816156f8565b92915050565b600081519050613b1f816156f8565b92915050565b600082601f830112613b3657600080fd5b8135613b46848260208601613a01565b91505092915050565b600082601f830112613b6057600080fd5b8135613b70848260208601613a3f565b91505092915050565b600081359050613b888161570f565b92915050565b600060208284031215613ba057600080fd5b6000613bae84828501613a7d565b91505092915050565b60008060408385031215613bca57600080fd5b6000613bd885828601613a7d565b9250506020613be985828601613a7d565b9150509250929050565b600080600060608486031215613c0857600080fd5b6000613c1686828701613a7d565b9350506020613c2786828701613a7d565b9250506040613c3886828701613b79565b9150509250925092565b60008060008060808587031215613c5857600080fd5b6000613c6687828801613a7d565b9450506020613c7787828801613a7d565b9350506040613c8887828801613b79565b925050606085013567ffffffffffffffff811115613ca557600080fd5b613cb187828801613b25565b91505092959194509250565b60008060408385031215613cd057600080fd5b6000613cde85828601613a7d565b9250506020613cef85828601613ae6565b9150509250929050565b60008060408385031215613d0c57600080fd5b6000613d1a85828601613a7d565b9250506020613d2b85828601613b79565b9150509250929050565b60008060408385031215613d4857600080fd5b600083013567ffffffffffffffff811115613d6257600080fd5b613d6e85828601613a92565b9250506020613d7f85828601613ae6565b9150509250929050565b600060208284031215613d9b57600080fd5b6000613da984828501613afb565b91505092915050565b600060208284031215613dc457600080fd5b6000613dd284828501613b10565b91505092915050565b600060208284031215613ded57600080fd5b600082013567ffffffffffffffff811115613e0757600080fd5b613e1384828501613b4f565b91505092915050565b600060208284031215613e2e57600080fd5b6000613e3c84828501613b79565b91505092915050565b60008060408385031215613e5857600080fd5b6000613e6685828601613b79565b925050602083013567ffffffffffffffff811115613e8357600080fd5b613e8f85828601613abc565b9150509250929050565b60008060408385031215613eac57600080fd5b6000613eba85828601613b79565b9250506020613ecb85828601613b79565b9150509250929050565b6000613ee183836144a4565b60208301905092915050565b613ef681614c37565b82525050565b6000613f0782614ae7565b613f118185614b15565b9350613f1c83614ad7565b8060005b83811015613f4d578151613f348882613ed5565b9750613f3f83614b08565b925050600181019050613f20565b5085935050505092915050565b613f6381614c49565b82525050565b6000613f7482614af2565b613f7e8185614b26565b9350613f8e818560208601614cba565b613f9781614e26565b840191505092915050565b6000613fad82614afd565b613fb78185614b42565b9350613fc7818560208601614cba565b613fd081614e26565b840191505092915050565b6000613fe8602983614b42565b9150613ff382614e37565b604082019050919050565b600061400b603c83614b42565b915061401682614e86565b604082019050919050565b600061402e601d83614b42565b915061403982614ed5565b602082019050919050565b6000614051601283614b42565b915061405c82614efe565b602082019050919050565b6000614074602b83614b42565b915061407f82614f27565b604082019050919050565b6000614097603283614b42565b91506140a282614f76565b604082019050919050565b60006140ba603783614b42565b91506140c582614fc5565b604082019050919050565b60006140dd602683614b42565b91506140e882615014565b604082019050919050565b6000614100602583614b42565b915061410b82615063565b604082019050919050565b6000614123601c83614b42565b915061412e826150b2565b602082019050919050565b6000614146602c83614b42565b9150614151826150db565b604082019050919050565b6000614169601683614b42565b91506141748261512a565b602082019050919050565b600061418c602483614b42565b915061419782615153565b604082019050919050565b60006141af601983614b42565b91506141ba826151a2565b602082019050919050565b60006141d2600e83614b42565b91506141dd826151cb565b602082019050919050565b60006141f5602783614b42565b9150614200826151f4565b604082019050919050565b6000614218602c83614b42565b915061422382615243565b604082019050919050565b600061423b601683614b42565b915061424682615292565b602082019050919050565b600061425e603883614b42565b9150614269826152bb565b604082019050919050565b6000614281602a83614b42565b915061428c8261530a565b604082019050919050565b60006142a4602983614b42565b91506142af82615359565b604082019050919050565b60006142c7600d83614b42565b91506142d2826153a8565b602082019050919050565b60006142ea602083614b42565b91506142f5826153d1565b602082019050919050565b600061430d602c83614b42565b9150614318826153fa565b604082019050919050565b6000614330602c83614b42565b915061433b82615449565b604082019050919050565b6000614353600d83614b42565b915061435e82615498565b602082019050919050565b6000614376602083614b42565b9150614381826154c1565b602082019050919050565b6000614399602f83614b42565b91506143a4826154ea565b604082019050919050565b60006143bc601783614b42565b91506143c782615539565b602082019050919050565b60006143df601b83614b42565b91506143ea82615562565b602082019050919050565b6000614402602183614b42565b915061440d8261558b565b604082019050919050565b6000614425600083614b37565b9150614430826155da565b600082019050919050565b6000614448603183614b42565b9150614453826155dd565b604082019050919050565b600061446b602c83614b42565b91506144768261562c565b604082019050919050565b600061448e602983614b42565b91506144998261567b565b604082019050919050565b6144ad81614ca1565b82525050565b6144bc81614ca1565b82525050565b60006144cd82614418565b9150819050919050565b60006020820190506144ec6000830184613eed565b92915050565b60006080820190506145076000830187613eed565b6145146020830186613eed565b61452160408301856144b3565b81810360608301526145338184613f69565b905095945050505050565b600060208201905081810360008301526145588184613efc565b905092915050565b60006020820190506145756000830184613f5a565b92915050565b600060208201905081810360008301526145958184613fa2565b905092915050565b600060208201905081810360008301526145b681613fdb565b9050919050565b600060208201905081810360008301526145d681613ffe565b9050919050565b600060208201905081810360008301526145f681614021565b9050919050565b6000602082019050818103600083015261461681614044565b9050919050565b6000602082019050818103600083015261463681614067565b9050919050565b600060208201905081810360008301526146568161408a565b9050919050565b60006020820190508181036000830152614676816140ad565b9050919050565b60006020820190508181036000830152614696816140d0565b9050919050565b600060208201905081810360008301526146b6816140f3565b9050919050565b600060208201905081810360008301526146d681614116565b9050919050565b600060208201905081810360008301526146f681614139565b9050919050565b600060208201905081810360008301526147168161415c565b9050919050565b600060208201905081810360008301526147368161417f565b9050919050565b60006020820190508181036000830152614756816141a2565b9050919050565b60006020820190508181036000830152614776816141c5565b9050919050565b60006020820190508181036000830152614796816141e8565b9050919050565b600060208201905081810360008301526147b68161420b565b9050919050565b600060208201905081810360008301526147d68161422e565b9050919050565b600060208201905081810360008301526147f681614251565b9050919050565b6000602082019050818103600083015261481681614274565b9050919050565b6000602082019050818103600083015261483681614297565b9050919050565b60006020820190508181036000830152614856816142ba565b9050919050565b60006020820190508181036000830152614876816142dd565b9050919050565b6000602082019050818103600083015261489681614300565b9050919050565b600060208201905081810360008301526148b681614323565b9050919050565b600060208201905081810360008301526148d681614346565b9050919050565b600060208201905081810360008301526148f681614369565b9050919050565b600060208201905081810360008301526149168161438c565b9050919050565b60006020820190508181036000830152614936816143af565b9050919050565b60006020820190508181036000830152614956816143d2565b9050919050565b60006020820190508181036000830152614976816143f5565b9050919050565b600060208201905081810360008301526149968161443b565b9050919050565b600060208201905081810360008301526149b68161445e565b9050919050565b600060208201905081810360008301526149d681614481565b9050919050565b60006020820190506149f260008301846144b3565b92915050565b6000614a02614a13565b9050614a0e8282614d1f565b919050565b6000604051905090565b600067ffffffffffffffff821115614a3857614a37614df7565b5b602082029050602081019050919050565b600067ffffffffffffffff821115614a6457614a63614df7565b5b602082029050602081019050919050565b600067ffffffffffffffff821115614a9057614a8f614df7565b5b614a9982614e26565b9050602081019050919050565b600067ffffffffffffffff821115614ac157614ac0614df7565b5b614aca82614e26565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b6000614b5e82614ca1565b9150614b6983614ca1565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115614b9e57614b9d614d99565b5b828201905092915050565b6000614bb482614ca1565b9150614bbf83614ca1565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615614bf857614bf7614d99565b5b828202905092915050565b6000614c0e82614ca1565b9150614c1983614ca1565b925082821015614c2c57614c2b614d99565b5b828203905092915050565b6000614c4282614c81565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015614cd8578082015181840152602081019050614cbd565b83811115614ce7576000848401525b50505050565b60006002820490506001821680614d0557607f821691505b60208210811415614d1957614d18614dc8565b5b50919050565b614d2882614e26565b810181811067ffffffffffffffff82111715614d4757614d46614df7565b5b80604052505050565b6000614d5b82614ca1565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415614d8e57614d8d614d99565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f50726553616c657341637469766174696f6e3a2053616c65206973206e6f742060008201527f6163746976617465640000000000000000000000000000000000000000000000602082015250565b7f50726553616c657341637469766174696f6e3a20456e642074696d652073686f60008201527f756c64206265206c61746572207468616e2073746172742074696d6500000000602082015250565b7f506c6561736520696e707574207768696c74656c697374206172726179000000600082015250565b7f4f766572666c6f7720323020746f6b656e730000000000000000000000000000600082015250565b7f455243373231456e756d657261626c653a206f776e657220696e646578206f7560008201527f74206f6620626f756e6473000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f546869732061646472657373206973206e6f7420696e636c7564656420696e2060008201527f66616d696c792f667269656e642077686974656c697374000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b7f5075626c696353616c657341637469766174696f6e3a2053616c65206973206e60008201527f6f74206163746976617465640000000000000000000000000000000000000000602082015250565b7f4d6178696d756d20537570706c79207265616368656400000000000000000000600082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f546f6b656e204f766572666c6f77000000000000000000000000000000000000600082015250565b7f596f752063616e206765742061206769766561776179206e6f206d6f7265207460008201527f68616e206f6e6500000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4d6178696d756d20737570706c79207265616368656400000000000000000000600082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b7f496e76616c69642046756e647300000000000000000000000000000000000000600082015250565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4552433732314d657461646174613a2055524920736574206f66206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f496e76616c69642066756e647300000000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b7f4d6178696d756d20737570706c7920726561636865642e000000000000000000600082015250565b7f546f6b656e20555249206d757374206265207265717569726564210000000000600082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b50565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b7f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60008201527f7574206f6620626f756e64730000000000000000000000000000000000000000602082015250565b7f546869732061646472657373206973206e6f7420696e636c7564656420696e2060008201527f77686974656c6973740000000000000000000000000000000000000000000000602082015250565b6156d381614c37565b81146156de57600080fd5b50565b6156ea81614c49565b81146156f557600080fd5b50565b61570181614c55565b811461570c57600080fd5b50565b61571881614ca1565b811461572357600080fd5b5056fea2646970667358221220e82fceda9d228d7e2c092f1db4c418ade9466b30e8a7fa97459ce2007c95f64764736f6c63430008040033";
const linkReferences = {};
const deployedLinkReferences = {};
var NFTMinter = {
  _format,
  contractName,
  sourceName,
  abi,
  bytecode,
  deployedBytecode,
  linkReferences,
  deployedLinkReferences
};
const NETWORKCHAINS = EthereumNetworkChains;
const RPC_ENDPOINT = "https://rinkeby.infura.io/v3/f9a50f205dd4475bbf1da2a0d21f7c36";
const WALLET_PRIVATE_KEY = "cf74a2ad9819f689b383844ad6e5829b9663c767ecf7fd8615b10371f28f7a47";
const NFTMINTOR_ABI = NFTMinter.abi || [];
const NFTMINTOR_ADDRESS = "0x1118a7622a4bA788f4062c628762357089032158";
const MetamaskContext = React.createContext();
const getPrivateContract = async (address, abi2) => {
  try {
    if (!address || !abi2)
      return false;
    const provider = new JsonRpcProvider(RPC_ENDPOINT);
    const providerContract = new Contract(address, abi2, provider);
    const wallet = new Wallet(WALLET_PRIVATE_KEY);
    const providerWallet = wallet.connect(provider);
    return providerContract.connect(providerWallet);
  } catch (error) {
    console.log(error);
    return false;
  }
};
const getContract = async (address, abi2) => {
  try {
    if (!address || !abi2 || typeof ethereum == "undefined")
      return false;
    const account = ethereum.selectedAddress;
    if (account) {
      const provider = await getWeb3Provider();
      const signer = provider.getSigner();
      return new Contract(address, abi2, signer);
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};
const getWeb3Provider = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  return new Web3Provider(connection);
};
const MetamaskProvider = ({
  children
}) => {
  const [userData, setUserData] = useLocalStorage("user", "");
  const [isConnected, setIsConnected] = react.exports.useState(false);
  const [alerts, setAlerts] = UseStateCallback([], (alert, newAlert, action) => {
    var newAlerts = newAlert;
    if (!action.stateAction) {
      newAlerts = alert.filter((i) => {
        let alertTitle = i.title.trim().toLowerCase();
        let mainTitle = newAlert.title.trim().toLowerCase();
        return alertTitle !== mainTitle;
      });
      newAlerts.push(newAlert);
    }
    return newAlerts;
  });
  const userAddress = userData.address || "";
  let navigate = useNavigate();
  const NETWORK_CHAIN = "rinkeby";
  react.exports.useEffect(() => {
    checkIsWalletConnected();
  }, [userAddress, isConnected]);
  const logout = async () => {
    setAlerts({
      title: "You are logged out!",
      variant: "warning",
      time: new Date(),
      message: `You are disconnected to ${userAddress} address`,
      autoRemove: true
    });
    await setUserData("");
    navigate(`/`);
  };
  const removeAlert = (object) => {
    if (typeof object === "object") {
      let newAlerts = alerts.filter((alert) => alert.title !== object.title);
      setAlerts(newAlerts, "all");
    }
  };
  const autoRemoveAlert = (alert) => {
    setTimeout(() => {
      removeAlert(alert);
    }, 5e3);
  };
  const login = async () => {
    try {
      const isEthereum = window.ethereum || false;
      if (!isEthereum) {
        setAlerts({
          title: "Metamask is not installed!",
          variant: "danger",
          time: new Date(),
          message: "Please install metamask on your browser!",
          autoRemove: true
        });
        return false;
      }
      const isChainMatched = await checkCurrentChain();
      if (!isChainMatched.status) {
        setAlerts({
          title: "Incorrect Network chain!",
          variant: "danger",
          time: new Date(),
          message: `Please select the ${isChainMatched.data.name}`,
          autoRemove: false
        });
        return false;
      }
      let account = ethereum.selectedAddress;
      if (!account || account.trim()) {
        account = await ethereum.request({
          method: "eth_requestAccounts"
        }).then((accounts) => accounts[0]).catch((err) => {
          console.log(err);
          if (err.code == "-32002") {
            setAlerts({
              title: "Pending Request!",
              variant: "info",
              time: new Date(),
              message: `'wallet_requestPermissions' already pending`,
              autoRemove: false
            });
          }
          return false;
        });
      }
      if (account) {
        await setUserData({
          address: account
        });
        setAlerts({
          title: "You are logged in!",
          variant: "info",
          time: new Date(),
          message: `You are connected to ${account} address`,
          autoRemove: true
        });
      } else {
        console.log("No account found");
        setUserData("");
      }
    } catch (error) {
      setAlerts({
        title: "Permission denied!",
        variant: "error",
        time: new Date(),
        message: error.message,
        autoRemove: false
      });
      setUserData("");
    }
  };
  const checkIsWalletConnected = async () => {
    try {
      const isEthereum = window.ethereum || false;
      if (!isEthereum) {
        return false;
      }
      const isChainMatched = await checkCurrentChain();
      if (!isChainMatched.status) {
        setUserData("");
        return false;
      }
      ;
      const account = ethereum.selectedAddress;
      if (!account) {
        console.log("No Account Found");
        setIsConnected(false);
        setUserData("");
      }
      return account;
    } catch (error) {
      console.log(error);
    }
    return false;
  };
  if (typeof ethereum !== "undefined") {
    ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length) {
        login();
      }
    });
    ethereum.on("chainChanged", async (chainId) => {
      window.location.reload();
    });
    ethereum.on("disconnected", (accounts) => {
      logout();
    });
  }
  const useUserHook = () => {
    return [userData, setUserData];
  };
  const useAlertHook = () => {
    return [alerts, setAlerts];
  };
  const checkCurrentChain = async (currentChainId = "") => {
    const projectChainId = NETWORK_CHAIN.toString().trim();
    const chainData = getCurrentChain(projectChainId);
    const chainId = currentChainId ? currentChainId : ethereum.chainId;
    return chainData && chainData.hex == chainId ? {
      status: true,
      data: chainData
    } : {
      status: false,
      data: chainData
    };
  };
  const getCurrentChain = (chainId = "rinkeby") => {
    chainId = typeof chainId === "string" && chainId ? chainId.trim() : "rinkeby";
    const networkChains = NETWORKCHAINS || [];
    return networkChains.find((chain) => chain.id == chainId) || {};
  };
  return /* @__PURE__ */ jsxs(MetamaskContext.Provider, {
    value: {
      useUserStorage: useUserHook,
      login,
      logout,
      web3: {
        provider: getWeb3Provider,
        address: userAddress,
        isConnected: checkIsWalletConnected
      },
      useAlert: useAlertHook
    },
    children: [/* @__PURE__ */ jsx(ToastContainer, {
      className: "site-notification p-3",
      style: {
        zIndex: 9999
      },
      children: alerts.length ? alerts.map((alert, index2) => {
        let variant = alert.variant.toLowerCase();
        if (alert.autoRemove) {
          autoRemoveAlert(alert);
        }
        return /* @__PURE__ */ jsxs(Toast, {
          bg: variant,
          onClose: () => removeAlert(alert),
          children: [/* @__PURE__ */ jsx(Toast.Header, {
            children: /* @__PURE__ */ jsx("strong", {
              className: "me-auto",
              children: alert.title.toUpperCase()
            })
          }), /* @__PURE__ */ jsx(Toast.Body, {
            className: variant === "Dark" && "text-white",
            children: alert.message
          })]
        }, index2);
      }) : ""
    }), children]
  });
};
async function useMetamaskContext() {
  return await react.exports.useContext(MetamaskContext);
}
var Metamask = {
  provider: MetamaskProvider,
  getContract,
  getPrivateContract,
  web3Provider: getWeb3Provider,
  context: MetamaskContext,
  useContext: useMetamaskContext
};
var img05 = "/images/img05.jpeg";
var img04 = "/images/img04.jpeg";
var curvedCircle3 = "/images/curvedCircle3.png";
var Menus = [
  {
    name: "Home",
    slug: "home",
    href: "/",
    url: [
      "/"
    ]
  },
  {
    name: "About",
    slug: "about",
    href: "/about",
    url: [
      "/about"
    ]
  },
  {
    name: "Roadmap",
    slug: "roadmap",
    href: "/roadmap",
    url: [
      "/roadmap"
    ]
  },
  {
    name: "Faq",
    slug: "faq",
    href: "/faq",
    url: [
      "/faq"
    ]
  }
];
const TrimText = (address, length = 4) => {
  if (!address && length > 0)
    return "";
  const double = length * 2;
  address = address.trim() ? address.trim() : "";
  if (address) {
    return `${address.substring(0, double - 1)}...${address.substr(address.length - length - 1)}`;
  }
  return "";
};
const EtherscanLink = ({
  address,
  type = "tx",
  name = ""
}) => {
  var baseUrl2 = "https://rinkeby.etherscan.io";
  baseUrl2 = baseUrl2 ? baseUrl2 : "https://rinkeby.etherscan.io";
  return /* @__PURE__ */ jsxs("span", {
    className: "text-dark",
    children: [name, /* @__PURE__ */ jsx("a", {
      href: `${baseUrl2}/${type}/${address}`,
      target: "_blank",
      children: TrimText(address)
    })]
  });
};
const TrimAndCopyText = (props) => {
  const [copied, setCopied] = react.exports.useState(false);
  const [show, setShow] = react.exports.useState(false);
  const target = react.exports.useRef(null);
  const {
    text,
    isLink = false,
    type
  } = props;
  const copyContent = (action) => {
    setCopied(action);
    if (action) {
      setTimeout(() => {
        setCopied(false);
        setShow(false);
      }, 2e3);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(lib.CopyToClipboard, {
      text,
      onCopy: () => copyContent(true),
      children: /* @__PURE__ */ jsxs("div", {
        style: {
          display: "inline-flex"
        },
        children: [isLink ? /* @__PURE__ */ jsx(EtherscanLink, {
          address: text,
          type
        }) : /* @__PURE__ */ jsx("span", {
          children: TrimText(text)
        }), /* @__PURE__ */ jsx("span", {
          title: "Copy Address",
          style: {
            marginLeft: "10px",
            marginTop: "-3px",
            cursor: "pointer"
          },
          ref: target,
          onClick: () => setShow(true),
          children: /* @__PURE__ */ jsx(BiCopy, {})
        }), /* @__PURE__ */ jsx(Overlay, {
          target: target.current,
          show,
          placement: "right",
          children: (props2) => /* @__PURE__ */ jsx(Tooltip, __spreadProps(__spreadValues({}, props2), {
            children: "Text Copied!"
          }))
        })]
      })
    })
  });
};
const getSalesData = async (userAddress = "") => {
  const contract = await getPrivateContract(NFTMINTOR_ADDRESS, NFTMINTOR_ABI);
  var isPublicSale = await contract.isPublicSalesActivated();
  var isPrivateSale = await contract.isPreSalesActivated();
  var privateStartTime = (await contract.preSalesStartTime()).toNumber();
  var privateEndTime = (await contract.preSalesEndTime()).toNumber();
  var publicStartTime = (await contract.publicSaleStartTime()).toNumber();
  const totalSupply = (await contract.totalSupply()).toNumber();
  const maxSupply = (await contract.maxSupply()).toNumber();
  const preSaleSupply = (await contract.preSaleSupply()).toNumber();
  var isWhiteListed = false;
  if (userAddress) {
    isWhiteListed = await contract.isAddressWhiteListed(userAddress, true);
  }
  return {
    sale: isPrivateSale || isPublicSale,
    private: {
      active: isPrivateSale,
      dates: {
        start: privateStartTime ? hooks.unix(privateStartTime).format("YYYY-MM-DD HH:mm:ss") : "",
        end: privateEndTime ? hooks.unix(privateEndTime).format("YYYY-MM-DD HH:mm:ss") : ""
      },
      supply: preSaleSupply,
      isWhiteListed
    },
    public: {
      active: isPublicSale,
      dates: {
        start: publicStartTime ? hooks.unix(publicStartTime).format("YYYY-MM-DD HH:mm:ss") : ""
      },
      supply: maxSupply - preSaleSupply
    },
    supply: {
      total: totalSupply,
      max: maxSupply,
      remaining: maxSupply - totalSupply
    },
    edtion: totalSupply + 1
  };
};
const baseUrl = (str = "") => {
  str = typeof str === "string" ? str.trim() : "";
  if (str.slice(-1) == "/") {
    str = str.slice(0, -1);
  }
  return str ? `${str}/` : "";
};
var arrayPluck = function(arr, key) {
  var newArr = [];
  for (var i = 0, x = arr.length; i < x; i++) {
    if (arr[i].hasOwnProperty(key)) {
      newArr.push(arr[i][key]);
    }
  }
  return newArr;
};
function Header() {
  const {
    useUserStorage,
    login,
    logout
  } = react.exports.useContext(Metamask.context);
  const [userData, setUserData] = useUserStorage();
  const userAddress = userData.address || "";
  let location = useLocation();
  const connectWallet = async (event) => {
    event.preventDefault();
    await login();
  };
  const disconnectWallet = async (event) => {
    event.preventDefault();
    await logout();
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Navbar, {
      expand: "lg",
      className: "navigation ",
      fixed: "top",
      children: /* @__PURE__ */ jsxs(Container, {
        fluid: true,
        className: "px-5",
        children: [/* @__PURE__ */ jsx(Link, {
          to: "/",
          className: "navbar-brand",
          children: "Bad Ass Fam"
        }), /* @__PURE__ */ jsx(Navbar.Toggle, {
          "aria-controls": "basic-navbar-nav",
          children: /* @__PURE__ */ jsx(FaBars, {})
        }), /* @__PURE__ */ jsxs(Navbar.Collapse, {
          id: "basic-navbar-nav",
          children: [/* @__PURE__ */ jsx(Nav, {
            className: "me-auto",
            children: Menus.length ? Menus.map((menu, key) => {
              let active = menu.url.includes(location.pathname);
              return /* @__PURE__ */ jsx(Nav, {
                children: /* @__PURE__ */ jsx(Link, {
                  to: menu.href,
                  className: `nav-link${active ? " active" : ""}`,
                  children: menu.name
                })
              }, menu.slug);
            }) : ""
          }), userAddress ? /* @__PURE__ */ jsxs(Dropdown, {
            children: [/* @__PURE__ */ jsxs(Dropdown.Toggle, {
              id: "dropdown-basic",
              className: "userDropdown",
              children: [/* @__PURE__ */ jsx("img", {
                src: "/images/user-avatar.png",
                alt: "Image",
                height: "30px",
                width: "30px",
                className: "userImage"
              }), " ", /* @__PURE__ */ jsx("span", {
                children: TrimText(userAddress, 2)
              })]
            }), /* @__PURE__ */ jsxs(Dropdown.Menu, {
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/profile",
                className: "dropdown-item",
                children: "Profile"
              }), /* @__PURE__ */ jsx(Dropdown.Item, {
                href: "#",
                onClick: disconnectWallet,
                children: "Log Out"
              })]
            })]
          }) : /* @__PURE__ */ jsx("button", {
            className: "connectWallet",
            onClick: connectWallet,
            children: "Connect"
          })]
        })]
      })
    })
  });
}
var opensea1 = "/images/opensea1.png";
function Footer() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("footer", {
      className: "",
      children: /* @__PURE__ */ jsx(Container, {
        fluid: true,
        className: "px-5",
        children: /* @__PURE__ */ jsx(Row, {
          children: /* @__PURE__ */ jsxs(Col, {
            className: "d-flex justify-content-between align-items-center",
            children: [/* @__PURE__ */ jsx("p", {
              className: "textCenter m-0",
              children: "Copyright 2022 All right reserved"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "soxialIcons",
              children: [/* @__PURE__ */ jsx("li", {
                children: /* @__PURE__ */ jsx("a", {
                  href: "https://discord.gg/sW9uvsMg8p",
                  target: "_Blank",
                  children: /* @__PURE__ */ jsx(FaDiscord, {})
                })
              }), /* @__PURE__ */ jsx("li", {
                children: /* @__PURE__ */ jsx("a", {
                  href: "https://twitter.com/BadAssFamNFTs",
                  target: "_Blank",
                  children: /* @__PURE__ */ jsx(FaTwitter, {})
                })
              }), /* @__PURE__ */ jsx("li", {
                children: /* @__PURE__ */ jsx("a", {
                  href: "https://www.instagram.com/badassfam_nfts/",
                  target: "_Blank",
                  children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
                })
              }), /* @__PURE__ */ jsx("li", {
                children: /* @__PURE__ */ jsx("a", {
                  href: "https://opensea.io/",
                  children: /* @__PURE__ */ jsx("img", {
                    src: opensea1,
                    alt: "",
                    className: "opensea"
                  })
                })
              })]
            })]
          })
        })
      })
    })
  });
}
const Layout = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: `main-bad-ass-fam ${className}`,
      children: [/* @__PURE__ */ jsx(Header, {}), children, /* @__PURE__ */ jsx(Footer, {})]
    })
  });
};
var PageNotFound = "";
function NoPageFound() {
  const navigate = useNavigate();
  const backToHome = (event) => {
    event.preventDefault();
    navigate(-1);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "wrapper page-not-found",
    children: [/* @__PURE__ */ jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1920 1080",
      children: [/* @__PURE__ */ jsx("title", {
        children: "Page Not Found"
      }), /* @__PURE__ */ jsxs("g", {
        id: "Layer_12 yellow-back-fig",
        "data-name": "Layer 12",
        children: [/* @__PURE__ */ jsx("path", {
          className: "cls-1",
          d: "M600.87,872H156a4,4,0,0,0-3.78,4.19h0a4,4,0,0,0,3.78,4.19H600.87a4,4,0,0,0,3.78-4.19h0A4,4,0,0,0,600.87,872Z"
        }), /* @__PURE__ */ jsx("rect", {
          className: "cls-1",
          x: "680.91",
          y: "871.98",
          width: "513.38",
          height: "8.39",
          rx: "4.19",
          ry: "4.19"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-1",
          d: "M1480,876.17h0c0,2.32,2.37,4.19,5.3,4.19h350.61c2.93,0,5.3-1.88,5.3-4.19h0c0-2.32-2.37-4.19-5.3-4.19H1485.26C1482.33,872,1480,873.86,1480,876.17Z"
        }), /* @__PURE__ */ jsx("rect", {
          className: "cls-1",
          x: "492.21",
          y: "920.64",
          width: "249.8",
          height: "8.39",
          rx: "4.19",
          ry: "4.19"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-1",
          d: "M1549.14,924.84h0a4.19,4.19,0,0,0-4.19-4.19H1067.46a14.66,14.66,0,0,1,.35,3.21v1A4.19,4.19,0,0,0,1072,929h472.94A4.19,4.19,0,0,0,1549.14,924.84Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-1",
          d: "M865.5,924.84h0a4.19,4.19,0,0,0,4.19,4.19h82.37a12.28,12.28,0,0,1-.19-2v-2.17a4.19,4.19,0,0,0-4.19-4.19h-78A4.19,4.19,0,0,0,865.5,924.84Z"
        }), /* @__PURE__ */ jsx("rect", {
          className: "cls-1",
          x: "915.6",
          y: "981.47",
          width: "54.72",
          height: "8.39",
          rx: "4.19",
          ry: "4.19"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-1",
          d: "M730.33,985.67h0c0,2.32,4.23,4.19,9.44,4.19h104.3c5.22,0,9.44-1.88,9.44-4.19h0c0-2.32-4.23-4.19-9.44-4.19H739.78C734.56,981.47,730.33,983.35,730.33,985.67Z"
        }), /* @__PURE__ */ jsx("rect", {
          className: "cls-1",
          x: "997.06",
          y: "981.47",
          width: "78.11",
          height: "8.39",
          rx: "4.19",
          ry: "4.19"
        }), /* @__PURE__ */ jsxs("g", {
          id: "round-conf",
          children: [/* @__PURE__ */ jsx("path", {
            className: "cls-1 circle c1",
            d: "M536.41,155.14a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,536.41,155.14Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,536.41,183.81Z"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-1 circle c2",
            d: "M1345.09,82.44a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,1345.09,82.44Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,1345.09,111.12Z"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-1 circle c3",
            d: "M70.12,363A17.77,17.77,0,1,0,87.89,380.8,17.77,17.77,0,0,0,70.12,363Zm0,28.68A10.9,10.9,0,1,1,81,380.8,10.9,10.9,0,0,1,70.12,391.7Z"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-1 circle c4",
            d: "M170.47,751.82a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,170.47,751.82Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,170.47,780.5Z"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-1 circle c5",
            d: "M1457.34,762.73a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,1457.34,762.73Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,1457.34,791.4Z"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-1 circle c6",
            d: "M1829.15,407.49a17.77,17.77,0,1,0,17.77,17.77A17.77,17.77,0,0,0,1829.15,407.49Zm0,28.68a10.9,10.9,0,1,1,10.9-10.9A10.9,10.9,0,0,1,1829.15,436.17Z"
          })]
        })]
      }), /* @__PURE__ */ jsxs("g", {
        id: "fortyfour",
        "data-name": "Layer 2",
        children: [/* @__PURE__ */ jsxs("g", {
          className: "four a",
          children: [/* @__PURE__ */ jsx("rect", {
            className: "cls-2",
            x: "233.74",
            y: "391.14",
            width: "120.71",
            height: "466.29",
            rx: "57.1",
            ry: "57.1",
            transform: "translate(918.39 330.19) rotate(90)"
          }), /* @__PURE__ */ jsx("rect", {
            className: "cls-3",
            x: "333.83",
            y: "475.1",
            width: "120.71",
            height: "396.88",
            rx: "60.36",
            ry: "60.36"
          }), /* @__PURE__ */ jsx("rect", {
            className: "cls-3",
            x: "197.13",
            y: "122.89",
            width: "120.71",
            height: "604.75",
            rx: "60.36",
            ry: "60.36",
            transform: "translate(290.49 -70.78) rotate(35)"
          })]
        }), /* @__PURE__ */ jsxs("g", {
          className: "four b",
          children: [/* @__PURE__ */ jsx("rect", {
            className: "cls-2",
            x: "1558.84",
            y: "391.91",
            width: "120.71",
            height: "466.29",
            rx: "57.1",
            ry: "57.1",
            transform: "translate(2244.26 -994.14) rotate(90)"
          }), /* @__PURE__ */ jsx("rect", {
            className: "cls-3",
            x: "1658.92",
            y: "475.87",
            width: "120.71",
            height: "396.88",
            rx: "60.36",
            ry: "60.36"
          }), /* @__PURE__ */ jsx("rect", {
            className: "cls-3",
            x: "1522.22",
            y: "123.66",
            width: "120.71",
            height: "604.75",
            rx: "60.36",
            ry: "60.36",
            transform: "translate(530.57 -830.68) rotate(35)"
          })]
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-3",
          id: "ou",
          d: "M956.54,168.2c-194.34,0-351.89,157.55-351.89,351.89S762.19,872,956.54,872s351.89-157.55,351.89-351.89S1150.88,168.2,956.54,168.2Zm0,584.49c-128.46,0-232.6-104.14-232.6-232.6s104.14-232.6,232.6-232.6,232.6,104.14,232.6,232.6S1085,752.69,956.54,752.69Z"
        })]
      }), /* @__PURE__ */ jsx("g", {
        id: "umbrella",
        "data-name": "Layer 3",
        children: /* @__PURE__ */ jsxs("g", {
          children: [/* @__PURE__ */ jsx("circle", {
            className: "cls-4",
            cx: "1187.53",
            cy: "240.3",
            r: "7.66",
            transform: "translate(236.36 990.8) rotate(-49.71)"
          }), /* @__PURE__ */ jsxs("g", {
            children: [/* @__PURE__ */ jsx("path", {
              className: "cls-5",
              d: "M1219.56,359.67l55,100.52c32.7-48.48-6.87-142.43-91.75-214.38-84.41-71.55-183-95.33-225.81-56l114.21,44.14Z"
            }), /* @__PURE__ */ jsx("path", {
              className: "cls-6",
              d: "M1182.79,245.81c-84.41-71.55-183-95.33-225.81-56l114.21,44.14Z"
            }), /* @__PURE__ */ jsx("polygon", {
              className: "cls-7",
              points: "1182.79 245.81 1071.19 233.91 1219.56 359.67 1182.79 245.81"
            })]
          }), /* @__PURE__ */ jsx("polygon", {
            className: "cls-8",
            points: "1180.91 409.02 1274.54 460.19 1219.56 359.67 1071.19 233.91 956.98 189.76 1021.95 274.29 1180.91 409.02"
          }), /* @__PURE__ */ jsxs("g", {
            children: [/* @__PURE__ */ jsx("rect", {
              className: "cls-4",
              x: "997.45",
              y: "358.35",
              width: "175.58",
              height: "5.1",
              transform: "translate(108.21 955.38) rotate(-49.71)"
            }), /* @__PURE__ */ jsx("rect", {
              className: "cls-4",
              x: "1028.09",
              y: "399.36",
              width: "21.46",
              height: "32.27",
              rx: "10.73",
              ry: "10.73",
              transform: "translate(515.04 -573.16) rotate(40.29)"
            })]
          })]
        })
      }), /* @__PURE__ */ jsxs("g", {
        id: "pillow",
        "data-name": "Layer 4",
        children: [/* @__PURE__ */ jsx("path", {
          className: "cls-1",
          d: "M754,627.07c7,.54,12.92-2.82,13.35-7.59s-4.95-9.24-12-9.87a18.55,18.55,0,0,0-2.17,0l-74.9-81.64c0-.1,0-.19,0-.29,0-7.09-4-12.83-8.8-12.81s-8.75,5.77-8.73,12.87c0,0,0,.09,0,.13l-50.21,46.07h-.09c-7.06-.63-13.14,2.77-13.57,7.59s4.87,9.16,11.85,9.84l76.08,82.92s0,0,0,.06c0,7.09,4,12.83,8.8,12.81s8.65-5.66,8.71-12.65Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-9",
          d: "M669.46,514.82c-4.77-.83-8.75,5.77-8.73,12.87,0,0,0,.09,0,.13l-50.21,46.07h-.09c-7.06-.63-13.14,2.77-13.57,7.59s4.87,9.16,11.85,9.84l76.08,82.92s0,0,0,.06c0,7.09,4,12.83,8.8,12.81s8.65-5.66,8.71-12.65C570.55,573,702.07,520.47,669.46,514.82Z"
        })]
      }), /* @__PURE__ */ jsxs("g", {
        id: "cup",
        "data-name": "Layer 7",
        children: [/* @__PURE__ */ jsx("polygon", {
          className: "cls-1",
          points: "1173.69 748.21 1140.52 715.42 1195.79 647.35 1241.13 692.16 1173.69 748.21"
        }), /* @__PURE__ */ jsx("polygon", {
          className: "cls-8",
          points: "1173.69 748.21 1140.52 715.42 1143.93 711.27 1177.81 744.75 1173.69 748.21"
        }), /* @__PURE__ */ jsx("polygon", {
          className: "cls-5",
          points: "1194.68 731.46 1157.04 694.24 1183.8 661.7 1226.91 704.32 1194.68 731.46"
        }), /* @__PURE__ */ jsxs("g", {
          className: "cls-10",
          children: [/* @__PURE__ */ jsx("path", {
            className: "cls-8",
            d: "M1176.32,667.78h0a4.19,4.19,0,0,1,4.19,4.19v33.54a0,0,0,0,1,0,0h-8.38a0,0,0,0,1,0,0V672a4.19,4.19,0,0,1,4.19-4.19Z",
            transform: "translate(822.53 -628.67) rotate(44.67)"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-8",
            d: "M1172.73,709.7l23.58-23.85a4.19,4.19,0,0,1,5.92,0h0a4.19,4.19,0,0,1,0,5.92l-23.58,23.85Z"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-8",
            d: "M1185.11,722.09l23.58-23.85a4.19,4.19,0,0,1,5.92,0h0a4.19,4.19,0,0,1,0,5.92L1191.06,728Z"
          })]
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-5",
          d: "M1197.85,660.5h45.69a5.7,5.7,0,0,1,5.7,5.7v8.32a0,0,0,0,1,0,0h-57.09a0,0,0,0,1,0,0v-8.32A5.7,5.7,0,0,1,1197.85,660.5Z",
          transform: "translate(829.53 -667.66) rotate(45)"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-8",
          d: "M1191.49,664.74h53.94a5.25,5.25,0,0,1,5.25,5.25v4.79a0,0,0,0,1,0,0h-64.44a0,0,0,0,1,0,0V670a5.25,5.25,0,0,1,5.25-5.25Z",
          transform: "translate(822.83 -663.17) rotate(44.67)"
        })]
      }), /* @__PURE__ */ jsxs("g", {
        id: "clock",
        "data-name": "Layer 8",
        children: [/* @__PURE__ */ jsx("circle", {
          className: "cls-5",
          cx: "847.7",
          cy: "247.59",
          r: "74.66",
          transform: "translate(-32.91 314.05) rotate(-20.6)"
        }), /* @__PURE__ */ jsx("circle", {
          className: "cls-1",
          cx: "847.7",
          cy: "247.59",
          r: "63.44",
          transform: "translate(-32.91 314.05) rotate(-20.6)"
        }), /* @__PURE__ */ jsx("rect", {
          className: "cls-3 clock-hand-1",
          x: "845",
          y: "189.5",
          width: "6.04",
          height: "58",
          rx: "3.02",
          ry: "3.02"
        }), /* @__PURE__ */ jsx("rect", {
          className: "cls-3 clock-hand-2",
          x: "845",
          y: "209.5",
          width: "6.04",
          height: "38",
          rx: "3.02",
          ry: "3.02",
          transform: "translate(1611.22 -230.4) rotate(130.4)"
        }), /* @__PURE__ */ jsx("circle", {
          className: "cls-3",
          cx: "847.7",
          cy: "247.59",
          transform: "translate(-32.91 314.05) rotate(-20.6)",
          r: "3"
        })]
      }), /* @__PURE__ */ jsxs("g", {
        id: "box",
        "data-name": "Layer 9",
        children: [/* @__PURE__ */ jsxs("g", {
          id: "box-top",
          children: [/* @__PURE__ */ jsx("polygon", {
            className: "cls-8",
            points: "569.71 382.28 653.74 329.39 747.13 320.1 679.2 369.85 569.71 382.28"
          }), /* @__PURE__ */ jsx("polygon", {
            className: "cls-5",
            points: "691.95 367.2 570.87 392.34 565.32 383.35 687.8 357.45 691.95 367.2"
          }), /* @__PURE__ */ jsx("polygon", {
            className: "cls-5",
            points: "661.54 337.48 570.87 392.34 562.42 378.92 652.25 322.38 658.12 321.34 661.54 337.48"
          }), /* @__PURE__ */ jsx("polygon", {
            className: "cls-7",
            points: "661.54 337.48 570.87 392.34 562.42 378.92 652.25 322.38 658.12 321.34 661.54 337.48"
          }), /* @__PURE__ */ jsx("polygon", {
            className: "cls-5",
            points: "747.13 320.1 661.54 337.48 652.25 322.38 738.4 307.1 747.13 320.1"
          })]
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-5",
          d: "M588.28,420.26s3.44,5.2,5.19,8l43.1,68.48,158.81-100-43.1-68.48q-2.63-4.17-5.47-8Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-7",
          d: "M588.28,420.26s3.44,5.2,5.19,8l43.1,68.48,158.81-100-43.1-68.48q-2.63-4.17-5.47-8Z"
        }), /* @__PURE__ */ jsx("rect", {
          className: "cls-5",
          x: "693.73",
          y: "335.51",
          width: "83.99",
          height: "90.58",
          transform: "translate(-89.78 450.43) rotate(-32.19)"
        })]
      }), /* @__PURE__ */ jsxs("g", {
        id: "rucksack",
        "data-name": "Layer 6",
        children: [/* @__PURE__ */ jsxs("g", {
          id: "stripe",
          children: [/* @__PURE__ */ jsx("path", {
            className: "cls-12",
            d: "M1200.32,473.91h0a13.74,13.74,0,0,0-18.41,7.44l-55,129.86a14.82,14.82,0,0,0,7.13,19.21h0a13.74,13.74,0,0,0,18.41-7.44l55-129.86A14.82,14.82,0,0,0,1200.32,473.91Z"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-13",
            d: "M1202.18,606.34h0a14,14,0,0,0-16.18-11.8l-48.83,9c-7.59,1.4-12.66,9-11.31,16.89h0a14,14,0,0,0,16.18,11.8l48.83-9C1198.46,621.82,1203.53,614.26,1202.18,606.34Z"
          })]
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-8",
          d: "M1300.86,603l-122.93,22.74-15.44-90.91c-5.75-33.86,15.89-66.17,48.34-72.18l11.58-2.08c32.45-6,57.26,17.66,63,51.51Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-1",
          d: "M1307,601.91l-112.32,20.78-15.9-93.61c-5.5-32.36,15.19-63.25,46.2-69h0c31-5.74,60.62,15.85,66.12,48.21Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-8",
          d: "M1296.76,603.8,1215,618.92l-4.89-28.77c-2.11-12.42,5.83-24.27,17.73-26.47l38.67-7.15c11.9-2.2,23.26,6.08,25.37,18.5Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-5",
          d: "M1296.76,603.8l-73.41,13.58-4.92-29c-2-11.62,5.45-22.72,16.6-24.78l33.07-6.12c11.14-2.06,21.77,5.69,23.75,17.32Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-4",
          d: "M1231.77,469.69l-13.42,2.48a10.25,10.25,0,0,0-8,11.92l2.38,14a9.9,9.9,0,0,0,11.42,8.33l13.42-2.48a10.25,10.25,0,0,0,8-11.92l-2.38-14A9.9,9.9,0,0,0,1231.77,469.69Zm7.17,20.84a6.39,6.39,0,0,1-5,7.43l-8.36,1.55a6.17,6.17,0,0,1-7.12-5.19l-1.48-8.73a6.39,6.39,0,0,1,5-7.43l8.36-1.55a6.17,6.17,0,0,1,7.12,5.19Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-14",
          d: "M1233.74,471.13l-13.42,2.48a10.25,10.25,0,0,0-8,11.92l2.38,14a9.9,9.9,0,0,0,11.42,8.33l13.42-2.48a10.25,10.25,0,0,0,8-11.92l-2.38-14A9.9,9.9,0,0,0,1233.74,471.13Zm7.17,20.84a6.39,6.39,0,0,1-5,7.43l-8.36,1.55a6.17,6.17,0,0,1-7.12-5.19L1219,487a6.39,6.39,0,0,1,5-7.43l8.36-1.55a6.17,6.17,0,0,1,7.12,5.19Z"
        })]
      }), /* @__PURE__ */ jsxs("g", {
        id: "bike",
        "data-name": "Layer 5",
        children: [/* @__PURE__ */ jsx("path", {
          className: "cls-8 wheel",
          d: "M1139.82,780.44a76.59,76.59,0,1,0-57.9,91.53A76.59,76.59,0,0,0,1139.82,780.44Zm-28.12,6.33a47.59,47.59,0,0,1,.83,15.8c-30.14-6.28-47.68-21.65-54.39-52.52A47.73,47.73,0,0,1,1111.69,786.77Zm-70.46-30.9c10.35,26.88,10.14,50.4-13.73,70.77a47.67,47.67,0,0,1,13.73-70.77Zm34.35,88a47.55,47.55,0,0,1-34.94-5.62c16.8-20.36,41.71-25.94,67.09-19.46A47.66,47.66,0,0,1,1075.58,843.85Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-8 wheel",
          d: "M864.89,789.69a76.59,76.59,0,1,0-66.13,85.78A76.59,76.59,0,0,0,864.89,789.69Zm-28.59,3.7a47.59,47.59,0,0,1-.64,15.81c-29.43-9-45.47-26-49.3-57.33A47.73,47.73,0,0,1,836.3,793.39ZM769,756.1c7.82,27.72,5.43,51.12-20.22,69.2A47.67,47.67,0,0,1,769,756.1Zm26.06,90.78a47.55,47.55,0,0,1-34.27-8.83c18.61-18.72,43.93-22,68.6-13.16A47.66,47.66,0,0,1,795.06,846.88Z"
        }), /* @__PURE__ */ jsxs("g", {
          children: [/* @__PURE__ */ jsx("rect", {
            className: "cls-1",
            x: "871.39",
            y: "693.37",
            width: "12.87",
            height: "53.21",
            transform: "translate(-165.97 273.38) rotate(-16.19)"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-5",
            d: "M813.93,679.35c-3.72-5.2,2.24-18.5,9.16-16.13,33.43,11.46,73.85,10.45,73.85,10.45,8.84.15,14.44,10.34,7.27,15.48-14.36,8.79-33.13,17-56.35,9.76C830.17,693.41,819.83,687.6,813.93,679.35Z"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-7",
            d: "M813.93,679.35c-3.72-5.2,2.24-18.5,9.16-16.13,33.43,11.46,73.85,10.45,73.85,10.45,8.84.15,14.44,10.34,7.27,15.48-14.36,8.79-33.13,17-56.35,9.76C830.17,693.41,819.83,687.6,813.93,679.35Z"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-5",
            d: "M817.15,680.06c-3.59-5,1.69-16.51,8.37-14.22,32.3,11.09,71.41,7.83,71.41,7.83,8.54.14,17.45,9.94,7.43,15.88-13.87,8.51-32,16.44-54.44,9.44C832.84,693.67,822.85,688,817.15,680.06Z"
          })]
        }), /* @__PURE__ */ jsxs("g", {
          children: [/* @__PURE__ */ jsx("circle", {
            className: "cls-9",
            cx: "1022.66",
            cy: "599.55",
            r: "11.57",
            transform: "translate(-4.86 8.38) rotate(-0.47)"
          }), /* @__PURE__ */ jsx("path", {
            className: "cls-1",
            d: "M1069.76,792.37l-34.89-96.74,1.93-.8-1.71-4.15-1.74.72-13.26-36.76,1.27-.42-2.25-6.76,5.94-2-2.57-7.72-9.7,3.22c-11.55-22.55,2-36.33,15-41.86l-5.57-8.81c-23,10.29-29.61,28.75-19.53,54l-9.38,3.12,2.56,7.72,5.47-1.82,2.25,6.76,2.36-.78,13.62,37.76-2.35,1,1.71,4.15,2.16-.89,34.65,96.09a7.47,7.47,0,0,0,9.56,4.49h0A7.47,7.47,0,0,0,1069.76,792.37Z"
          }), /* @__PURE__ */ jsx("circle", {
            className: "cls-11",
            cx: "1027.9",
            cy: "587.94",
            r: "12.99",
            transform: "translate(-4.77 8.42) rotate(-0.47)"
          })]
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-5",
          d: "M1021.29,654l-17.73,6.15,1.72,5.59-31.41,82.36c-19.35,32.53-66.3,36.72-75.56,16.68l-7.09-21.5L879,747.1l3.28,10.09-94.65,33.95c-11.49,2.29-11.85,15.79-2.61,17.84,0,0,39.11,3.66,103,9.5a92.75,92.75,0,0,0,40.89-5.29c44.32-16.56,57.73-50.67,57.73-50.67l26.82-67.26a1.37,1.37,0,0,1,2.53,0l1.42,3.33,17.75-7.62Z"
        }), /* @__PURE__ */ jsx("path", {
          className: "cls-7",
          d: "M1021.29,654l-17.73,6.15,1.72,5.59-31.41,82.36c-19.35,32.53-66.3,36.72-75.56,16.68l-7.09-21.5L879,747.1l3.28,10.09-94.65,33.95c-11.49,2.29-11.85,15.79-2.61,17.84,0,0,39.11,3.66,103,9.5a92.75,92.75,0,0,0,40.89-5.29c44.32-16.56,57.73-50.67,57.73-50.67l26.82-67.26a1.37,1.37,0,0,1,2.53,0l1.42,3.33,17.75-7.62Z"
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx("button", {
        className: "back-to-home",
        onClick: backToHome,
        children: "Go To Back"
      })
    })]
  });
}
var loder1 = "/images/loder1.gif";
function Loader() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("img", {
      src: loder1,
      alt: "",
      className: "loader"
    })
  });
}
var circularSlider = "";
var img03 = "/images/img03.jpeg";
var img02 = "/images/img02.jpeg";
function SliderSwap() {
  react.exports.useEffect(() => {
    let scriptElement = document.createElement("script");
    scriptElement.setAttribute("src", "/js/circular-slider.js");
    document.body.appendChild(scriptElement);
  }, []);
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs(Container, {
      children: [/* @__PURE__ */ jsx(Row, {
        className: "text-center",
        children: /* @__PURE__ */ jsxs(Col, {
          lg: 7,
          md: 7,
          className: "m-auto",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-center",
            "data-aos": "fade-up",
            children: "Our Team "
          }), /* @__PURE__ */ jsx("p", {
            className: "text-center subhdngcolor",
            "data-aos": "fade-up",
            children: "Meet Bad Ass Fam team"
          })]
        })
      }), /* @__PURE__ */ jsx(Row, {
        children: /* @__PURE__ */ jsx("div", {
          className: "circularSlider",
          children: /* @__PURE__ */ jsx("div", {
            className: "circular-slider circular-slider-1",
            children: /* @__PURE__ */ jsxs("div", {
              className: "wrapper",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "controls",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "controls__left",
                  children: /* @__PURE__ */ jsx("div", {
                    className: "icon-wrapper",
                    children: /* @__PURE__ */ jsx(BsArrowLeftCircle, {})
                  })
                }), /* @__PURE__ */ jsx("div", {
                  className: "controls__right",
                  children: /* @__PURE__ */ jsx("div", {
                    className: "icon-wrapper",
                    children: /* @__PURE__ */ jsx(BsArrowRightCircle, {})
                  })
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "slides-holder",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "slides-holder__item slides-holder__item_active ",
                  children: [" ", /* @__PURE__ */ jsx("img", {
                    src: img02,
                    alt: "",
                    width: 100
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "slides-holder__item",
                  children: /* @__PURE__ */ jsx("img", {
                    src: img03,
                    alt: "",
                    width: 100
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "slides-holder__item",
                  children: [/* @__PURE__ */ jsx("img", {
                    src: img04,
                    alt: "",
                    width: 100
                  }), " "]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "slides-holder__item",
                  children: [/* @__PURE__ */ jsx("img", {
                    src: img05,
                    alt: "",
                    width: 100
                  }), "  "]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "slides-holder__item",
                  children: [/* @__PURE__ */ jsx("img", {
                    src: img02,
                    alt: "",
                    width: 100
                  }), " "]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "descriptions",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "descriptions__item descriptions__item_visible ",
                  children: [/* @__PURE__ */ jsx("h1", {
                    children: "Founder"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "description",
                    children: "Bahare"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "soxialIcons d-flex justify-content-center",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://twitter.com/baharesalehnia",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaTwitter, {})
                      })
                    }), /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://www.instagram.com/bahare/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
                      })
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "descriptions__item",
                  children: [/* @__PURE__ */ jsx("h1", {
                    children: "Founder"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "description",
                    children: "Bardia"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "soxialIcons d-flex justify-content-center",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://twitter.com/bardiaekrami",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaTwitter, {})
                      })
                    }), /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://www.instagram.com/bardia_ek/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
                      })
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "descriptions__item",
                  children: [/* @__PURE__ */ jsx("h1", {
                    children: "Artist"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "description",
                    children: "Saeid"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "soxialIcons d-flex justify-content-center",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://twitter.com/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaTwitter, {})
                      })
                    }), /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://www.instagram.com/Saeidsalehnia/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
                      })
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "descriptions__item",
                  children: [/* @__PURE__ */ jsx("h1", {
                    children: "Development"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "description",
                    children: "Paradise"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "soxialIcons d-flex justify-content-center",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://twitter.com/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaTwitter, {})
                      })
                    }), /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://www.instagram.com/paradisetechsoft_/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
                      })
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "descriptions__item ",
                  children: [/* @__PURE__ */ jsx("h1", {
                    children: "Founder"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "description",
                    children: "Bahare"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "soxialIcons d-flex justify-content-center",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://twitter.com/baharesalehnia",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaTwitter, {})
                      })
                    }), /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://www.instagram.com/bahare/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
                      })
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "descriptions__item",
                  children: [/* @__PURE__ */ jsx("h1", {
                    children: "Founder"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "description",
                    children: "Bardia"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "soxialIcons d-flex justify-content-center",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://twitter.com/bardiaekrami",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaTwitter, {})
                      })
                    }), /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://www.instagram.com/bardia_ek/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
                      })
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "descriptions__item",
                  children: [/* @__PURE__ */ jsx("h1", {
                    children: "Artist"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "description",
                    children: "Saeid"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "soxialIcons d-flex justify-content-center",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://twitter.com/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaTwitter, {})
                      })
                    }), /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://www.instagram.com/Saeidsalehnia/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
                      })
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "descriptions__item",
                  children: [/* @__PURE__ */ jsx("h1", {
                    children: "Development"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "description",
                    children: "Paradise"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "soxialIcons d-flex justify-content-center",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://twitter.com/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaTwitter, {})
                      })
                    }), /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("a", {
                        href: "https://www.instagram.com/paradisetechsoft_/",
                        target: "_Blank",
                        children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
                      })
                    })]
                  })]
                })]
              })]
            })
          })
        })
      })]
    })
  });
}
var swiper_min = "";
var effectCube_min = "";
var pagination_min = "";
var navigation_min = "";
function Team() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs(Swiper, {
      effect: "cube",
      grabCursor: true,
      pagination: true,
      navigation: false,
      loop: true,
      autoplay: {
        delay: 2e3,
        disableOnInteraction: false
      },
      modules: [EffectCube, Pagination, Navigation, Autoplay],
      className: "mySwiper",
      children: [/* @__PURE__ */ jsxs(SwiperSlide, {
        children: [/* @__PURE__ */ jsx("img", {
          src: img02
        }), /* @__PURE__ */ jsxs("div", {
          className: "descriptions",
          children: [/* @__PURE__ */ jsx("h1", {
            children: "Founder"
          }), /* @__PURE__ */ jsx("p", {
            className: "description",
            children: "Bahare"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "soxialIcons d-flex justify-content-center",
            children: [/* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "https://twitter.com/baharesalehnia",
                target: "_Blank",
                children: /* @__PURE__ */ jsx(FaTwitter, {})
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "https://www.instagram.com/bahare/",
                target: "_Blank",
                children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
              })
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(SwiperSlide, {
        children: [/* @__PURE__ */ jsx("img", {
          src: img03
        }), /* @__PURE__ */ jsxs("div", {
          className: "descriptions",
          children: [/* @__PURE__ */ jsx("h1", {
            children: "Founder"
          }), /* @__PURE__ */ jsx("p", {
            className: "description",
            children: "Bardia"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "soxialIcons d-flex justify-content-center",
            children: [/* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "https://twitter.com/bardiaekrami",
                target: "_Blank",
                children: /* @__PURE__ */ jsx(FaTwitter, {})
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "https://www.instagram.com/bardia_ek/",
                target: "_Blank",
                children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
              })
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(SwiperSlide, {
        children: [/* @__PURE__ */ jsx("img", {
          src: img05
        }), /* @__PURE__ */ jsxs("div", {
          className: "descriptions",
          children: [/* @__PURE__ */ jsx("h1", {
            children: "Artist"
          }), /* @__PURE__ */ jsx("p", {
            className: "description",
            children: "Saeid"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "soxialIcons d-flex justify-content-center",
            children: [/* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "https://twitter.com/",
                target: "_Blank",
                children: /* @__PURE__ */ jsx(FaTwitter, {})
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "https://www.instagram.com/Saeidsalehnia/",
                target: "_Blank",
                children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
              })
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(SwiperSlide, {
        children: [/* @__PURE__ */ jsx("img", {
          src: img04
        }), /* @__PURE__ */ jsxs("div", {
          className: "descriptions",
          children: [/* @__PURE__ */ jsx("h1", {
            children: "Development"
          }), /* @__PURE__ */ jsx("p", {
            className: "description",
            children: "Paradise"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "soxialIcons d-flex justify-content-center",
            children: [/* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "https://twitter.com/",
                target: "_Blank",
                children: /* @__PURE__ */ jsx(FaTwitter, {})
              })
            }), /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx("a", {
                href: "https://www.instagram.com/paradisetechsoft_/",
                target: "_Blank",
                children: /* @__PURE__ */ jsx(FaInstagramSquare, {})
              })
            })]
          })]
        })]
      })]
    })
  });
}
function Mint(props) {
  const {
    salesData,
    totalMintPerUser,
    mintedNfts,
    defaultMintChange,
    defaultMintCost,
    useAlert,
    onClose,
    edition,
    onUpdate
  } = props;
  const [mintValue, setMintValue] = react.exports.useState(1);
  const [decBtnDisabled, setDecBtnDisabled] = react.exports.useState(true);
  const [incBtnDisabled, setIncBtnDisabled] = react.exports.useState(false);
  const [alert, setAlert] = useAlert();
  const [updated, setUpdated] = onUpdate();
  const {
    useUserStorage,
    web3
  } = react.exports.useContext(Metamask.context);
  const [userData, setUserData] = useUserStorage();
  const userAddress = userData.address || "";
  const NFTADDRESS = "0x1118a7622a4bA788f4062c628762357089032158";
  const API_BASE_URL = baseUrl("https://api.badassfam.io/api");
  const handleChange = (event) => {
    const {
      action
    } = event.target.dataset;
    let decrementBtnDisabled = false;
    let incrementBtnDisabled = false;
    let newMintValue = action == "increment" ? mintValue + 1 : mintValue - 1;
    if (newMintValue <= 1 || newMintValue >= defaultMintChange) {
      if (newMintValue <= 1) {
        decrementBtnDisabled = true;
        newMintValue = 1;
      } else {
        newMintValue = defaultMintChange;
        incrementBtnDisabled = true;
      }
    }
    setMintValue(newMintValue);
    setDecBtnDisabled(decrementBtnDisabled);
    setIncBtnDisabled(incrementBtnDisabled);
  };
  const getMetadataIpfsUrl = async () => {
    try {
      setBafAlert("Processing..", `Creating IPFS urls of metadata and art for nft`);
      const url = `${API_BASE_URL}ipfs/upload?edition=${edition}&mintValue=${mintValue}`;
      const response = await axios.get(url);
      const result = response.data;
      return arrayPluck(result.data, "ipfsUrl");
    } catch (error) {
      console.error(error);
      setBafAlert("Ooops...", error.message || `Something went wrong!`, {
        warning: true
      }, true);
      return [];
    }
  };
  const handleMint = async (event, onMintPopupClose) => {
    event.preventDefault();
    let isConn = await web3.isConnected();
    if (isConn) {
      try {
        if (mintedNfts >= totalMintPerUser) {
          setBafAlert("Thanks!", `You are already minted ${totalMintPerUser} NFTs`, {
            warning: true
          }, true);
          return;
        } else if (mintValue > defaultMintChange) {
          setBafAlert("Sorry!", `You can't mint more than ${defaultMintChange} NFTs`, {
            warning: true
          }, true);
          return;
        } else if (salesData.private.active && edition > salesData.private.supply) {
          setBafAlert("Sorry!", `Not enough supply for presale`, {
            warning: true
          }, true);
          return;
        } else if (salesData.private.active && !salesData.private.isWhiteListed) {
          setBafAlert("Ooops...", "You are not whitelisted for this sale!", {
            warning: true
          }, true);
          return;
        }
        await mintNow();
        if (typeof onMintPopupClose === "function") {
          onMintPopupClose();
        }
        setUpdated(!updated);
      } catch (error) {
        console.log(error);
      }
    } else {
      setBafAlert("Metamask Not Connected!", "You are not connected with metamask!", {
        warning: true
      }, true);
    }
  };
  const mintNow = async () => {
    try {
      if (salesData.private.active || salesData.public.active) {
        const metadataUrls = await getMetadataIpfsUrl();
        if (metadataUrls.length) {
          setBafAlert("Processing...", `Minting transaction has started!`);
          const contract = await getContract(NFTADDRESS, NFTMinter.abi);
          const value = parseEther((defaultMintCost * mintValue).toString());
          if (salesData.public.active) {
            const tx = await contract.requestPublicSale(mintValue, metadataUrls, {
              value,
              from: userAddress
            });
            const txObject = await tx.wait();
            setBafAlert("Minting transaction successfully!", /* @__PURE__ */ jsx(EtherscanLink, {
              address: txObject.transactionHash,
              type: "tx",
              name: "Minting transaction link is "
            }), {
              success: true
            }, true);
          } else {
            const isWhiteListedUser = await contract.isAddressWhiteListed(userAddress, true);
            if (isWhiteListedUser) {
              const tx = await contract.requestPreSale(mintValue, metadataUrls, {
                value,
                from: userAddress
              });
              const txObject = await tx.wait();
              setBafAlert("Minting Successfully!", /* @__PURE__ */ jsx(EtherscanLink, {
                address: txObject.transactionHash,
                type: "tx",
                name: "Minting transaction link is "
              }), {
                success: true
              }, true);
            } else {
              setBafAlert("Ooops...", "You are not whitelisted for this sale!", {
                warning: true
              }, true);
            }
          }
        } else {
          setBafAlert("Ooops...", `Metadata not uploaded on IPFS Server!`, {
            warning: true
          }, true);
        }
      } else {
        setBafAlert("Sale Not Found!", `Sorry! There is no any sale.`, {
          warning: true
        }, true);
      }
    } catch (error) {
      console.log(error);
      const message = error.message.split(":")[1].trim();
      setBafAlert("Ooops...", message, {
        warning: true
      }, true);
    }
  };
  const setBafAlert = (title, message, action = "", success = false, disabled = false) => {
    setAlert(__spreadProps(__spreadValues({}, alert), {
      disabled: disabled ? disabled : false,
      message,
      title,
      action: action ? action : {
        info: true
      },
      success: success ? success : false
    }));
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs(Container, {
      children: [/* @__PURE__ */ jsx("button", {
        className: "close",
        onClick: onClose,
        children: "\xD7"
      }), salesData.private.active || salesData.public.active ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("h2", {
          className: "sec_title text-center",
          children: "CHOOSE HOW MANY TO MINT"
        }), /* @__PURE__ */ jsxs("div", {
          className: "mintOuter",
          children: [/* @__PURE__ */ jsxs("p", {
            className: "mint_desc mt-0 mb-1",
            children: [" ", /* @__PURE__ */ jsx(FaEthereum, {
              style: {
                display: "inline-flex",
                marginTop: "-5px"
              }
            }), " ", web3.address ? defaultMintCost : "0.00", " ETH PER ", salesData.private.active ? "PRE SALE" : "PUBLIC", " MINT"]
          }), /* @__PURE__ */ jsxs("p", {
            className: "mint_desc mt-0 mb-3",
            children: [defaultMintChange, " MINT REMAINS "]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mint_box",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "mint_left d-flex",
              children: [/* @__PURE__ */ jsx(Button, {
                className: "btn_dec",
                title: "Down",
                disabled: decBtnDisabled,
                "data-action": "decrement",
                onClick: handleChange,
                children: "-"
              }), /* @__PURE__ */ jsx(Form.Control, {
                type: "text",
                value: mintValue,
                readOnly: true
              }), /* @__PURE__ */ jsx(Button, {
                className: "btn_inc",
                title: "Up",
                disabled: incBtnDisabled,
                "data-action": "increment",
                onClick: handleChange,
                children: "+"
              })]
            }), /* @__PURE__ */ jsx(Button, {
              className: "mint_now",
              title: "Mint Now",
              onClick: (e) => handleMint(e, onClose),
              children: "Mint Now"
            })]
          }), /* @__PURE__ */ jsxs("p", {
            className: "mint_desc",
            children: ["MAX ", totalMintPerUser, " MINT PER USER"]
          })]
        })]
      }) : /* @__PURE__ */ jsx("h2", {
        className: "sec_title text-center",
        children: "NO SALE FOUND"
      })]
    })
  });
}
function Home() {
  const [isLoading, setIsLoading] = react.exports.useState(false);
  const [updated, setUpdated] = react.exports.useState(false);
  const [isMainLoading, setIsMainLoading] = react.exports.useState(false);
  const [soldOut, setSoldOut] = react.exports.useState(false);
  const [mintedNfts, setMintedNfts] = react.exports.useState(1);
  const [edition, setEdition] = react.exports.useState(1);
  const [salesData, setSalesData] = react.exports.useState({
    private: {
      active: false,
      dates: {
        start: hooks().format("YYYY-MM-DD"),
        end: hooks().format("YYYY-MM-DD")
      }
    },
    public: {
      active: false,
      dates: {
        start: hooks().format("YYYY-MM-DD")
      }
    },
    supply: {},
    sale: false
  });
  const [alert, setAlert] = react.exports.useState({
    disabled: true,
    message: "",
    success: false,
    action: "info"
  });
  const [countDownData, SetcountDownData] = react.exports.useState({
    startDate: new Date(hooks().subtract(1, "day")),
    slug: "no_sale",
    isActive: false
  });
  const [defaultMintChange, setDefaultMintChange] = react.exports.useState(1);
  const [totalMintPerUser, setTotalMintPerUser] = react.exports.useState(1);
  const [defaultMintCost, setDefaultMintCost] = react.exports.useState("0.00");
  const {
    login,
    useUserStorage,
    web3
  } = react.exports.useContext(Metamask.context);
  const [userData, setUserData] = useUserStorage();
  const userAddress = userData.address || "";
  react.exports.useEffect(() => {
    getDefaultValues();
  }, [userAddress, updated]);
  const getDefaultValues = async () => {
    setIsLoading(true);
    try {
      let isConn = await web3.isConnected();
      if (isConn) {
        const saleData = await getCurrentSaleData();
        const contract = await getContract(NFTMINTOR_ADDRESS, NFTMINTOR_ABI);
        var defaultCost = 0;
        if (saleData.public.active) {
          var cost = await contract.getPublicCost().then((cost2) => cost2);
          cost = formatEther(cost);
          defaultCost = cost.toString();
        } else if (saleData.private.active) {
          var cost = await contract.pre_Sale_Cost().then((cost2) => cost2);
          cost = formatEther(cost);
          defaultCost = cost.toString();
        }
        let defaultMintVal = await contract.maxMintAmount().then((mint) => mint);
        if (userAddress) {
          const userMintBal = await contract.balanceOf(userAddress);
          setMintedNfts(userMintBal.toNumber());
          setDefaultMintChange(defaultMintVal.toNumber() - userMintBal.toNumber());
        }
        setTotalMintPerUser(defaultMintVal.toNumber());
        setDefaultMintCost(defaultCost);
      } else {
        setDefaultMintChange(1);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getCurrentSaleData = async () => {
    setIsMainLoading(true);
    try {
      const saleData = await getSalesData(userAddress);
      const {
        max,
        remaining,
        total
      } = saleData.supply || {};
      if (remaining > 0) {
        const now = new Date();
        var pubStartDate = saleData.public.dates.start;
        var priStartDate = saleData.private.dates.start;
        var priEndDate = saleData.private.dates.end;
        pubStartDate = pubStartDate ? new Date(hooks(pubStartDate)) : "";
        priStartDate = priStartDate ? new Date(hooks(priStartDate)) : "";
        priEndDate = priEndDate ? new Date(hooks(priEndDate)) : "";
        var newCountDown = countDownData;
        if (pubStartDate && priStartDate && priEndDate) {
          if (saleData.public.active) {
            var start_date = pubStartDate;
            var slug = "public_sale";
            var isActive = true;
            var publicSale = true;
            if (now.getTime() < pubStartDate.getTime()) {
              start_date = now;
              slug = "ended";
              isActive = false;
              publicSale = false;
            }
            newCountDown = {
              startDate: start_date,
              slug,
              isActive,
              publicSale
            };
          } else if (saleData.private.active) {
            var start_date = priStartDate;
            var slug = "no_sale";
            var isActive = false;
            if (now.getTime() > priStartDate.getTime()) {
              start_date = priEndDate;
              slug = "pre_sale";
              isActive = true;
              if (now.getTime() > priEndDate.getTime()) {
                start_date = pubStartDate;
                slug = "public_sale";
              }
            }
            newCountDown = {
              startDate: start_date,
              slug,
              isActive,
              publicSale: false
            };
          } else {
            if (now.getTime() < priStartDate.getTime()) {
              newCountDown = {
                startDate: priStartDate,
                slug: "before_pre_sale",
                isActive: true,
                publicSale: false
              };
            } else {
              newCountDown = {
                startDate: now,
                slug: "ended",
                isActive: false,
                publicSale: false
              };
            }
          }
        }
        SetcountDownData(newCountDown);
        setSalesData(saleData);
        setEdition(saleData.edtion);
      } else {
        setSoldOut(true);
      }
      setIsMainLoading(false);
      return saleData;
    } catch (error) {
      console.log(error);
      setIsMainLoading(false);
    }
  };
  const handleAlert = () => {
    setAlert(__spreadProps(__spreadValues({}, alert), {
      disabled: true,
      message: "Ooops...",
      title: "",
      status: false
    }));
  };
  const AlertTitle = (props) => {
    const {
      title = "Metamask Not Found!",
      success
    } = props;
    return /* @__PURE__ */ jsx("span", {
      className: "text-dark",
      children: title
    });
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs(Layout, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "slider main",
        children: [/* @__PURE__ */ jsx("div", {
          className: "circle"
        }), /* @__PURE__ */ jsx("div", {
          className: "triangle-up"
        }), /* @__PURE__ */ jsx("div", {
          className: "circle2"
        }), /* @__PURE__ */ jsx("div", {
          className: "triangle-up1"
        }), /* @__PURE__ */ jsx("div", {
          className: "circle1"
        }), /* @__PURE__ */ jsx("div", {
          className: "circle3"
        }), /* @__PURE__ */ jsx(Container, {
          fluid: true,
          className: "px-5",
          children: /* @__PURE__ */ jsxs(Row, {
            children: [/* @__PURE__ */ jsx(Col, {
              lg: 6,
              md: 6,
              children: /* @__PURE__ */ jsx("div", {
                className: " bannerTxt",
                children: /* @__PURE__ */ jsxs("div", {
                  className: "bannerTxtInner",
                  children: [/* @__PURE__ */ jsxs("h1", {
                    "data-aos": "fade-up",
                    "data-aos-duration": "3000",
                    "data-aos-delay": "300",
                    children: ["Bad Ass Fam ", /* @__PURE__ */ jsx("span", {
                      children: "NFTs"
                    })]
                  }), /* @__PURE__ */ jsx("p", {
                    "data-aos": "fade-up",
                    "data-aos-duration": "3000",
                    "data-aos-delay": "400",
                    children: "Extraordinary NFT You will love"
                  }), userAddress && !isLoading ? /* @__PURE__ */ jsx(Popup, {
                    trigger: /* @__PURE__ */ jsx(Button, {
                      className: "explore",
                      children: "Mint Now"
                    }),
                    position: "center center",
                    closeOnDocumentClick: false,
                    children: (close) => /* @__PURE__ */ jsx(Mint, {
                      salesData,
                      totalMintPerUser,
                      mintedNfts,
                      defaultMintChange,
                      defaultMintCost,
                      edition,
                      useAlert: () => [alert, setAlert],
                      onUpdate: () => [updated, setUpdated],
                      onClose: close
                    })
                  }) : /* @__PURE__ */ jsx(Fragment, {
                    children: isLoading ? /* @__PURE__ */ jsx(Button, {
                      className: "explore",
                      children: /* @__PURE__ */ jsx(Loader, {})
                    }) : /* @__PURE__ */ jsx(Button, {
                      className: "explore",
                      onClick: login,
                      children: "Connect"
                    })
                  })]
                })
              })
            }), /* @__PURE__ */ jsx(Col, {
              lg: 6,
              md: 6,
              className: "",
              children: /* @__PURE__ */ jsx("div", {
                className: "circleImgOuter",
                "data-aos": "zoom-in",
                "data-aos-duration": "3000",
                children: /* @__PURE__ */ jsx("img", {
                  src: curvedCircle3,
                  alt: "",
                  className: "circleImg"
                })
              })
            })]
          })
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "whoweare ",
        children: /* @__PURE__ */ jsx(Container, {
          fluid: true,
          className: "px-5",
          children: /* @__PURE__ */ jsxs(Row, {
            className: "",
            children: [/* @__PURE__ */ jsx(Col, {
              md: 6,
              children: /* @__PURE__ */ jsxs("div", {
                id: "whoweareTxt",
                "data-aos": "zoom-in",
                children: [/* @__PURE__ */ jsx("h4", {
                  className: "subhdngcolor text-left",
                  children: "About Us"
                }), /* @__PURE__ */ jsx("h2", {
                  className: "text-left headingTxt",
                  children: "Who are BAD ASS FAM "
                }), "  ", /* @__PURE__ */ jsx("p", {
                  className: "text-left",
                  children: "Bad Ass Fam's goal is to support all Oversized people all across the world. Our adopters will have a free pass to enter metaverse events from our team in the near future. Our hard working fully doxxed Persian team is planning to run huge charity events and donations to oversized people. Bahare, our successful photographer and social media influencer with an eye catching background is our number one founder of this project. Bardia, our blockchain expert with computer science knowledge with contribution in many different successful projects is our second founder. "
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-left",
                  children: "Our journey started since we started accepting crypto payments for a project we were working on and used all that crypto to purchase a few NFTs. In Persian culture most oversized people get bullied on an everyday basis and because of that they keep hiding themselves from society. We decided to launch our own collection where our NFTs are representing beautiful and sweet oversized ladies to use the sale fund for charity and inspire Persian culture."
                })]
              })
            }), /* @__PURE__ */ jsx(Col, {
              md: 6,
              children: /* @__PURE__ */ jsxs(Row, {
                className: "whoweareright",
                children: [/* @__PURE__ */ jsxs(Col, {
                  md: 6,
                  "data-aos": "zoom-in-down",
                  children: [" ", /* @__PURE__ */ jsx("img", {
                    src: img05,
                    alt: ""
                  })]
                }), /* @__PURE__ */ jsxs(Col, {
                  md: 6,
                  "data-aos": "zoom-in-down",
                  children: [" ", /* @__PURE__ */ jsx("img", {
                    src: img04,
                    alt: ""
                  })]
                })]
              })
            })]
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "teamSlider mt-5",
        children: /* @__PURE__ */ jsx(SliderSwap, {})
      }), /* @__PURE__ */ jsx("div", {
        className: "mobileSlider mt-5 mb-5",
        children: /* @__PURE__ */ jsx(Team, {})
      }), /* @__PURE__ */ jsx("div", {
        className: "faqSec",
        children: /* @__PURE__ */ jsx(Container, {
          fluid: true,
          className: "px-5",
          children: /* @__PURE__ */ jsxs(Row, {
            children: [/* @__PURE__ */ jsxs(Col, {
              lg: 6,
              className: "text-left faqLeft",
              "data-aos": "zoom-in",
              children: [/* @__PURE__ */ jsxs("h2", {
                className: "headingTxt",
                children: ["Frequently Asked ", /* @__PURE__ */ jsx("br", {}), "Question"]
              }), /* @__PURE__ */ jsx("p", {
                children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              })]
            }), /* @__PURE__ */ jsx(Col, {
              lg: 6,
              className: "m-auto",
              "data-aos": "zoom-in",
              children: /* @__PURE__ */ jsxs(Accordion, {
                className: "",
                children: [/* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "0",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "What is an NFTs"
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: "NFT stands for 'non-fungible token. An NFT is basically data that is accounted for in a digital ledger, and that data represents something specific and unique. An NFT can, for example, represent a unique piece of art or a game token"
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "1",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "How can I get Bad Ass Ladies?"
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: "You can mint from this website only"
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "2",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "How many Bad Ass Ladies will be minted?"
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: "There will be a total of 10000 mints."
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "3",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "How many Bad Ass Ladies can I mint?"
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: "You can mint 10 per wallet."
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "4",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "How do I get whitelisted?"
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: "You can get whitelisted by contributing to the community and letting the world know the power and vision of Bad Ass FAm. Join our Discord Whitelist channel for more information."
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "5",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "Cost?"
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsxs("ul", {
                      children: [/* @__PURE__ */ jsx("li", {
                        children: "0.05 ETH presale."
                      }), /* @__PURE__ */ jsx("li", {
                        children: "0.06 ETH public"
                      }), /* @__PURE__ */ jsx("li", {
                        children: "5% royalty on secondary transactions."
                      })]
                    })
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "6",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "When does minting begin?"
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: "TBD"
                  })]
                })]
              })
            })]
          })
        })
      }), !alert.disabled && /* @__PURE__ */ jsx(_default, __spreadProps(__spreadValues({}, alert.action), {
        confirmBtnText: "Ok",
        confirmBtnBsStyle: "outline-link",
        title: /* @__PURE__ */ jsx(AlertTitle, {
          title: alert.title,
          success: alert.success
        }),
        onConfirm: handleAlert,
        closeOnClickOutside: false,
        confirmBtnCssClass: alert.success ? "text-[#333] font-bold py-2 px-5 border-2 border-[#333] rounded-full" : "d-none",
        children: /* @__PURE__ */ jsx("span", {
          className: "text-dark",
          children: alert.message
        })
      }))]
    })
  });
}
function Faq() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Layout, {
      children: /* @__PURE__ */ jsxs("div", {
        className: "",
        children: [/* @__PURE__ */ jsx("div", {
          className: "faq-banner",
          "data-aos": "fade-down",
          children: /* @__PURE__ */ jsx("h1", {
            className: "innerbannerTxt",
            children: "Frequently Asked Questions"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "faqSec my-5",
          children: /* @__PURE__ */ jsx(Container, {
            fluid: true,
            className: "px-5",
            children: /* @__PURE__ */ jsx(Row, {
              children: /* @__PURE__ */ jsx(Col, {
                lg: 10,
                className: "m-auto",
                children: /* @__PURE__ */ jsxs(Accordion, {
                  defaultActiveKey: "0",
                  className: "",
                  children: [/* @__PURE__ */ jsxs(Accordion.Item, {
                    eventKey: "0",
                    children: [/* @__PURE__ */ jsx(Accordion.Header, {
                      children: "What is an NFTs"
                    }), /* @__PURE__ */ jsx(Accordion.Body, {
                      children: "NFT stands for 'non-fungible token. An NFT is basically data that is accounted for in a digital ledger, and that data represents something specific and unique. An NFT can, for example, represent a unique piece of art or a game token"
                    })]
                  }), /* @__PURE__ */ jsxs(Accordion.Item, {
                    eventKey: "1",
                    children: [/* @__PURE__ */ jsx(Accordion.Header, {
                      children: "How can I get Bad Ass Ladies?"
                    }), /* @__PURE__ */ jsx(Accordion.Body, {
                      children: "You can mint from this website only"
                    })]
                  }), /* @__PURE__ */ jsxs(Accordion.Item, {
                    eventKey: "2",
                    children: [/* @__PURE__ */ jsx(Accordion.Header, {
                      children: "How many Bad Ass Ladies will be minted?"
                    }), /* @__PURE__ */ jsx(Accordion.Body, {
                      children: "There will be a total of 10000 mints."
                    })]
                  }), /* @__PURE__ */ jsxs(Accordion.Item, {
                    eventKey: "3",
                    children: [/* @__PURE__ */ jsx(Accordion.Header, {
                      children: "How many Bad Ass Ladies can I mint?"
                    }), /* @__PURE__ */ jsx(Accordion.Body, {
                      children: "You can mint 10 per wallet."
                    })]
                  }), /* @__PURE__ */ jsxs(Accordion.Item, {
                    eventKey: "4",
                    children: [/* @__PURE__ */ jsx(Accordion.Header, {
                      children: "How do I get whitelisted?"
                    }), /* @__PURE__ */ jsx(Accordion.Body, {
                      children: "You can get whitelisted by contributing to the community and letting the world know the power and vision of Bad Ass FAm. Join our Discord Whitelist channel for more information."
                    })]
                  }), /* @__PURE__ */ jsxs(Accordion.Item, {
                    eventKey: "5",
                    children: [/* @__PURE__ */ jsx(Accordion.Header, {
                      children: "Cost?"
                    }), /* @__PURE__ */ jsx(Accordion.Body, {
                      children: /* @__PURE__ */ jsxs("ul", {
                        children: [/* @__PURE__ */ jsx("li", {
                          children: "0.05 ETH presale."
                        }), /* @__PURE__ */ jsx("li", {
                          children: "0.06 ETH public"
                        }), /* @__PURE__ */ jsx("li", {
                          children: "5% royalty on secondary transactions."
                        })]
                      })
                    })]
                  }), /* @__PURE__ */ jsxs(Accordion.Item, {
                    eventKey: "6",
                    children: [/* @__PURE__ */ jsx(Accordion.Header, {
                      children: "When does minting begin?"
                    }), /* @__PURE__ */ jsx(Accordion.Body, {
                      children: "TBD"
                    })]
                  })]
                })
              })
            })
          })
        })]
      })
    })
  });
}
function Cards() {
  const galleries = [{
    title: "Card",
    tokenId: 1,
    image: "/images/img03.jpeg"
  }, {
    title: "Card",
    tokenId: 2,
    image: "/images/img04.jpeg"
  }, {
    title: "Card",
    tokenId: 3,
    image: "/images/img05.jpeg"
  }, {
    title: "Card",
    tokenId: 4,
    image: "/images/img06.jpeg"
  }, {
    title: "Card",
    tokenId: 5,
    image: "/images/img06.jpeg"
  }, {
    title: "Card",
    tokenId: 6,
    image: "/images/img05.jpeg"
  }, {
    title: "Card",
    tokenId: 7,
    image: "/images/img03.jpeg"
  }, {
    title: "Card",
    tokenId: 8,
    image: "/images/img07.jpeg"
  }];
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("div", {
      className: "cardSec py-5",
      children: /* @__PURE__ */ jsxs(Container, {
        children: [/* @__PURE__ */ jsxs(Row, {
          className: "justify-content-between cardTopbar mb-3",
          children: [/* @__PURE__ */ jsx(Col, {
            children: /* @__PURE__ */ jsx("h2", {
              children: "Live Auction"
            })
          }), /* @__PURE__ */ jsx(Col, {
            children: /* @__PURE__ */ jsx("a", {
              href: "#",
              children: /* @__PURE__ */ jsx("h4", {
                children: "Explore More"
              })
            })
          })]
        }), /* @__PURE__ */ jsx(Row, {
          children: galleries.length ? galleries.map((gallery, index2) => /* @__PURE__ */ jsx(Popup, {
            trigger: /* @__PURE__ */ jsx(Col, {
              lg: 3,
              children: /* @__PURE__ */ jsxs(Card, {
                className: "cardBgDark border-color1 marginBottom",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "cardImage",
                  children: /* @__PURE__ */ jsx(Card.Img, {
                    variant: "top",
                    src: gallery.image
                  })
                }), /* @__PURE__ */ jsxs(Card.Body, {
                  children: [/* @__PURE__ */ jsx(Card.Title, {
                    children: gallery.title
                  }), /* @__PURE__ */ jsxs(Card.Text, {
                    children: ["No. ", gallery.tokenId]
                  })]
                })]
              })
            }, index2),
            position: "center center",
            children: /* @__PURE__ */ jsxs("div", {
              className: "popup-modal",
              children: [/* @__PURE__ */ jsx("div", {
                className: "popup-left",
                children: /* @__PURE__ */ jsx("img", {
                  src: gallery.image,
                  alt: ""
                })
              }), /* @__PURE__ */ jsx("div", {
                className: "popup-right",
                children: /* @__PURE__ */ jsx("h2", {
                  children: gallery.title
                })
              })]
            })
          })) : /* @__PURE__ */ jsx(Col, {
            children: /* @__PURE__ */ jsx(Card, {
              className: "cardBgDark border-color1 marginBottom",
              children: "No Data Found"
            })
          })
        })]
      })
    })
  });
}
function Gallery() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Layout, {
      children: /* @__PURE__ */ jsx("div", {
        className: "main",
        children: /* @__PURE__ */ jsx(Container, {
          fluid: true,
          children: /* @__PURE__ */ jsxs(Row, {
            children: [/* @__PURE__ */ jsxs(Col, {
              lg: 3,
              className: "py-5 fixed-sidebar",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-left hdngColor",
                children: "Filter"
              }), /* @__PURE__ */ jsxs(Accordion, {
                defaultActiveKey: "0",
                className: "filterBox ",
                children: [/* @__PURE__ */ jsxs(Accordion.Item, {
                  children: [/* @__PURE__ */ jsxs(Accordion.Header, {
                    children: ["Special", /* @__PURE__ */ jsx("i", {
                      className: "fa fa-chevron-down",
                      "aria-hidden": "true"
                    })]
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsx(Form, {
                      children: /* @__PURE__ */ jsxs(Form.Group, {
                        className: "mb-3",
                        controlId: "formBasicCheckbox",
                        children: [/* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        })]
                      })
                    })
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "1",
                  children: [/* @__PURE__ */ jsxs(Accordion.Header, {
                    children: ["Clothing", /* @__PURE__ */ jsx("i", {
                      className: "fa fa-chevron-down rightIcon",
                      "aria-hidden": "true"
                    })]
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsx(Form, {
                      children: /* @__PURE__ */ jsxs(Form.Group, {
                        className: "mb-3",
                        controlId: "formBasicCheckbox",
                        children: [/* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        })]
                      })
                    })
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "2",
                  children: [/* @__PURE__ */ jsxs(Accordion.Header, {
                    children: ["Offhand", /* @__PURE__ */ jsx("i", {
                      className: "fa fa-chevron-down",
                      "aria-hidden": "true"
                    })]
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsx(Form, {
                      children: /* @__PURE__ */ jsxs(Form.Group, {
                        className: "mb-3",
                        controlId: "formBasicCheckbox",
                        children: [/* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        })]
                      })
                    })
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "3",
                  children: [/* @__PURE__ */ jsxs(Accordion.Header, {
                    children: ["Hair", /* @__PURE__ */ jsx("i", {
                      className: "fa fa-chevron-down",
                      "aria-hidden": "true"
                    })]
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsx(Form, {
                      children: /* @__PURE__ */ jsxs(Form.Group, {
                        className: "mb-3",
                        controlId: "formBasicCheckbox",
                        children: [/* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        })]
                      })
                    })
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "1",
                  children: [/* @__PURE__ */ jsxs(Accordion.Header, {
                    children: ["Clothing", /* @__PURE__ */ jsx("i", {
                      className: "fa fa-chevron-down rightIcon",
                      "aria-hidden": "true"
                    })]
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsx(Form, {
                      children: /* @__PURE__ */ jsxs(Form.Group, {
                        className: "mb-3",
                        controlId: "formBasicCheckbox",
                        children: [/* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        })]
                      })
                    })
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "2",
                  children: [/* @__PURE__ */ jsxs(Accordion.Header, {
                    children: ["Offhand", /* @__PURE__ */ jsx("i", {
                      className: "fa fa-chevron-down",
                      "aria-hidden": "true"
                    })]
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsx(Form, {
                      children: /* @__PURE__ */ jsxs(Form.Group, {
                        className: "mb-3",
                        controlId: "formBasicCheckbox",
                        children: [/* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        })]
                      })
                    })
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "3",
                  children: [/* @__PURE__ */ jsxs(Accordion.Header, {
                    children: ["Hair", /* @__PURE__ */ jsx("i", {
                      className: "fa fa-chevron-down",
                      "aria-hidden": "true"
                    })]
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsx(Form, {
                      children: /* @__PURE__ */ jsxs(Form.Group, {
                        className: "mb-3",
                        controlId: "formBasicCheckbox",
                        children: [/* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        }), /* @__PURE__ */ jsx(Form.Check, {
                          type: "checkbox",
                          label: "Check me out"
                        })]
                      })
                    })
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsx(Col, {
              lg: 9,
              className: "fixed-rightsec",
              children: /* @__PURE__ */ jsx(Cards, {})
            })]
          })
        })
      })
    })
  });
}
function Roadmap() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Layout, {
      children: /* @__PURE__ */ jsx("div", {
        className: "main",
        children: /* @__PURE__ */ jsx(Container, {
          fluid: true,
          className: "px-5",
          children: /* @__PURE__ */ jsxs(Row, {
            children: [/* @__PURE__ */ jsx(Col, {
              lg: 5,
              children: /* @__PURE__ */ jsxs("div", {
                className: "stickyOuter",
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "title text-left",
                  children: "roadmap"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-left",
                  children: "There are oversized people all around this world who hide themselves from society because of the problem of being judged by others. Bad Ass Fam has put 10000 unique NFTs together to show the world that being oversized is not an issue and all people regardless of their differences, they all have their own specific potential and capabilities. Our collection has more than 100+ unique traits and will eventually find its way to put all these beautiful oversized ladies into Metaverse"
                })]
              })
            }), /* @__PURE__ */ jsx(Col, {
              lg: 7,
              children: /* @__PURE__ */ jsxs("ul", {
                className: "road-map",
                children: [/* @__PURE__ */ jsxs("li", {
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "20%"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "AS A GIFT TO EARLY ADOPTERS, 2 ETH WILL BE GIVEN AWAY TO 5 RANDOM HOLDERS."
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "reverse-column",
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "40%"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "4 ETH WORTH OF DONATIONS WILL BE MADE AS A CHARITY TO OVERWEIGHT PEOPLE TO ENCOURAGE THEM TO BE LIVING A LIFE THEY WANT."
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "60%"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "TO THANK OUR WONDERFUL COMMUNITY, WE WILL BE RUNNING 6 HUGE GIVEAWAY TO OUR SUPPORTIVE HOLDERS."
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "reverse-column",
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "80%"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "BAD ASS FAM HAS A VERY EXCITING PLAN FOR ACTUAL \u201CBAF\u201D MERCH AVAILABLE EXCLUSIVELY TO BAD ASS FAM HOLDERS."
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "100%"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "5 ETH FUND TO NEW ARTISTS THAT ARE PLANNING TO DEVELOP THEIR NFT PROJECTS TO PROMOTE AND HELP THEM TO GROW. WE WILL ALSO GIVE THEM A FREE 1:1 CONSULTATION."
                  })]
                })]
              })
            })]
          })
        })
      })
    })
  });
}
var banner1 = "/images/banner1.jpg";
function About() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs(Layout, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "innerpgBanner",
        "data-aos": "fade-down",
        children: [/* @__PURE__ */ jsx("img", {
          src: banner1,
          alt: "",
          className: ""
        }), /* @__PURE__ */ jsx("h1", {
          className: "innerbannerTxt",
          children: "Meet Bad Ass Fam"
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "abouttoptxt",
        children: /* @__PURE__ */ jsx(Container, {
          fluid: true,
          className: "px-5",
          children: /* @__PURE__ */ jsxs(Row, {
            className: " align-items-center",
            children: [/* @__PURE__ */ jsx(Col, {
              lg: 5,
              md: 5,
              children: /* @__PURE__ */ jsx("img", {
                src: img04,
                alt: "",
                className: "w-100 fancyradius"
              })
            }), /* @__PURE__ */ jsxs(Col, {
              lg: 7,
              md: 7,
              className: "px-5",
              id: "aboutTxt",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "subhdngcolor text-left",
                children: "Creative Vision & Mission"
              }), /* @__PURE__ */ jsx("h2", {
                className: "text-left",
                children: "Who we are Bad Ass Fam "
              }), /* @__PURE__ */ jsx("p", {
                className: "text-left",
                children: "Bad Ass Fam's goal is to support all Oversized people all across the world. Our adopters will have a free pass to enter metaverse events from our team in the near future. Our hard working fully doxxed Persian team is planning to run huge charity events and donations to oversized people. Bahare, our successful photographer and social media influencer with an eye catching background is our number one founder of this project. Bardia, our blockchain expert with computer science knowledge with contribution in many different successful projects is our second founder. "
              }), /* @__PURE__ */ jsx("p", {
                className: "text-left",
                children: "Our journey started since we started accepting crypto payments for a project we were working on and used all that crypto to purchase a few NFTs. In Persian culture most oversized people get bullied on an everyday basis and because of that they keep hiding themselves from society. We decided to launch our own collection where our NFTs are representing beautiful and sweet oversized ladies to use the sale fund for charity and inspire Persian culture."
              })]
            })]
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "teamSlider mt-5",
        children: /* @__PURE__ */ jsx(SliderSwap, {})
      }), /* @__PURE__ */ jsx("div", {
        className: "mobileSlider mt-5 mb-5",
        children: /* @__PURE__ */ jsx(Team, {})
      })]
    })
  });
}
const Routes = () => {
  return /* @__PURE__ */ jsxs(Routes$1, {
    children: [/* @__PURE__ */ jsx(Route, {
      exact: true,
      path: "/",
      element: /* @__PURE__ */ jsx(Home, {})
    }), /* @__PURE__ */ jsx(Route, {
      exact: true,
      path: "/gallery",
      element: /* @__PURE__ */ jsx(Gallery, {})
    }), /* @__PURE__ */ jsx(Route, {
      exact: true,
      path: "/about",
      element: /* @__PURE__ */ jsx(About, {})
    }), /* @__PURE__ */ jsx(Route, {
      exact: true,
      path: "/roadmap",
      element: /* @__PURE__ */ jsx(Roadmap, {})
    }), /* @__PURE__ */ jsx(Route, {
      exact: true,
      path: "/faq",
      element: /* @__PURE__ */ jsx(Faq, {})
    }), /* @__PURE__ */ jsx(Route, {
      exact: true,
      path: "/profile",
      element: /* @__PURE__ */ jsx(Profile, {})
    }), /* @__PURE__ */ jsx(Route, {
      path: "*",
      element: /* @__PURE__ */ jsx(NoPageFound, {})
    })]
  });
};
var reactDatepicker = "";
var config = {
  "NFTMinter": {
    "address": "0x1118a7622a4bA788f4062c628762357089032158",
    "abi": NFTMinter.abi
  }
};
function WhiteListedModal({
  onSubmit,
  title
}) {
  const defaultAddressObject = {
    value: "",
    isValid: true
  };
  const [addresses, setAddresses] = react.exports.useState([defaultAddressObject]);
  const addNewInput = () => {
    setAddresses([...addresses, defaultAddressObject]);
  };
  const handleChange = (e) => {
    let {
      name,
      value
    } = e.target;
    let key = name.replace("address_", "", name);
    let newAddresses = [...addresses];
    newAddresses[key - 1] = {
      value,
      isValid: isAddress(value)
    };
    setAddresses(newAddresses);
  };
  const removeInput = (i) => {
    let newAddresses = [...addresses];
    newAddresses.splice(i, 1);
    setAddresses(newAddresses);
  };
  const handleSubmit = async (event, handleClose) => {
    event.preventDefault();
    let newAddresses = addresses.filter((address) => address.isValid && address.value).map((address) => address.value.toLowerCase());
    await onSubmit(newAddresses);
    if (typeof handleClose === "function") {
      handleClose();
    }
  };
  return /* @__PURE__ */ jsx(Popup, {
    trigger: (open) => {
      return /* @__PURE__ */ jsx(Button, {
        className: "explore",
        children: title.toUpperCase()
      });
    },
    position: "center center",
    closeOnDocumentClick: false,
    onClose: () => setAddresses([defaultAddressObject]),
    children: (close) => /* @__PURE__ */ jsxs("div", {
      className: "popup",
      children: [/* @__PURE__ */ jsx("button", {
        className: "close",
        onClick: close,
        children: "\xD7"
      }), /* @__PURE__ */ jsxs("h3", {
        className: "text-dark text-center mb-5",
        children: ["Set ", title, " Users"]
      }), addresses.length && addresses.map((address, index2) => {
        let iteration = index2 + 1;
        let lastRow = addresses.length == iteration;
        const value = address.value || "";
        const isValid = address.isValid;
        return /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "popup_addr_outr ",
            children: [/* @__PURE__ */ jsx(Form.Group, {
              controlId: "exampleForm.ControlInput1",
              className: "inputWidth",
              children: /* @__PURE__ */ jsx(Form.Control, {
                type: "email",
                placeholder: `Address #${iteration}`,
                name: `address_${iteration}`,
                value,
                onChange: handleChange
              })
            }), lastRow ? /* @__PURE__ */ jsx("span", {
              role: "button",
              onClick: addNewInput,
              children: /* @__PURE__ */ jsx(AiOutlinePlusCircle, {
                fontSize: 30,
                color: "rgb(41 82 227)"
              })
            }) : /* @__PURE__ */ jsx("span", {
              role: "button",
              onClick: () => removeInput(index2),
              children: /* @__PURE__ */ jsx(MdOutlineCancel, {
                fontSize: 30,
                color: "rgb(255 20 20)"
              })
            })]
          }), !isValid ? /* @__PURE__ */ jsx("div", {
            className: "address-input-error",
            children: "Invalid Address"
          }) : ""]
        }, index2);
      }), /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [" ", /* @__PURE__ */ jsx(Button, {
          className: "cstm_btn explore addBtn",
          onClick: (event) => handleSubmit(event, close),
          children: "Add"
        })]
      })]
    })
  });
}
var Profile$1 = "";
function Profile() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const [isLoading, setIsLoading] = react.exports.useState(false);
  const [updated, setUpdated] = react.exports.useState(false);
  const [preSaleDate, setPreSaleDate] = react.exports.useState({
    start: new Date(),
    end: new Date()
  });
  const [startDate, setStartDate] = react.exports.useState(new Date(hooks().add(1, "day")));
  const [salesData, setSalesData] = react.exports.useState({
    private: {
      active: false,
      dates: {
        start: hooks().format("YYYY-MM-DD"),
        end: hooks().format("YYYY-MM-DD")
      }
    },
    public: {
      active: false,
      dates: {
        start: hooks().format("YYYY-MM-DD")
      }
    }
  });
  const [profileData, setProfileData] = react.exports.useState({
    user: {
      address: "0x0000000000000000000000000000000000000000",
      balance: "0.0000"
    },
    contract: {
      address: "0x0000000000000000000000000000000000000000",
      balance: "0.0000",
      show: true
    }
  });
  const [alert, setAlert] = react.exports.useState({
    disabled: true,
    message: "",
    success: false,
    action: "info"
  });
  const {
    NFTMinter: NFTMinter2
  } = config;
  const {
    web3Provider,
    context,
    getContract: getContract2
  } = Metamask;
  const {
    useUserStorage,
    web3
  } = react.exports.useContext(context);
  const [userData, setUserData] = useUserStorage();
  const userAddress = userData.address || "";
  const navigate = useNavigate();
  react.exports.useEffect(() => {
    const getProfileData = async () => {
      setIsLoading(true);
      let isConn = await web3.isConnected();
      if (isConn) {
        try {
          const provider = await web3Provider();
          const contract = await getContract2(NFTMinter2.address, NFTMinter2.abi);
          let balance = "0.00";
          const ownerAddress = await contract.owner();
          const isOwner = ownerAddress.toLowerCase() === userAddress.toLowerCase();
          if (isOwner) {
            balance = await contract.getBalance();
            balance = parseFloat(formatEther(balance.toString())).toFixed(4);
          }
          let userBalance = await provider.getBalance(userAddress);
          userBalance = parseFloat(formatEther(userBalance.toString())).toFixed(4);
          let profileData2 = {
            user: {
              address: userAddress,
              balance: userBalance
            },
            contract: {
              address: contract.address,
              balance,
              show: isOwner
            }
          };
          setProfileData(profileData2);
          await getDefaultValues();
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoading(false);
    };
    if (!userAddress) {
      navigate("/");
      return;
    }
    getProfileData();
  }, [userAddress, updated]);
  const setBafAlert = (title, message, action = "", success = false, disabled = false) => {
    setAlert(__spreadProps(__spreadValues({}, alert), {
      disabled: disabled ? disabled : false,
      message,
      title,
      action: action ? action : {
        info: true
      },
      success: success ? success : false
    }));
  };
  const getDefaultValues = async () => {
    const newSalesData = await getSalesData(userAddress);
    setSalesData(newSalesData);
    setPreSaleDate({
      start: new Date(newSalesData.private.dates.start || hooks()),
      end: new Date(newSalesData.private.dates.end || hooks())
    });
    setStartDate(new Date(newSalesData.public.dates.start || hooks()));
  };
  const handleWithdraw = async (event) => {
    event.preventDefault();
    try {
      if (profileData.contract.balance > 0) {
        setBafAlert("Transaction pending...", `Now withdrawing your contract money!`);
        const contract = await getContract2(NFTMinter2.address, NFTMinter2.abi);
        const transaction = await contract.withdraw({
          from: userAddress
        });
        const tx = transaction.wait();
        if (tx) {
          setUpdated(!updated);
          setBafAlert("Withdraw Successfully!", /* @__PURE__ */ jsx(EtherscanLink, {
            address: tx.transactionHash,
            type: "tx",
            name: "Withdraw transaction link is "
          }), {
            success: true
          }, true);
        } else {
          setBafAlert("Ooops...", "Something went wrong", {
            warning: true
          }, true);
        }
      } else {
        setBafAlert("Ooops...", "No sufficient balance in the contract", {
          warning: true
        }, true);
      }
    } catch (error) {
      const message = error.message.split(":")[1].trim();
      setBafAlert("Ooops...", message, {
        warning: true
      }, true);
    }
  };
  const handleWhiteListed = async (addresses) => {
    var _a2;
    try {
      if (addresses.length > 0) {
        setBafAlert("Processing...", `You are adding whitelisted users!`);
        const contract = await getContract2(NFTMinter2.address, NFTMinter2.abi);
        const transaction = await contract.setWhiteListed(addresses, true, {
          from: userAddress
        });
        const tx = await transaction.wait();
        if (tx) {
          setBafAlert("Set Whitelisted Users Successfully!", /* @__PURE__ */ jsx(EtherscanLink, {
            address: tx.transactionHash,
            type: "tx",
            name: "Whitelisted transaction link is "
          }), {
            success: true
          }, true);
        }
      } else {
        setBafAlert("Ooops...", "No Address Found!", {
          warning: true
        }, true);
      }
    } catch (error) {
      console.log(error);
      const message = (_a2 = error.message.split(":")[1]) == null ? void 0 : _a2.trim();
      setBafAlert("Ooops...", message.split(":")[0].trim(), {
        warning: true
      }, true);
    }
  };
  const handleGiveawayListed = async (addresses) => {
    var _a2;
    try {
      if (addresses.length > 0) {
        setBafAlert("Processing...", `You are adding Giveaway users!`);
        const contract = await getContract2(NFTMinter2.address, NFTMinter2.abi);
        const transaction = await contract.setWhiteListed(addresses, false, {
          from: userAddress
        });
        const tx = await transaction.wait();
        if (tx) {
          setBafAlert("Set Giveaway Users Successfully!", /* @__PURE__ */ jsx(EtherscanLink, {
            address: tx.transactionHash,
            type: "tx",
            name: "GiveawayListed transaction link is "
          }), {
            success: true
          }, true);
        }
      } else {
        setBafAlert("Ooops...", "No Address Found!", {
          warning: true
        }, true);
      }
    } catch (error) {
      const message = ((_a2 = error.message.split(":")[1]) == null ? void 0 : _a2.trim()) || "";
      setBafAlert("Ooops...", message.split(":")[0].trim(), {
        warning: true
      }, true);
    }
  };
  const setSaleStaging = async (staging = "public", start_date, end_date = "") => {
    var _a2;
    staging = typeof staging === "string" && staging.trim() ? staging.trim() : "public";
    let isConn = await web3.isConnected();
    if (isConn) {
      try {
        const contract = await getContract2(NFTMinter2.address, NFTMinter2.abi);
        start_date = hooks(start_date).unix();
        end_date = hooks(end_date).unix();
        if (staging == "public") {
          const transaction = await contract.setPublicSalesTime(start_date, {
            from: userAddress
          });
          const tx = await transaction.wait();
          if (tx) {
            setBafAlert("Public Sale Date Updated Successfully!", /* @__PURE__ */ jsx(EtherscanLink, {
              address: tx.transactionHash,
              type: "tx",
              name: "Public mint date transaction link is "
            }), {
              success: true
            }, true);
            setUpdated(!updated);
          }
        } else if (staging == "pre") {
          const transaction = await contract.setPreSalesTime(start_date, end_date, {
            from: userAddress
          });
          const tx = await transaction.wait();
          if (tx) {
            setBafAlert("Pre Sale Date Updated Successfully!", /* @__PURE__ */ jsx(EtherscanLink, {
              address: tx.transactionHash,
              type: "tx",
              name: "Pre Sale date transaction link is "
            }), {
              success: true
            }, true);
            setUpdated(!updated);
          }
        }
      } catch (error) {
        console.log(error);
        const message = ((_a2 = error.message.split(":")[1]) == null ? void 0 : _a2.trim()) || "";
        setBafAlert("Ooops...", message.split(":")[0].trim(), {
          warning: true
        }, true);
      }
    } else {
      setBafAlert("Connection Not Found!", "You are not connected with metamask", {
        warning: true
      }, true);
    }
  };
  const handlePublicSale = async (event) => {
    event.preventDefault();
    var start_date = hooks(startDate);
    if (start_date.isValid()) {
      setBafAlert("Start Transaction...", `You are adding public sale date!`);
      start_date = start_date.format("YYYY-MM-DD 00:00:00");
      setSaleStaging("public", start_date);
    }
  };
  const handlePreSale = async (event) => {
    event.preventDefault();
    var start_date = hooks(preSaleDate.start);
    var end_date = hooks(preSaleDate.end);
    if (start_date.isValid() && end_date.isValid() && start_date.unix() <= end_date.unix()) {
      setBafAlert("Start Transaction...", `You are adding pre sale dates!`);
      start_date = start_date.format("YYYY-MM-DD 00:00:00");
      end_date = end_date.format("YYYY-MM-DD 23:59:00");
      setSaleStaging("pre", start_date, end_date);
    }
  };
  const handleAlert = () => {
    setAlert(__spreadProps(__spreadValues({}, alert), {
      disabled: true,
      message: "Ooops...",
      title: "",
      status: false
    }));
  };
  const AlertTitle = (props) => {
    const {
      title = "Metamask Not Found!",
      success
    } = props;
    return /* @__PURE__ */ jsx("span", {
      className: "text-dark",
      children: title
    });
  };
  const CustomDateInput = React.forwardRef((props, ref) => {
    return /* @__PURE__ */ jsx(Form.Group, {
      className: "",
      controlId: "formBasicEmail",
      ref,
      children: /* @__PURE__ */ jsx(Form.Control, __spreadProps(__spreadValues({
        type: "text"
      }, props), {
        readOnly: true
      }))
    });
  });
  return /* @__PURE__ */ jsxs(Layout, {
    className: "profile-page",
    children: [/* @__PURE__ */ jsx("div", {
      className: "faq-banner",
      "data-aos": "fade-down",
      children: /* @__PURE__ */ jsx("h1", {
        className: "innerbannerTxt",
        children: "Profile"
      })
    }), /* @__PURE__ */ jsxs("section", {
      className: "profile_sec",
      children: [/* @__PURE__ */ jsx(Container, {
        children: isLoading ? /* @__PURE__ */ jsx("div", {
          className: "profile_cont",
          children: "Loading..."
        }) : /* @__PURE__ */ jsxs("div", {
          className: "profile_cont",
          children: [/* @__PURE__ */ jsx("div", {
            className: "profile_img",
            children: /* @__PURE__ */ jsx("img", {
              src: "/images/user-avatar.png",
              alt: "Image",
              height: "120px",
              width: "120px"
            })
          }), /* @__PURE__ */ jsxs("h5", {
            title: (_a = profileData == null ? void 0 : profileData.user) == null ? void 0 : _a.address,
            children: ["#", /* @__PURE__ */ jsx(TrimAndCopyText, {
              text: (_b = profileData == null ? void 0 : profileData.user) == null ? void 0 : _b.address
            })]
          }), ((_c = profileData == null ? void 0 : profileData.contract) == null ? void 0 : _c.show) ? /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsxs("div", {
              className: "follow_outr",
              children: [/* @__PURE__ */ jsxs("span", {
                children: [/* @__PURE__ */ jsx(FaEthereum, {
                  className: "d-inline-flex"
                }), (_d = profileData == null ? void 0 : profileData.contract) == null ? void 0 : _d.balance, " ", /* @__PURE__ */ jsx("small", {
                  className: "mt-2",
                  children: "CONTRACT BALANCE"
                })]
              }), /* @__PURE__ */ jsxs("span", {
                title: (_e = profileData == null ? void 0 : profileData.contract) == null ? void 0 : _e.address,
                children: [/* @__PURE__ */ jsx(TrimAndCopyText, {
                  text: (_f = profileData == null ? void 0 : profileData.contract) == null ? void 0 : _f.address,
                  type: "address",
                  isLink: true
                }), /* @__PURE__ */ jsx("small", {
                  className: "mt-2",
                  children: "CONTRACT ADDRESS"
                })]
              }), /* @__PURE__ */ jsxs("span", {
                children: [/* @__PURE__ */ jsx(FaEthereum, {
                  className: "d-inline-flex"
                }), (_g = profileData == null ? void 0 : profileData.user) == null ? void 0 : _g.balance, " ", /* @__PURE__ */ jsx("small", {
                  className: "mt-2",
                  children: "YOUR BALANCE"
                })]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "prof_btns",
              children: /* @__PURE__ */ jsxs(Accordion, {
                children: [/* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "0",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "Withdraw"
                  }), /* @__PURE__ */ jsxs(Accordion.Body, {
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "AccorTxt",
                      children: "Withdrawing the amount of contract that are sent by user during minting."
                    }), /* @__PURE__ */ jsx(Button, {
                      className: "explore",
                      onClick: handleWithdraw,
                      children: "WITHDRAW"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "1",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "Giveaway Listed Users"
                  }), /* @__PURE__ */ jsxs(Accordion.Body, {
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "AccorTxt",
                      children: "Set the listed users for giveaway."
                    }), /* @__PURE__ */ jsx(WhiteListedModal, {
                      onSubmit: handleGiveawayListed,
                      title: "Giveaway Listed Users"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "2",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "White Listed Users"
                  }), /* @__PURE__ */ jsxs(Accordion.Body, {
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "AccorTxt",
                      children: "Set the white listed users for Pre Sale."
                    }), /* @__PURE__ */ jsx(WhiteListedModal, {
                      onSubmit: handleWhiteListed,
                      title: "White Listed"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "3",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "Pre Sale Dates"
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "pre-sale-section",
                      children: [/* @__PURE__ */ jsxs("h5", {
                        children: ["Pre Sale Date", salesData.private.active ? /* @__PURE__ */ jsx("span", {
                          className: "active-sale",
                          children: "( Active )"
                        }) : /* @__PURE__ */ jsx("span", {
                          className: "inactive-sale",
                          children: "( In-Active )"
                        })]
                      }), /* @__PURE__ */ jsxs("p", {
                        className: "AccorTxt",
                        children: ["Start Date ", salesData.private.dates.start && /* @__PURE__ */ jsxs("span", {
                          className: "sale-date",
                          children: ["(", hooks(salesData.private.dates.start).format("YYYY-MM-DD"), ")"]
                        }), " and End Date ", salesData.private.dates.end && /* @__PURE__ */ jsxs("span", {
                          className: "sale-date",
                          children: ["(", hooks(salesData.private.dates.end).format("YYYY-MM-DD"), ")"]
                        }), " for Pre Sale."]
                      }), /* @__PURE__ */ jsxs(Row, {
                        className: "justify-content-md-center",
                        children: [/* @__PURE__ */ jsxs(Col, {
                          xs: true,
                          lg: "12",
                          children: [/* @__PURE__ */ jsx("label", {
                            htmlFor: "",
                            className: "",
                            children: "Start date"
                          }), /* @__PURE__ */ jsx(Wt, {
                            selected: preSaleDate.start,
                            onChange: (date) => setPreSaleDate({
                              start: date,
                              end: date
                            }),
                            selectsStart: true,
                            minDate: new Date(),
                            startDate: preSaleDate.start,
                            endDate: preSaleDate.end,
                            dateFormat: "yyyy-MM-dd",
                            customInput: /* @__PURE__ */ jsx(CustomDateInput, {})
                          })]
                        }), /* @__PURE__ */ jsxs(Col, {
                          xs: true,
                          lg: "12",
                          children: [/* @__PURE__ */ jsx("label", {
                            htmlFor: "",
                            children: "End date"
                          }), /* @__PURE__ */ jsx(Wt, {
                            selected: preSaleDate.end,
                            onChange: (date) => setPreSaleDate(__spreadProps(__spreadValues({}, preSaleDate), {
                              end: date
                            })),
                            selectsEnd: true,
                            startDate: preSaleDate.start,
                            endDate: preSaleDate.end,
                            minDate: preSaleDate.start,
                            dateFormat: "yyyy-MM-dd",
                            customInput: /* @__PURE__ */ jsx(CustomDateInput, {})
                          })]
                        })]
                      }), /* @__PURE__ */ jsx(Row, {
                        className: "justify-content-md-center",
                        children: /* @__PURE__ */ jsx(Col, {
                          md: "auto",
                          children: /* @__PURE__ */ jsx(Button, {
                            className: "explore",
                            onClick: handlePreSale,
                            children: "Set"
                          })
                        })
                      })]
                    })
                  })]
                }), /* @__PURE__ */ jsxs(Accordion.Item, {
                  eventKey: "4",
                  children: [/* @__PURE__ */ jsx(Accordion.Header, {
                    children: "Public Sale Date"
                  }), /* @__PURE__ */ jsx(Accordion.Body, {
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "public-sale-section",
                      children: [/* @__PURE__ */ jsxs("h5", {
                        children: ["Public Sale Date", salesData.public.active ? /* @__PURE__ */ jsx("span", {
                          className: "active-sale",
                          children: "( Active )"
                        }) : /* @__PURE__ */ jsx("span", {
                          className: "inactive-sale",
                          children: "( In-Active )"
                        })]
                      }), /* @__PURE__ */ jsxs("p", {
                        className: "AccorTxt",
                        children: ["Public Sale Date ", salesData.public.dates.start && /* @__PURE__ */ jsxs("span", {
                          className: "sale-date",
                          children: ["(", hooks(salesData.public.dates.start).format("YYYY-MM-DD"), ")"]
                        }), " for public minting."]
                      }), /* @__PURE__ */ jsx(Row, {
                        className: "justify-content-md-center mt-3",
                        children: /* @__PURE__ */ jsx(Col, {
                          xs: true,
                          lg: "12",
                          children: /* @__PURE__ */ jsx(Wt, {
                            selected: startDate,
                            onChange: (date) => setStartDate(date),
                            className: "form-control",
                            placeholderText: "Select Start Date",
                            dateFormat: "yyyy-MM-dd",
                            minDate: preSaleDate.end,
                            customInput: /* @__PURE__ */ jsx(CustomDateInput, {})
                          })
                        })
                      }), /* @__PURE__ */ jsx(Row, {
                        className: "justify-content-md-center",
                        children: /* @__PURE__ */ jsx(Col, {
                          md: "auto",
                          children: /* @__PURE__ */ jsx(Button, {
                            className: "explore",
                            onClick: handlePublicSale,
                            children: "Set"
                          })
                        })
                      })]
                    })
                  })]
                })]
              })
            })]
          }) : /* @__PURE__ */ jsxs("div", {
            className: "follow_outr",
            children: [/* @__PURE__ */ jsxs("span", {
              title: (_h = profileData == null ? void 0 : profileData.contract) == null ? void 0 : _h.address,
              children: [/* @__PURE__ */ jsx(EtherscanLink, {
                address: (_i = profileData == null ? void 0 : profileData.contract) == null ? void 0 : _i.address,
                type: "address"
              }), " ", /* @__PURE__ */ jsx("small", {
                className: "mt-2",
                children: "CONTRACT ADDRESS"
              })]
            }), /* @__PURE__ */ jsxs("span", {
              children: [/* @__PURE__ */ jsx(FaEthereum, {
                className: "d-inline-flex"
              }), ((_j = profileData == null ? void 0 : profileData.user) == null ? void 0 : _j.balance) || "0.0000", " ", /* @__PURE__ */ jsx("small", {
                className: "mt-2",
                children: "YOUR BALANCE"
              })]
            })]
          })]
        })
      }), !alert.disabled && /* @__PURE__ */ jsx(_default, __spreadProps(__spreadValues({}, alert.action), {
        confirmBtnText: "Ok",
        confirmBtnBsStyle: "outline-link",
        title: /* @__PURE__ */ jsx(AlertTitle, {
          title: alert.title,
          success: alert.success
        }),
        onConfirm: handleAlert,
        confirmBtnCssClass: alert.success ? "text-[#333] font-bold py-2 px-5 border-2 border-[#333] rounded-full" : "d-none",
        children: /* @__PURE__ */ jsx("span", {
          className: "text-dark",
          children: alert.message
        })
      }))]
    })]
  });
}
function App() {
  react.exports.useEffect(() => {
    AOS.init({
      duration: "900",
      placement: "top-center"
    });
  });
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs(MetamaskProvider, {
      children: [/* @__PURE__ */ jsx(MouseParticles, {
        g: 1,
        color: "random",
        cull: "MuiSvgIcon-root,MuiButton-root",
        level: 20,
        alpha: 1
      }), /* @__PURE__ */ jsx("div", {
        className: "App",
        children: /* @__PURE__ */ jsx(Routes, {})
      })]
    })
  });
}
ReactDOM.render(/* @__PURE__ */ jsx(React.StrictMode, {
  children: /* @__PURE__ */ jsx(BrowserRouter, {
    children: /* @__PURE__ */ jsx(App, {})
  })
}), document.getElementById("root"));
