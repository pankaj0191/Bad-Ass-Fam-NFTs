import { useState, useContext } from 'react'
import { FaEthereum } from "react-icons/fa";
import { Form, Container, Button } from 'react-bootstrap';
import { ethers } from "ethers";
import axios from 'axios';

import { EtherscanLink } from "../helpers";
import Metamask, { getContract } from "@/context/Metamask";
import NFT from '../../artifacts/contracts/NFT-Minter.sol/NFTMintor.json'
import { baseUrl, arrayPluck } from '../helpers';

function Mint(props) {
    const {
        salesData, totalMintPerUser, mintedNfts, defaultMintChange,
        defaultMintCost, useAlert, onClose, edition, onUpdate
    } = props;
    const [mintValue, setMintValue] = useState(1);
    const [decBtnDisabled, setDecBtnDisabled] = useState(true);
    const [incBtnDisabled, setIncBtnDisabled] = useState(false);
    const [alert, setAlert] = useAlert();
    const [updated, setUpdated] = onUpdate();
    const { useUserStorage, web3 } = useContext(Metamask.context);
    const [userData, setUserData] = useUserStorage();
    const userAddress = userData.address || '';
    const NFTADDRESS = import.meta.env.VITE_NFT_ADDRESS;
    const API_BASE_URL = baseUrl(import.meta.env.VITE_API_BASE_URL);

    const handleChange = (event) => {
        const { action } = event.target.dataset;
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
            setBafAlert(
                "Processing..",
                `Creating IPFS urls of metadata and art for nft`
            )
            const url = `${API_BASE_URL}ipfs/upload?edition=${edition}&mintValue=${mintValue}`;
            const response = await axios.get(url);
            const result = response.data;
            return arrayPluck(result.data, "ipfsUrl");
        } catch (error) {
            console.error(error);
            setBafAlert(
                'Ooops...',
                error.message || `Something went wrong!`,
                { warning: true },
                true
            );
            return [];
        }
    }

    const handleMint = async (event, onMintPopupClose) => {
        event.preventDefault();
        let isConn = await web3.isConnected();
        if (isConn) {
            try {
                if (mintedNfts >= totalMintPerUser) {
                    setBafAlert(
                        "Thanks!",
                        `You are already minted ${totalMintPerUser} NFTs`,
                        { warning: true },
                        true
                    );
                    return;
                } else if (mintValue > defaultMintChange) {
                    setBafAlert(
                        "Sorry!",
                        `You can't mint more than ${defaultMintChange} NFTs`,
                        { warning: true },
                        true
                    );
                    return;
                } else if (salesData.private.active && edition > salesData.private.supply) {
                    setBafAlert(
                        "Sorry!",
                        `Not enough supply for presale`,
                        { warning: true },
                        true
                    );
                    return;
                } else if (salesData.private.active && !salesData.private.isWhiteListed) {
                    setBafAlert(
                        "Ooops...",
                        "You are not whitelisted for this sale!",
                        { warning: true },
                        true
                    );
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
            setBafAlert(
                "Metamask Not Connected!",
                "You are not connected with metamask!",
                { warning: true },
                true
            )
        }
    };

    const mintNow = async () => {
        try {
            if (salesData.private.active || salesData.public.active) {
                const metadataUrls = await getMetadataIpfsUrl();
                if (metadataUrls.length) {
                    setBafAlert(
                        "Processing...",
                        `Minting transaction has started!`
                    )
                    // Generate Mint Contract
                    const contract = await getContract(NFTADDRESS, NFT.abi);
                    const value = ethers.utils.parseEther((defaultMintCost * mintValue).toString());
                    if (salesData.public.active) {
                        const tx = await contract
                            .requestPublicSale(mintValue, metadataUrls, {
                                value: value,
                                from: userAddress
                            });
                        const txObject = await tx.wait();
                        setBafAlert(
                            "Minting transaction successfully!",
                            <EtherscanLink address={txObject.transactionHash} type="tx" name="Minting transaction link is " />,
                            { success: true },
                            true
                        );
                    } else {
                        const isWhiteListedUser = await contract.isAddressWhiteListed(userAddress, true);
                        if (isWhiteListedUser) {
                            const tx = await contract
                                .requestPreSale(mintValue, metadataUrls, {
                                    value: value,
                                    from: userAddress
                                });
                            const txObject = await tx.wait();
                            setBafAlert(
                                "Minting Successfully!",
                                <EtherscanLink address={txObject.transactionHash} type="tx" name="Minting transaction link is " />,
                                { success: true },
                                true
                            );
                        } else {
                            setBafAlert(
                                "Ooops...",
                                "You are not whitelisted for this sale!",
                                { warning: true },
                                true
                            );
                        }
                    }
                } else {
                    setBafAlert(
                        'Ooops...',
                        `Metadata not uploaded on IPFS Server!`,
                        { warning: true },
                        true
                    );
                }
            } else {
                setBafAlert(
                    'Sale Not Found!',
                    `Sorry! There is no any sale.`,
                    { warning: true },
                    true
                );
            }
        } catch (error) {
            console.log(error)
            const message = error.message.split(":")[1].trim();
            setBafAlert(
                "Ooops...",
                message,
                { warning: true },
                true
            )
        }
    };

    const setBafAlert = (title, message, action = "", success = false, disabled = false) => {
        setAlert({
            ...alert,
            disabled: disabled ? disabled : false,
            message: message,
            title: title,
            action: action ? action : { info: true },
            success: success ? success : false,
        });
    }

    return (
        <>
            <Container>
                <button className="close" onClick={onClose}>
                    &times;
                </button>
                {salesData.private.active || salesData.public.active ? (
                    <>
                        <h2 className="sec_title text-center" >
                            CHOOSE HOW MANY TO MINT
                        </h2>
                        <div className="mintOuter">
                            <p className="mint_desc mt-0 mb-1">
                                {" "}
                                <FaEthereum style={{
                                    display: "inline-flex",
                                    marginTop: "-5px"
                                }} /> {web3.address ? defaultMintCost : "0.00"} ETH PER {salesData.private.active ? "PRE SALE" : "PUBLIC"} MINT
                            </p>
                            <p className="mint_desc mt-0 mb-3">{defaultMintChange} MINT REMAINS </p>
                            <div className="mint_box">
                                <div className="mint_left d-flex">
                                    <Button
                                        className="btn_dec"
                                        title="Down"
                                        disabled={decBtnDisabled}
                                        data-action="decrement"
                                        onClick={handleChange}
                                    >
                                        -
                                    </Button>
                                    <Form.Control type="text" value={mintValue} readOnly={true} />
                                    <Button
                                        className="btn_inc"
                                        title="Up"
                                        disabled={incBtnDisabled}
                                        data-action="increment"
                                        onClick={handleChange}
                                    >
                                        +
                                    </Button>
                                </div>
                                <Button
                                    className="mint_now"
                                    title="Mint Now"
                                    onClick={(e) => handleMint(e, onClose)}
                                >
                                    Mint Now
                                </Button>
                            </div>
                            <p className="mint_desc">
                                MAX {totalMintPerUser} MINT PER USER
                            </p>
                        </div>
                    </>
                ) : (
                    <h2 className="sec_title text-center" >
                        NO SALE FOUND
                    </h2>
                )}
            </Container>
        </>
    )
}

export default Mint