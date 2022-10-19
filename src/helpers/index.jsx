import { useState, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi'
import { Overlay, Tooltip } from 'react-bootstrap';
import moment from 'moment';

import { NFTMINTOR_ABI, NFTMINTOR_ADDRESS } from '../../utils';
import { getPrivateContract } from '../context/Metamask';

export const TrimText = (address, length = 4) => {
    if (!address && length > 0) return '';
    const double = length * 2;
    address = address.trim() ? address.trim() : '';
    if (address) {
        return `${address.substring(0, double - 1)}...${address.substr(address.length - length - 1)}`;
    }
    return '';
}

export const EtherscanLink = ({ address, type = "tx", name = "" }) => {
    var baseUrl = import.meta.env.VITE_ETHERSCAN_BASE_URL;
    baseUrl = baseUrl ? baseUrl : "https://rinkeby.etherscan.io";
    return (
        <span className="text-dark">
            {name}
            <a href={`${baseUrl}/${type}/${address}`} target="_blank">{TrimText(address)}</a>
        </span>
    );
}

export const TrimAndCopyText = (props) => {
    const [copied, setCopied] = useState(false);
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const { text, isLink = false, type } = props;

    const copyContent = (action) => {
        setCopied(action)
        if (action) {
            setTimeout(() => {
                setCopied(false);
                setShow(false)
            }, 2000);
        }
    }

    return (
        <>
            <CopyToClipboard text={text}
                onCopy={() => copyContent(true)}>
                <div style={{
                    display: "inline-flex"
                }}>
                    { 
                        isLink ? (
                            <EtherscanLink address={text} type={type} />
                        ) : (
                            <span>{TrimText(text)}</span>
                        )
                    }
                    <span title='Copy Address' style={{
                        marginLeft: "10px",
                        marginTop: "-3px",
                        cursor: "pointer"
                    }} ref={target} onClick={() => setShow(true)}><BiCopy /></span>
                    <Overlay target={target.current} show={show} placement="right">
                        {(props) => (
                            <Tooltip {...props}>
                                Text Copied!
                            </Tooltip>
                        )}
                    </Overlay>
                </div>
            </CopyToClipboard>
        </>
    );
}


export const getSalesData = async (userAddress = "") => {
    const contract = await getPrivateContract(NFTMINTOR_ADDRESS, NFTMINTOR_ABI);
    // console.log(contract)

    // check is public sale
    var isPublicSale = await contract.isPublicSalesActivated();
    // check is private sale
    var isPrivateSale = await contract.isPreSalesActivated();

    // Get private sale dates
    var privateStartTime = (await contract.preSalesStartTime()).toNumber();
    var privateEndTime = (await contract.preSalesEndTime()).toNumber();

    // Get public sale date
    var publicStartTime = (await contract.publicSaleStartTime()).toNumber();
    const totalSupply = (await contract.totalSupply()).toNumber();
    const maxSupply = (await contract.maxSupply()).toNumber();

    // Get current edition of the nft
    const preSaleSupply = (await contract.preSaleSupply()).toNumber();
    var isWhiteListed = false;
    if(userAddress) {
        isWhiteListed = await contract.isAddressWhiteListed(userAddress, true);
    }
    
    return {
        sale: isPrivateSale || isPublicSale,
        private: {
            active: isPrivateSale,
            dates: {
                start: privateStartTime ? moment.unix(privateStartTime).format('YYYY-MM-DD HH:mm:ss') : "",
                end: privateEndTime ? moment.unix(privateEndTime).format('YYYY-MM-DD HH:mm:ss') : ""
            },
            supply: preSaleSupply,
            isWhiteListed,
        },
        public: {
            active: isPublicSale,
            dates: {
                start: publicStartTime ? moment.unix(publicStartTime).format('YYYY-MM-DD HH:mm:ss') : "",
            },
            supply: maxSupply - preSaleSupply
        },
        supply: {
            total: totalSupply,
            max: maxSupply,
            remaining: maxSupply - totalSupply
        },
        edtion: totalSupply + 1 
    }
    
}

export const baseUrl = (str = "") => {
    str = typeof str === "string" ? str.trim() : "";
    if(str.slice(-1) == "/"){
        str = str.slice(0, -1);
    }
    return str ? `${str}/`: "";
}

export var arrayPluck = function (arr, key) {
    var newArr = [];
    for (var i = 0, x = arr.length; i < x; i++) {
        if (arr[i].hasOwnProperty(key)) {
            newArr.push(arr[i][key])
        }
    }
    return newArr;
}


export default {
    TrimText,
    EtherscanLink,
    TrimAndCopyText,
    getSalesData,
    baseUrl,
    arrayPluck
}