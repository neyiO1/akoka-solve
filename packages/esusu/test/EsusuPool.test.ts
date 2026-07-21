import { expect } from "chai";
import { ethers } from "hardhat";
import { EsusuPool } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("EsusuPool", function () {
  let esusuPool: EsusuPool;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  const contributionAmount = ethers.parseEther("1");
  const maxMembers = 2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const EsusuPoolFactory = await ethers.getContractFactory("EsusuPool");
    esusuPool = (await EsusuPoolFactory.deploy(contributionAmount, maxMembers)) as EsusuPool;
    await esusuPool.waitForDeployment();
  });

  it("Should allow a user to join", async function () {
    await esusuPool.connect(user1).joinPool();
    expect(await esusuPool.isMember(user1.address)).to.be.true;
  });

  it("Should prevent joining if full", async function () {
    await esusuPool.connect(user1).joinPool();
    await esusuPool.connect(user2).joinPool();
    await expect(esusuPool.connect(owner).joinPool()).to.be.revertedWith("Pool is full");
  });

  it("Should accept valid contributions", async function () {
    await esusuPool.connect(user1).joinPool();
    const contributionId = ethers.id("test-id-1");
    await expect(
      esusuPool.connect(user1).contribute(contributionId, { value: contributionAmount })
    )
      .to.emit(esusuPool, "ContributionMade")
      .withArgs(user1.address, contributionAmount, contributionId);
  });

  it("Should prevent double contributions (idempotency)", async function () {
    await esusuPool.connect(user1).joinPool();
    const contributionId = ethers.id("test-id-2");
    await esusuPool.connect(user1).contribute(contributionId, { value: contributionAmount });
    await expect(
      esusuPool.connect(user1).contribute(contributionId, { value: contributionAmount })
    ).to.be.revertedWith("Contribution already processed");
  });

  it("Should execute rotation correctly", async function () {
    await esusuPool.connect(user1).joinPool();
    await esusuPool.connect(user2).joinPool();
    
    await esusuPool.connect(user1).contribute(ethers.id("c1"), { value: contributionAmount });
    await esusuPool.connect(user2).contribute(ethers.id("c2"), { value: contributionAmount });

    const tx = await esusuPool.executeRotation();
    await expect(tx).to.emit(esusuPool, "RotationExecuted").withArgs(user1.address, contributionAmount * 2n, 0);
  });

  it("Should allow emergency withdrawal by owner", async function () {
    await esusuPool.connect(user1).joinPool();
    await esusuPool.connect(user1).contribute(ethers.id("c3"), { value: contributionAmount });
    
    const balanceBefore = await ethers.provider.getBalance(owner.address);
    const tx = await esusuPool.connect(owner).withdrawEmergency();
    const receipt = await tx.wait();
    const gasUsed = receipt!.gasUsed * receipt!.gasPrice;
    
    const balanceAfter = await ethers.provider.getBalance(owner.address);
    expect(balanceAfter).to.equal(balanceBefore - gasUsed + contributionAmount);
  });
});
