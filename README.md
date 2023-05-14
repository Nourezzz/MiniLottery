MiniLottery

MiniLottery is a simple lottery contract on the Ethereum blockchain, written in Solidity. Players can enter the lottery by sending the required amount of Ether to the contract. Once the required number of players have entered the lottery, the contract will randomly select a winner and pay out the lottery pool to the winner.
Requirements

    Node.js v12 or later
    npm
    Hardhat

Installation


-Clone this repository:
git clone https://github.com/<Nourezzz>/MiniLottery.git
  
  
  
-Change into the cloned directory:
cd MiniLottery

  
  
-Install the dependencies:
npm install

  
  
-Usage
Starting the Hardhat Node

  
  
-Start the Hardhat node using the following command:
npx hardhat node

  
  
-Run the tests with the following command:
npx hardhat test


  
-After starting the Hardhat node, you can interact with the MiniLottery contract using the Hardhat console. Start the console with the following command:
npx hardhat console

  
  
-To interact with the contract, you must first compile and deploy it to the local network. Compile the contract using the following command:
npx hardhat compile

  
  
-Deploy the contract using the following command:
const MiniLottery = await ethers.getContractFactory("MiniLottery");
const miniLottery = await MiniLottery.deploy();
await miniLottery.deployed();
  

  
-To enter the lottery, use the enter function. You must send at least the minimum amount of Ether required to enter the lottery. This amount can be set by the contract owner.
await miniLottery.enter({ value: ethers.utils.parseEther('0.01') });

  

-To get the list of players who have entered the lottery, use the getGiocatori function.
await miniLottery.getGiocatori();



-To get the current balance of the lottery pool, use the ammount function.
await miniLottery.ammount();

  
  

-To choose the winner of the lottery, use the vincitori function. This can only be called by the contract owner.
await miniLottery.vincitori();

  


-To get the address of the last winner of the lottery, use the getUltimoVincitore function and pass in the number of the lottery round.
await miniLottery.getUltimoVincitore(1);

  


-To set the minimum amount required to enter the lottery, use the setMinimEnter function. This can only be called by the contract owner.
await miniLottery.setMinimEnter(ethers.utils.parseEther('0.01'));

  
  
-License
This project is licensed under the terms of the Unlicense. See LICENSE for more details.
