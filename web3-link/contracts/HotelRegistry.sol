// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HotelRegistry {
    struct Hotel {
        address contractAddress;
        string name;
        string description;
        string imageURL;
        address owner;
    }

    mapping(uint256 => Hotel) private hotels;
    uint256 private nextId = 1;

    function addHotel(address _contractAddress, string memory _name, string memory _description, string memory _imageURL) public {
        hotels[nextId] = Hotel(_contractAddress, _name, _description, _imageURL, msg.sender);
        nextId++;
    }

    function getHotelMetadata(uint256 _id) public view returns (address, string memory, string memory, string memory, address) {
        require(_id > 0 && _id < nextId, "Invalid hotel ID");
        Hotel memory hotel = hotels[_id];
        return (hotel.contractAddress, hotel.name, hotel.description, hotel.imageURL, hotel.owner);
    }

    function getTotalHotels() public view returns (uint256) {
        return nextId - 1;
    }
}
