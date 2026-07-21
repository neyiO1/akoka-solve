import { ethers } from "hardhat";

async function main() {
  console.log("Deploying EsusuPool...");
  const contributionAmount = ethers.parseEther("1"); // 1 MATIC for example
  const maxMembers = 5;
  const EsusuPool = await ethers.getContractFactory("EsusuPool");
  const esusuPool = await EsusuPool.deploy(contributionAmount, maxMembers);
  await esusuPool.waitForDeployment();
  console.log(`EsusuPool deployed to: ${await esusuPool.getAddress()}`);

  console.log("Deploying TradeableImpactCredit...");
  const TradeableImpactCredit = await ethers.getContractFactory("TradeableImpactCredit");
  const tic = await TradeableImpactCredit.deploy();
  await tic.waitForDeployment();
  console.log(`TradeableImpactCredit deployed to: ${await tic.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
