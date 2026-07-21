import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("EsusuPool", function () {
  let esusuPool;
  let treasury, addr1, addr2;

  beforeEach(async function () {
    [treasury, addr1, addr2] = await ethers.getSigners();
    const EsusuPool = await ethers.getContractFactory("EsusuPool");
    esusuPool = await EsusuPool.deploy();
  });

  it("Should set the right treasury", async function () {
    expect(await esusuPool.treasury()).to.equal(treasury.address);
  });

  it("Should record a contribution and add to queue", async function () {
    await esusuPool.recordContribution(addr1.address);
    const count = await esusuPool.getQueueCount();
    expect(count).to.equal(1n);
  });

  it("Should prevent double contributions in same round", async function () {
    await esusuPool.recordContribution(addr1.address);
    await expect(
      esusuPool.recordContribution(addr1.address)
    ).to.be.revertedWith("Already contributed this round");
  });

  it("Should execute payout and advance round", async function () {
    await esusuPool.recordContribution(addr1.address);
    await esusuPool.recordContribution(addr2.address);
    
    await esusuPool.executePayout(addr1.address);
    
    // Round should now be 2
    expect(await esusuPool.currentRound()).to.equal(2n);
  });
});
