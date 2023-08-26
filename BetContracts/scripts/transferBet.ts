import { ethers } from "hardhat";

const transferBet = async () => {
  const betAddress = "0xB119219f8Efc3AB3946771124877116410A77714";
  //   const betTokenAddress = "0x8C03fca221632C49af22A6770D0358C50E23b32F";

  const signers = await ethers.getSigners();
  const owner = signers[0];
  const other = signers[1];

  const bet_contract = await ethers.getContractAt(
    "BetContract",
    betAddress,
    owner
  );

  const y_token_addr = await bet_contract.yesToken();
  const n_token_addr = await bet_contract.noToken();
  const amount = ethers.parseUnits("5", 18);

  const y_token = await ethers.getContractAt("BetToken", y_token_addr, owner);
  const n_token = await ethers.getContractAt("BetToken", n_token_addr, owner);

  const txn = await y_token.approve(betAddress, amount);
  await txn.wait();
  console.log("Y token approved");
  //   const txn2 = await n_token.approve(betAddress, amount);
  //   console.log("N token approved");

  const call = await bet_contract._transferShares(
    "0xAF0eCbAf68160F2E56Ae89A6c49B88D39AC38E9F"
  );

  console.log("Bet shares transfered");
};

transferBet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
