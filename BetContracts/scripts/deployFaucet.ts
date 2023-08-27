import { ethers } from "hardhat";

const deployFaucet = async () => {
  const betTokenAddress = "0xa3930611B6DA53969748B0359DE449f9dc8fF3E6";

  const signers = await ethers.getSigners();

  const bet_token_contract = await ethers.getContractAt(
    "CoreToken",
    betTokenAddress,
    signers[0]
  );

  const faucet = await ethers.getContractFactory("Faucet");
  const faucet_contract = await faucet.deploy(betTokenAddress);
  await faucet_contract.waitForDeployment();

  const faucetAddress = await faucet_contract.getAddress();
  console.log("Faucet Address : ", faucetAddress);

  const amount = ethers.parseUnits("1000000000", 18);

  const mintCall = await bet_token_contract.mint(faucetAddress, amount);
  await mintCall.wait();
  console.log("Funds transferred in faucet : 1000000000 $BTK");

  await bet_token_contract.mint(
    "0xef5DDEcff5Dc2B7adef6ba5C50b190ddF7b7c580",
    amount
  );
};

deployFaucet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
