const { expect } = require("chai");
const { ethers } = require("hardhat");
let assert = require('assert')

describe('MiniLottery deploy.....', function () {
  for(l = 0; l< 10; l++){

    let contract;
    let owner;
    let players = [];
    let partecipants = 34
    let sumAMnt = 0 
  
  
    it('Setup...', async function () {
  
      const Cosa = await ethers.getContractFactory("MiniLottery");
      owner = ethers.provider.getSigner(0);
      contract = await Cosa.connect(owner).deploy();
      await contract.deployed();
    })
  
      partecipants = getRandomNum(10,50,0,false)
  it('I giocatori partecipano alla lotteria con una somma sufficiente...', async function () {
    const amount = ethers.utils.parseEther('0.01');
    for(let i=0; i<partecipants; i++){
      let tempAMnt = getRandomNum(0.01,1,18,true)
        const amount =tempAMnt //ethers.utils.parseEther('0.01');
        let tempUser = ethers.provider.getSigner(i+1);
        await contract.connect(tempUser).enter({ value: amount });
        players.push(await tempUser.getAddress())
    }
    const registeredPlayers = await contract.getGiocatori();
    assert.equal(registeredPlayers.length, partecipants);
    sumAMnt = await ethers.provider.getBalance(contract.address)
  });

  it('I giocatori non possono partecipare con una somma insufficiente...', async function () {
    const amount = ethers.utils.parseEther('0.001');
    await expect(contract.connect(owner).enter({ value: amount })).to.be.revertedWith('Denaro insufficente amigo');
  });
 
  it('Viene scelto un vincitore a caso tra i partecipanti...', async function () {
    const amount = sumAMnt
    const initialBalance = await ethers.provider.getBalance(contract.address);

    const expectedInitialBalance = amount
    assert.equal(initialBalance.toString(), expectedInitialBalance);
  
    await contract.vincitori();
    const finalBalance = await ethers.provider.getBalance(contract.address);
    assert.equal(finalBalance.toString(), '0');
    const winner = await contract.getUltimoVincitore(1);
    assert(players.includes(winner))
  console.log("Il vincitore è: " + winner);
  });
}
}); 

function getRandomNum(min, max, dec, isTokens) {
  let spe = ((Math.random() * (max - min)) + min).toFixed(4)
  if(isTokens){
    return (ethers.utils.parseUnits(spe,dec)).toString()
  }else{
    return parseInt(spe)
  }
}
