// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract PublicSalesActivation is Ownable {
    uint256 public publicSaleStartTime;

    modifier isPublicSalesActive() {
        require(
            isPublicSalesActivated(),
            "PublicSalesActivation: Sale is not activated"
        );
        _;
    }

    function isPublicSalesActivated() public view returns (bool) {
        return publicSaleStartTime > 0 && block.timestamp >= publicSaleStartTime;
    }

    // 1644069600: start time at 05 Feb 2022 (2 PM UTC+0) in seconds
    function setPublicSalesTime(uint256 _startTime) external onlyOwner {
        publicSaleStartTime = _startTime;
    }
}
