// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationContract {
    address public owner;
    mapping(address => uint256) private donations;
    address[] private donors;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function donate() external payable {
        require(msg.value > 0, "Donation must be greater than 0");
        if (donations[msg.sender] == 0) {
            donors.push(msg.sender);
        }
        donations[msg.sender] += msg.value;
    }

    function withdraw(address payable _to, uint256 _amount) external onlyOwner {
        require(address(this).balance >= _amount, "Insufficient funds");
        _to.transfer(_amount);
    }

    function getDonors() external view returns (address[] memory) {
        return donors;
    }

    function getDonationAmount(address _donor) external view returns (uint256) {
        return donations[_donor];
    }
}
