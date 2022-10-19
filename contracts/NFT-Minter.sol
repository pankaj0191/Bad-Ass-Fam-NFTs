// SPDX-License-Identifier:MIT
pragma solidity <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./PreSalesActivation.sol";

contract NFTMintor is ERC721Enumerable, Ownable, PreSalesActivation {
    using Counters for Counters.Counter;
    using Strings for uint256;
    using SafeMath for uint256;

    Counters.Counter private _tokenIds;
    uint256 public public_Sale_Cost = 60000000000000000; //0.06 eth;
    uint256 public pre_Sale_Cost = 50000000000000000; //0.05 eth;
    uint256 public maxSupply = 7757;
    uint256 public preSaleSupply = 1000;
    uint256 public publicSaleSupply = maxSupply - preSaleSupply;
    uint256 public Max_GiveAway = 10;
    uint256 public GIVEAWAY_MAX_PER_USER = 1;
    uint256 public maxMintAmount = 10;

    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) private whiteListed_Countlist;
    mapping(address => bool) public Whitelisted;
    mapping(address => bool) private _presaleWhitelist;
    mapping(address => uint256) private _publicsaleCountlist;
    mapping(address => uint256) private _presaleCountlist;
    uint256 public giftedQty = 0;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function getPublicCost() public view returns (uint256) {
        return public_Sale_Cost;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenMint(string memory tokenUri) private {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenUri);
    }

    // PreSale Minting ---------------------
    function requestPreSale(uint256 mintCount, string[] memory tokenUrls)
        external
        payable
        isPreSalesActive
    {
        require(
            super.totalSupply() + mintCount <= preSaleSupply,
            "Maximum Supply reached"
        );
        require(
            _presaleWhitelist[msg.sender],
            "This address is not included in whitelist"
        );
        require(
            _presaleCountlist[msg.sender] + mintCount <= maxSupply,
            "Token Overflow"
        );
        require(msg.value == pre_Sale_Cost.mul(mintCount), "Invalid Funds");
        for (uint256 index = 0; index < mintCount; index++) {
            bytes memory tokenUriBytes = bytes(tokenUrls[index]);
            if (tokenUriBytes.length > 0) {
                tokenMint(tokenUrls[index]);
                _presaleCountlist[msg.sender] =
                    _presaleCountlist[msg.sender] +
                    1;
            }
        }
    }

    // Public Minting Sale-----------
    function requestPublicSale(uint256 mintCount, string[] memory tokenUrls)
        external
        payable
        isPublicSalesActive
    {
        require(
            super.totalSupply() + mintCount <= publicSaleSupply,
            "Maximum supply reached."
        );
        require(
            _publicsaleCountlist[msg.sender] + mintCount <= maxMintAmount,
            "Overflow 20 tokens"
        );
        require(msg.value == public_Sale_Cost.mul(mintCount), "Invalid funds");
        for (uint256 index = 0; index < mintCount; index++) {
            bytes memory tokenUriBytes = bytes(tokenUrls[index]);
            if (tokenUriBytes.length > 0) {
                tokenMint(tokenUrls[index]);
                _publicsaleCountlist[msg.sender] =
                    _publicsaleCountlist[msg.sender] +
                    1;
            }
        }
    }

    // GiveAway -----------------------------
    function requestGiveaway(string memory tokenUri) public {
        require(super.totalSupply() < Max_GiveAway, "Maximum supply reached");
        require(
            Whitelisted[msg.sender],
            "This address is not included in family/friend whitelist"
        );
        require(
            whiteListed_Countlist[msg.sender] < GIVEAWAY_MAX_PER_USER,
            "You can get a giveaway no more than one"
        );

        bytes memory tokenUriBytes = bytes(tokenUri);
        require(tokenUriBytes.length > 0, "Token URI must be required!");
        tokenMint(tokenUri);
        whiteListed_Countlist[msg.sender] =
            whiteListed_Countlist[msg.sender] +
            1;
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return _tokenURIs[tokenId];
    }

    //only owner

    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    // Set giveAway Whitelisting ----------------------
    function setWhiteListed(address[] memory params, bool isPreSale)
        public
        onlyOwner
    {
        require(params.length > 0, "Please input whiltelist array");
        for (uint256 i = 0; i < params.length; i++) {
            if (isPreSale) {
                _presaleWhitelist[params[i]] = true;
            } else {
                Whitelisted[params[i]] = true;
            }
        }
    }

    function isAddressWhiteListed(address _user, bool isPreSale)
        public
        view
        returns (bool)
    {
        if (isPreSale) {
            return _presaleWhitelist[_user] ? true : false;
        } else {
            return Whitelisted[_user] ? true : false;
        }
    }

    function removeWhiteListedUser(address _user, bool isPreSale)
        public
        onlyOwner
    {
        if (isPreSale) {
            _presaleWhitelist[_user] = false;
        } else {
            Whitelisted[_user] = false;
        }
    }

    function withdraw() public payable onlyOwner {
        // This will pay the amount to the owner
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
        // =============================================================================
    }
}
