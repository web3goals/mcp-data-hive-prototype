// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(string dataset => Listing) public listings;
    event Listed(string indexed dataset, address seller, uint256 price);
    event Sold(string indexed dataset, address buyer, uint256 price);

    constructor() Ownable(msg.sender) {}

    function list(
        string memory dataset,
        address seller,
        uint256 price
    ) external nonReentrant onlyOwner {
        require(price > 0, "Price must be greater than zero");

        listings[dataset] = Listing(seller, price);

        emit Listed(dataset, seller, price);
    }

    function buy(string memory dataset) external payable nonReentrant {
        Listing memory listing = listings[dataset];
        require(listing.price != 0, "Dataset not listed");
        require(msg.value == listing.price, "Incorrect price");

        (bool success, ) = listing.seller.call{value: msg.value}("");
        require(success, "Transfer failed");

        emit Sold(dataset, msg.sender, listing.price);
    }
}
