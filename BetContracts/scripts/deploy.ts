import { ethers } from "hardhat";

async function main() {
  const signer = await ethers.getSigners();

  const bet_token_contract = await ethers.getContractFactory("CoreToken");
  const bet_token = await bet_token_contract.deploy();
  await bet_token.waitForDeployment();
  console.log("Bet Token  Address :", await bet_token.getAddress());

  //   const bet_token = await ethers.getContractAt(
  //     "CoreToken",
  //     "0x13B97ca2361C4649eB254d4d5c2baa89fF3c96a6",
  //     signer[0]
  //   );

  const mainFactoryContract = await ethers.getContractFactory("BetFactory");

  const deployedContract = await mainFactoryContract.deploy();
  await deployedContract.waitForDeployment();

  const factory_address = await deployedContract.getAddress();

  console.log("Deployed Factory Address :", factory_address);

  const _amount = ethers.parseUnits("10000000", 18);

  await bet_token.mint(factory_address, _amount);

  console.log("Mint done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
