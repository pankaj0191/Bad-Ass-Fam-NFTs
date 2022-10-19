// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PublicSalesActivation.sol";

contract PreSalesActivation is Ownable, PublicSalesActivation {
    uint256 public preSalesStartTime;
    uint256 public preSalesEndTime;

    modifier isPreSalesActive() {
        require(
            isPreSalesActivated(),
            "PreSalesActivation: Sale is not activated"
        );
        _;
    }

    function isPreSalesActivated() public view returns (bool) {
        return
            preSalesStartTime > 0 &&
            preSalesEndTime > 0 &&
            block.timestamp >= preSalesStartTime &&
            block.timestamp <= preSalesEndTime;
    }

    // 1643983200: start time at 04 Feb 2022 (2 PM UTC+0) in seconds
    // 1644026400: end time at 05 Feb 2022 (2 AM UTC+0) in seconds
    function setPreSalesTime(uint256 _startTime, uint256 _endTime)
        external
        onlyOwner
    {
        require(
            _endTime >= _startTime,
            "PreSalesActivation: End time should be later than start time"
        );
        preSalesStartTime = _startTime;
        preSalesEndTime = _endTime;
        publicSaleStartTime = _endTime + (60 * 60);
    }
}
