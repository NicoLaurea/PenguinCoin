import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("PNG", ["0x79F01bf6dD6EE7E0daE68BFfD888dd784b82070A"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});