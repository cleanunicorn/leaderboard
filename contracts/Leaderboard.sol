pragma solidity ^0.4.22;


contract Leaderboard {
    address[] standings;
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function getLeaderboard() public view returns (address[]) {
        return standings;
    }

    function play() public {
        standings.push(msg.sender);
        emit Place(standings.length);
        emit Standings(standings);
    }

    function clearStandings() public onlyOwner {
        delete standings;
    }

    event Order(uint place, address player);
    event Place(uint place);
    event Standings(address[] standings);

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }    
}
