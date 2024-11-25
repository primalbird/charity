const hre = require("hardhat");

async function main() {
  const contractAddress = "CONTRACT ADDRESS";
  const [owner] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("DonationContract", contractAddress);

  const tx = await contract.withdraw("RECIPIENT'S ADDRESS", hre.ethers.utils.parseEther("0.1"));
  await tx.wait();

  console.log("Withdrawal successful!");
}

main();
