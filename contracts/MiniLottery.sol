//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;
import "hardhat/console.sol";
contract MiniLottery{

    address public owner;
    address payable[] public giocatoriz;
    mapping(uint=>address payable) public storicoGiocatoriz;
    uint lotteriaz = 1;
    uint winningBalance;
    uint minimEnter= 0.01 ether;
    constructor(){
    owner = msg.sender;
    }

    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }
    function setMinimEnter(uint minimo)public view {
        minimo = minimEnter;
    }

    function randomNumber() public view returns(uint) {
        require(giocatoriz.length >0);
        bytes32 seed = keccak256(abi.encodePacked(owner,blockhash(block.number - 1), block.coinbase, gasleft(), block.gaslimit));
        return uint(seed) % giocatoriz.length;
        }

    function getGiocatori()external view returns(address payable[] memory){ 
        return giocatoriz;
    }
    function enter() public payable{
        require(msg.value >= minimEnter,'Denaro insufficente amigo');
        giocatoriz.push(payable(msg.sender));
        winningBalance += msg.value;
    }

    function ammount()public view returns(uint){
        return(address(this).balance);
    }
    function vincitori() external onlyOwner{
        require(giocatoriz.length > 0, "Nessun giocatore ha partecipato");
        uint index = randomNumber() % giocatoriz.length;
        storicoGiocatoriz[lotteriaz] = giocatoriz[index];
        address payable winner = giocatoriz[index];
        uint tempWbal = winningBalance;
        winningBalance = 0; 
        (bool success,) = winner.call{value:tempWbal}(""); 
        require(success);
        lotteriaz++;
        delete giocatoriz;
    
    }

    function getUltimoVincitore(uint numeroLotteria) public view returns(address) { 
        require(numeroLotteria < lotteriaz,"Numero invalido");
        return storicoGiocatoriz[numeroLotteria];
    } 

}
