const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonationContract", function () {
  let contract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const DonationContract = await ethers.getContractFactory("DonationContract");
    contract = await DonationContract.deploy();
    await contract.waitForDeployment();
  });

  it("Should allow donations and track donors", async function () {
    await contract.connect(addr1).donate({ value: ethers.parseEther("1") });
    await contract.connect(addr2).donate({ value: ethers.parseEther("2") });

    const donation1 = await contract.getDonationAmount(addr1.address);
    expect(donation1).to.equal(ethers.parseEther("1"));

    const donation2 = await contract.getDonationAmount(addr2.address);
    expect(donation2).to.equal(ethers.parseEther("2"));

    const donors = await contract.getDonors();
    expect(donors).to.include(addr1.address);
    expect(donors).to.include(addr2.address);
  });

  it("Should allow the owner to withdraw funds", async function () {
    await contract.connect(addr1).donate({ value: ethers.parseEther("1") });

    const initialBalance = await ethers.provider.getBalance(owner.address);

    const tx = await contract.withdraw(owner.address, ethers.parseEther("1"));
    await tx.wait();

    const finalBalance = await ethers.provider.getBalance(owner.address);

    expect(finalBalance).to.be.greaterThan(initialBalance);
  });

  it("Should prevent non-owners from withdrawing funds", async function () {
    await expect(
      contract.connect(addr1).withdraw(addr1.address, ethers.parseEther("1"))
    ).to.be.revertedWith("Only owner can call this function");
  });
});
