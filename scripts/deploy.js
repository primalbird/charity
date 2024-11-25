async function main() {
  const DonationContract = await ethers.getContractFactory("DonationContract");
  const contract = await DonationContract.deploy();
  await contract.waitForDeployment();

  console.log("DonationContract deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
