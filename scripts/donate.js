const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x098517B0353e2963837a0e699790C02737fF68150x098517B0353e2963837a0e699790C02737fF6815"; 
  const abi = [
    "function donate() payable",
    "function getDonationAmount(address) view returns (uint256)",
    "function getDonors() view returns (address[])"
  ]; 

  const [donor] = await ethers.getSigners(); 
  const contract = new ethers.Contract(contractAddress, abi, donor); 

  console.log("Sending donation...");
  const tx = await contract.donate({ value: ethers.parseEther("0.001") }); 
  await tx.wait();

  console.log("Donation successful!");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
