import hre from "hardhat";
import { CONTRACTS } from "./data/deployed-contracts";

async function main() {
  console.log("👟 Start script 'deploy-contracts'");

  const network = hre.network.name;

  if (!CONTRACTS[network].marketplace) {
    const contract = await hre.viem.deployContract("Marketplace", []);
    console.log(`Contract 'Marketplace' deployed to: ${contract.address}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
