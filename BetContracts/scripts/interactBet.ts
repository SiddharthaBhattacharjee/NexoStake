import { ethers } from "hardhat";

const interactWithBet = async () => {
  const betAddress = "0xB119219f8Efc3AB3946771124877116410A77714";
  const betTokenAddress = "0xe20ce43eEe3fF1075cdE0f8c1F062670552BBcBb";

  const signers = await ethers.getSigners();
  const owner = signers[0];

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

  // ERC20 allowance
  const amountAllowance = ethers.parseUnits("1000000000", 18);
  const txn = await bet_token.approve(betAddress, amountAllowance);
  await txn.wait();
  console.log("Token Spend Approved");

  // Purchasing Bet Share
  const balance_BTK = await bet_token.balanceOf(owner.address);
  console.log("BTK BAlance [OWNER] : ", balance_BTK);
  const balance_BTK_contract = await bet_token.balanceOf(betAddress);
  console.log("BTK BAlance [CONTRACT] : ", balance_BTK_contract);

  const y_token_price = await bet_contract.yesPrice();
  const n_token_price = await bet_contract.noPrice();

  console.log("Y Token Price [BEFORE] : ", y_token_price.toString());
  console.log("N Token Price [BEFORE] : ", n_token_price.toString());

  try {
    const call = await bet_contract.placeBet(0, 5);
    await call.wait();
    console.log("Bet Created : Shares Bought : 5 : Option : YES");
  } catch (error) {
    console.log(error);
  }

  const y_token_price_after = await bet_contract.yesPrice();
  const n_token_price_after = await bet_contract.noPrice();

  console.log("Y Token Price [AFTER] : ", y_token_price_after.toString());
  console.log("N Token Price [AFTER] : ", n_token_price_after.toString());
};

interactWithBet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
