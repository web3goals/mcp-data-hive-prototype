import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";

describe("Marketplace", function () {
  async function initFixture() {
    // Get signers
    const [deployer, userOne, userTwo] = await hre.viem.getWalletClients();

    // Deploy contracts
    const marketplaceContract = await hre.viem.deployContract(
      "Marketplace",
      []
    );

    return {
      deployer,
      userOne,
      userTwo,
      marketplaceContract,
    };
  }

  it("Should list and buy a dataset", async function () {
    const { deployer, userOne, userTwo, marketplaceContract } =
      await loadFixture(initFixture);

    // Save user one balance before test
    const publicClient = await hre.viem.getPublicClient();
    const userOneBalanceBefore = await publicClient.getBalance({
      address: userOne.account.address,
    });

    // List a dataset for user one
    const dataset = "67f7727355f7a8ba2cb82fcd";
    const price = parseEther("5");
    await expect(
      marketplaceContract.write.list(
        [dataset, userOne.account.address, price],
        { account: deployer.account }
      )
    ).to.be.fulfilled;

    // Buy the dataset by user two
    await expect(
      marketplaceContract.write.buy([dataset], {
        account: userTwo.account,
        value: price,
      })
    ).to.fulfilled;

    // Check user one balance after test
    const userOneBalanceAfter = await publicClient.getBalance({
      address: userOne.account.address,
    });
    expect(userOneBalanceAfter).to.equal(userOneBalanceBefore + price);
  });
});
