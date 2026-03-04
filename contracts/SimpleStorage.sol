// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title SimpleStorage
/// @notice A shop-ready contract with per-user ownership and on-chain item pricing.
/// @dev Keeps legacy number/message functions for backward compatibility.
contract SimpleStorage {

    uint256 private storedNumber;
    string private storedMessage;
    address public owner;

    mapping(uint256 => uint256) private itemPrices;
    mapping(address => mapping(uint256 => bool)) private itemOwnership;
    mapping(uint256 => bool) private itemExists;
    uint256[] private itemCatalog;

    event NumberUpdated(address indexed updater, uint256 oldValue, uint256 newValue);
    event MessageUpdated(address indexed updater, string oldValue, string newValue);
    event ItemPriceUpdated(uint256 indexed itemId, uint256 oldPriceWei, uint256 newPriceWei);
    event ItemPurchased(address indexed buyer, uint256 indexed itemId, uint256 priceWei);
    event FundsWithdrawn(address indexed owner, uint256 amountWei);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        storedNumber = 0;
        storedMessage = "Hello from the blockchain!";

        _setItemPrice(1, 1000000000000000);
        _setItemPrice(2, 2000000000000000);
        _setItemPrice(3, 3000000000000000);
    }

    function setNumber(uint256 _number) public {
        uint256 oldNumber = storedNumber;
        storedNumber = _number;
        emit NumberUpdated(msg.sender, oldNumber, _number);
    }

    function setMessage(string memory _message) public {
        string memory oldMessage = storedMessage;
        storedMessage = _message;
        emit MessageUpdated(msg.sender, oldMessage, _message);
    }

    function getNumber() public view returns (uint256) {
        return storedNumber;
    }

    function getMessage() public view returns (string memory) {
        return storedMessage;
    }

    function getAll() public view returns (uint256, string memory) {
        return (storedNumber, storedMessage);
    }

    function setItemPrice(uint256 itemId, uint256 newPriceWei) external onlyOwner {
        require(itemId > 0, "Invalid itemId");
        require(newPriceWei > 0, "Price must be > 0");
        _setItemPrice(itemId, newPriceWei);
    }

    function getItemPrice(uint256 itemId) external view returns (uint256) {
        return itemPrices[itemId];
    }

    function getItemIds() external view returns (uint256[] memory) {
        return itemCatalog;
    }

    function buyItem(uint256 itemId) external payable {
        uint256 priceWei = itemPrices[itemId];
        require(priceWei > 0, "Item not configured");
        require(!itemOwnership[msg.sender][itemId], "Already owned");
        require(msg.value >= priceWei, "Insufficient ETH");

        itemOwnership[msg.sender][itemId] = true;

        if (msg.value > priceWei) {
            uint256 refund = msg.value - priceWei;
            (bool sent, ) = payable(msg.sender).call{value: refund}("");
            require(sent, "Refund failed");
        }

        emit ItemPurchased(msg.sender, itemId, priceWei);
    }

    function isOwned(address user, uint256 itemId) external view returns (bool) {
        return itemOwnership[user][itemId];
    }

    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 amountWei) external onlyOwner {
        require(amountWei > 0, "Amount must be > 0");
        require(amountWei <= address(this).balance, "Insufficient balance");

        (bool sent, ) = payable(owner).call{value: amountWei}("");
        require(sent, "Withdraw failed");
        emit FundsWithdrawn(owner, amountWei);
    }

    function _setItemPrice(uint256 itemId, uint256 newPriceWei) private {
        uint256 oldPriceWei = itemPrices[itemId];
        itemPrices[itemId] = newPriceWei;

        if (!itemExists[itemId]) {
            itemExists[itemId] = true;
            itemCatalog.push(itemId);
        }

        emit ItemPriceUpdated(itemId, oldPriceWei, newPriceWei);
    }

    receive() external payable {}
}
