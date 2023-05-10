const { expect } = require("chai");
const { ethers } = require("hardhat");
let assert = require('assert')

describe('MiniLottery deploy.....', function () {
  let contract;
  let owner;
  let players;

  beforeEach(async function () {
    const Cosa = await ethers.getContractFactory("MiniLottery");
    [owner, ...players] = await ethers.getSigners();
    contract = await Cosa.connect(owner).deploy();
    await contract.deployed();
  });

  it('I giocatori partecipano alla lotteria con una somma sufficiente...', async function () {
    const amount = ethers.utils.parseEther('0.01');
    for(let i=0; i<players.length; i++){
      await contract.connect(players[i]).enter({ value: amount });
    }
    const registeredPlayers = await contract.getGiocatori();
    assert.equal(registeredPlayers.length, players.length);
    for(let i=0; i<players.length; i++){
      assert.equal(registeredPlayers[i], players[i].address);
    }
  });

  it('I giocatori non possono partecipare con una somma insufficiente...', async function () {
    const amount = ethers.utils.parseEther('0.001');
    await expect(contract.connect(players[0]).enter({ value: amount })).to.be.revertedWith('Denaro insufficente amigo');
  });
 
  it('Viene scelto un vincitore a caso tra i partecipanti...', async function () {
    const amount = ethers.utils.parseEther('0.01');
    for(let i=0; i<players.length; i++){
      await contract.connect(players[i]).enter({ value: amount });
    }
    const initialBalance = await ethers.provider.getBalance(contract.address);
    const expectedInitialBalance = amount.mul(players.length).toString();
    assert.equal(initialBalance.toString(), expectedInitialBalance);
  
    await contract.vincitori();
    const finalBalance = await ethers.provider.getBalance(contract.address);
    assert.equal(finalBalance.toString(), '0');
    const winner = await contract.getUltimoVincitore(1);
   expect(winner).to.be.oneOf(players.map(p => p.address));

   //console.log(players);
  console.log("Il vincitore è: " + winner);
  });
  
}); 
