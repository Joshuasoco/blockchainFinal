// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title SimpleStorage
/// @notice A beginner-friendly contract that stores and retrieves a number and a message.
/// @dev Deployed to a local Ganache blockchain for Unity integration.
contract SimpleStorage {

    // -------- State Variables --------
    uint256 private storedNumber;
    string  private storedMessage;
    address public  owner;

    // -------- Events --------
    /// Emitted every time the stored number is changed.
    event NumberUpdated(address indexed updater, uint256 oldValue, uint256 newValue);
    /// Emitted every time the stored message is changed.
    event MessageUpdated(address indexed updater, string oldValue, string newValue);

    // -------- Constructor --------
    /// @notice Sets the contract deployer as the owner and initialises defaults.
    constructor() {
        owner = msg.sender;
        storedNumber  = 0;
        storedMessage = "Hello from the blockchain!";
    }

    // -------- Write Functions (cost gas) --------

    /// @notice Store a new number on-chain.
    /// @param _number The number to store.
    function setNumber(uint256 _number) public {
        uint256 oldNumber = storedNumber;
        storedNumber = _number;
        emit NumberUpdated(msg.sender, oldNumber, _number);
    }

    /// @notice Store a new message on-chain.
    /// @param _message The message to store.
    function setMessage(string memory _message) public {
        string memory oldMessage = storedMessage;
        storedMessage = _message;
        emit MessageUpdated(msg.sender, oldMessage, _message);
    }

    // -------- Read Functions (free – no gas) --------

    /// @notice Retrieve the currently stored number.
    /// @return The stored number.
    function getNumber() public view returns (uint256) {
        return storedNumber;
    }

    /// @notice Retrieve the currently stored message.
    /// @return The stored message.
    function getMessage() public view returns (string memory) {
        return storedMessage;
    }

    /// @notice Retrieve both stored values at once.
    /// @return The stored number and message.
    function getAll() public view returns (uint256, string memory) {
        return (storedNumber, storedMessage);
    }
}
