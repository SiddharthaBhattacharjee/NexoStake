import { ethers } from "hardhat";

const createBet = async () => {
  const factory_addresss = "0x100f791A9378577f389B5da3c7a87e95115e5e5b";
  const betToken_address = "0xe20ce43eEe3fF1075cdE0f8c1F062670552BBcBb";

  const signers = await ethers.getSigners();
  const owner = signers[0];

  const provider = ethers.provider;
  const nativeBal = await provider.getBalance(owner.address);
  console.log("Native Token Balance : ", nativeBal.toString());

  // Factory Shit ...
  const factory_contract = await ethers.getContractAt(
    "BetFactory",
    factory_addresss,
    owner
  );

  const _price = ethers.parseUnits("10", 18);

  const txn = await factory_contract.createNewBet(
    "100010001",
    100,
    _price,
    _price,
    betToken_address
  );
  await txn.wait();
  const getTotalBets = await factory_contract.totalBetsDeployed();
  console.log("Total Bets : ", getTotalBets);
  const deployedBet = await factory_contract.deployedContracts(
    Number(getTotalBets.toString()) - 1
  );
  console.log("Deployed Bet [ADDRESS] : ", deployedBet);

  // ownership transfer
  await factory_contract.transferOwnershipExt(owner.address, deployedBet);
  console.log("Ownership transfered to owner for the bet");

  // Bet Contract shit ...
  const betcontract = await ethers.getContractAt(
    "BetContract",
    deployedBet,
    owner
  );

  const yes_token_addr = await betcontract.yesToken();
  const no_token_addr = await betcontract.noToken();
  console.log("Yes token address : ", yes_token_addr);
  console.log("No token address : ", no_token_addr);

  const y_token_price = await betcontract.yesPrice();
  const n_token_price = await betcontract.noPrice();

  console.log("Y Token Price : ", y_token_price.toString());
  console.log("N Token Price : ", n_token_price.toString());
};

createBet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
