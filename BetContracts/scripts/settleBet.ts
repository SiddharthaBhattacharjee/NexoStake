import { ethers } from "hardhat";

const settleBet = async () => {
  const betAddress = "0xB119219f8Efc3AB3946771124877116410A77714";
  const betTokenAddress = "0xe20ce43eEe3fF1075cdE0f8c1F062670552BBcBb";

  const signers = await ethers.getSigners();
  const owner = signers[0];
  const other = signers[1];

  const bet_contract = await ethers.getContractAt(
    "BetContract",
    betAddress,
    owner
  );

  const bet_token = await ethers.getContractAt(
    "CoreToken",
    betTokenAddress,
    owner
  );

  // =================================================

  const bet_contract2 = await ethers.getContractAt(
    "BetContract",
    betAddress,
    other
  );

  const call = await bet_contract2.amountInvested(other.address);
  console.log("amountInvested [other] : ", call);

  console.log("Balance Old : ", await bet_token.balanceOf(other.address));

  const call2 = await bet_contract.settleBet(0, { gasPrice: "100000000000" });
  await call2.wait();
  console.log("Bet settled");

  const call3 = await bet_contract2.redeemBet();
  await call3.wait();

  console.log("Balance New : ", await bet_token.balanceOf(other.address));

  // =================================================
};

settleBet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
